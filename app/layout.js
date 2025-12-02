'use client';

import { Poppins, Roboto } from 'next/font/google';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

/**
 * Error Boundary Component
 * Catches runtime errors and displays user-friendly error messages
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
    
    // In production, you would send this to an error reporting service
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service (e.g., Sentry)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
          <body>
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: '#f8f9fa',
            }}>
              <div style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '48px',
                  color: '#dc3545',
                  marginBottom: '20px',
                }}>
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '16px',
                }}>
                  Oops! Something went wrong
                </h1>
                <p style={{
                  color: '#666',
                  marginBottom: '24px',
                  lineHeight: '1.6',
                }}>
                  We're sorry, but something unexpected happened. Please try refreshing the page or contact us if the problem persists.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#002B70',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <i className="fas fa-redo me-2"></i>
                    Refresh Page
                  </button>
                  <a
                    href="/"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#00C853',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    <i className="fas fa-home me-2"></i>
                    Go Home
                  </a>
                </div>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details style={{
                    marginTop: '24px',
                    textAlign: 'left',
                    backgroundColor: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}>
                    <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
                      Error Details (Development Only)
                    </summary>
                    <pre style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      color: '#dc3545',
                    }}>
                      {this.state.error.toString()}
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid #dee2e6',
                }}>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                    Need immediate assistance?
                  </p>
                  <a
                    href="tel:02085498347"
                    style={{
                      color: '#002B70',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    <i className="fas fa-phone me-2"></i>
                    020 8549 8347
                  </a>
                </div>
              </div>
            </div>
          </body>
        </html>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}