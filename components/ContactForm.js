'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

/**
 * Contact Form Component
 * Client-side form with validation that submits to API route
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const [validated, setValidated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const services = [
    'Electrical Testing',
    'Electrical Installation',
    'Electrical Maintenance',
    'Electrical Design',
    'Electrical Certificates',
    'Fuse Board Upgrades',
    'Complete Rewires',
    'EV Charging Points',
    'Safety Reports',
    'Landlord Certificates',
    'Fire Detection Systems',
    'Emergency Lighting',
    'Emergency Repair',
    'Other',
  ];

  // Field length limits
  const MAX_LENGTHS = {
    name: 100,
    email: 254,
    phone: 20,
    service: 100,
    message: 2000,
  };

  // Fetch CSRF token on component mount
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
      }
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };

  /**
   * Sanitize input on client side
   */
  const sanitizeInput = (value, maxLength) => {
    if (typeof value !== 'string') return '';
    
    // Trim and limit length
    let sanitized = value.trim().substring(0, maxLength);
    
    // Remove potentially dangerous characters
    sanitized = sanitized.replace(/[<>\"\']/g, '');
    
    return sanitized;
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  /**
   * Validate phone format
   */
  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9\s\-\+\(\)]{7,20}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply max length limit
    const maxLength = MAX_LENGTHS[name] || 1000;
    const sanitizedValue = value.substring(0, maxLength);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Additional client-side validation
    if (!isValidEmail(formData.email)) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Please enter a valid email address.',
      });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Please enter a valid phone number.',
      });
      return;
    }

    if (!csrfToken) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Security token missing. Please refresh the page and try again.',
      });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Sanitize all inputs before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name, MAX_LENGTHS.name),
        email: sanitizeInput(formData.email, MAX_LENGTHS.email),
        phone: sanitizeInput(formData.phone, MAX_LENGTHS.phone),
        service: sanitizeInput(formData.service, MAX_LENGTHS.service),
        message: sanitizeInput(formData.message, MAX_LENGTHS.message),
        csrfToken: csrfToken,
      };

      // Validate sanitized data is not empty
      if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.phone || 
          !sanitizedData.service || !sanitizedData.message) {
        throw new Error('Please fill in all required fields with valid data.');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        submitting: false,
        submitted: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      setValidated(false);

      // Fetch new CSRF token
      fetchCsrfToken();

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message,
      });
      
      // Fetch new CSRF token on error
      fetchCsrfToken();
    }
  };

  return (
    <>
      {status.submitted && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </Alert>
      )}

      {status.error && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-circle me-2"></i>
          {status.error}
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>
            Full Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            disabled={status.submitting}
            maxLength={MAX_LENGTHS.name}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {formData.name.length}/{MAX_LENGTHS.name}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>
            Email Address <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            disabled={status.submitting}
            maxLength={MAX_LENGTHS.email}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>
            Phone Number <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="07XXX XXXXXX"
            required
            pattern="[0-9\s\-\+\(\)]{7,20}"
            disabled={status.submitting}
            maxLength={MAX_LENGTHS.phone}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formService">
          <Form.Label>
            Service Required <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            disabled={status.submitting}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a service.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>
            Message <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please provide details about your requirements..."
            required
            disabled={status.submitting}
            maxLength={MAX_LENGTHS.message}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a message.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {formData.message.length}/{MAX_LENGTHS.message}
          </Form.Text>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={status.submitting || !csrfToken}
          >
            {status.submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane me-2"></i>
                Send Message
              </>
            )}
          </Button>
        </div>

        <p className="text-muted text-center mt-3 small">
          <i className="fas fa-lock me-1"></i>
          Your information is secure and will only be used to respond to your inquiry.
        </p>
      </Form>
    </>
  );
}