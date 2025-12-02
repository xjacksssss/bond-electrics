import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Contact Form API Route
 * Handles form submissions and sends emails via SMTP
 * 
 * CRITICAL: Uses exact environment variable names required by deployment system:
 * - SMTP_HOST
 * - SMTP_PORT
 * - SMTP_USER
 * - SMTP_PASS
 * - CONTACT_EMAIL
 */

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute

// CSRF token store (in production, use Redis or similar)
const csrfTokenStore = new Map();
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour

/**
 * Validate environment variables on startup
 */
function validateEnvironmentVariables() {
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  return true;
}

/**
 * Check rate limit for IP address
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  
  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    cleanupRateLimitStore();
  }
  
  return true;
}

/**
 * Cleanup old rate limit entries
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, requests] of rateLimitStore.entries()) {
    const recentRequests = requests.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    if (recentRequests.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, recentRequests);
    }
  }
}

/**
 * Verify request origin
 */
function verifyOrigin(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // In production, verify against allowed origins
  if (process.env.NODE_ENV === 'production') {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    if (origin && !allowedOrigins.includes(origin)) {
      // Allow same-origin requests
      if (!origin.includes(host)) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
  const phoneRegex = /^[0-9\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitize input to prevent injection
 */
function sanitizeInput(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  
  // Trim and limit length
  let sanitized = input.trim().substring(0, maxLength);
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>\"\'&]/g, (char) => {
    const entities = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;'
    };
    return entities[char] || char;
  });
  
  return sanitized;
}

/**
 * HTML escape for email content
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Validate CSRF token
 */
function validateCsrfToken(token, ip) {
  if (!token) return false;
  
  const stored = csrfTokenStore.get(ip);
  if (!stored) return false;
  
  const { token: storedToken, expiry } = stored;
  
  if (Date.now() > expiry) {
    csrfTokenStore.delete(ip);
    return false;
  }
  
  return token === storedToken;
}

/**
 * Generate CSRF token
 */
function generateCsrfToken(ip) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiry = Date.now() + CSRF_TOKEN_EXPIRY;
  
  csrfTokenStore.set(ip, { token, expiry });
  
  // Cleanup old tokens periodically
  if (Math.random() < 0.01) {
    cleanupCsrfTokens();
  }
  
  return token;
}

/**
 * Cleanup expired CSRF tokens
 */
function cleanupCsrfTokens() {
  const now = Date.now();
  for (const [ip, data] of csrfTokenStore.entries()) {
    if (now > data.expiry) {
      csrfTokenStore.delete(ip);
    }
  }
}

/**
 * GET handler - Generate CSRF token
 */
export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const token = generateCsrfToken(ip);
  
  return NextResponse.json({ csrfToken: token });
}

/**
 * POST handler - Process contact form
 */
export async function POST(request) {
  try {
    // Validate environment variables
    if (!validateEnvironmentVariables()) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us by phone.' },
        { status: 500 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Verify request origin
    if (!verifyOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin.' },
        { status: 403 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, phone, service, message, csrfToken } = body;

    // Validate CSRF token
    if (!validateCsrfToken(csrfToken, ip)) {
      return NextResponse.json(
        { error: 'Invalid or expired security token. Please refresh the page and try again.' },
        { status: 403 }
      );
    }

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 254 || phone.length > 20 || 
        service.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name, 100),
      email: sanitizeInput(email, 254),
      phone: sanitizeInput(phone, 20),
      service: sanitizeInput(service, 100),
      message: sanitizeInput(message, 2000),
    };

    // Additional validation after sanitization
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.phone || 
        !sanitizedData.service || !sanitizedData.message) {
      return NextResponse.json(
        { error: 'Invalid input detected.' },
        { status: 400 }
      );
    }

    // Create transporter with EXACT environment variable names
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP verification failed:', error);
      return NextResponse.json(
        { error: 'Email service is temporarily unavailable. Please try again later or call us.' },
        { status: 500 }
      );
    }

    // Escape HTML for email content
    const escapedData = {
      name: escapeHtml(sanitizedData.name),
      email: escapeHtml(sanitizedData.email),
      phone: escapeHtml(sanitizedData.phone),
      service: escapeHtml(sanitizedData.service),
      message: escapeHtml(sanitizedData.message).replace(/\n/g, '<br>'),
    };

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission - ${escapedData.service}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #002B70; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #002B70; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00C853; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>⚡ New Contact Form Submission</h2>
              <p>Bond Electrics Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${escapedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${escapedData.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${escapedData.phone}</div>
              </div>
              <div class="field">
                <div class="label">Service Required:</div>
                <div class="value">${escapedData.service}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${escapedData.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Bond Electrics contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
Service Required: ${sanitizedData.service}

Message:
${sanitizedData.message}

---
Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Invalidate CSRF token after successful submission
    csrfTokenStore.delete(ip);

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later or contact us by phone.' },
      { status: 500 }
    );
  }
}