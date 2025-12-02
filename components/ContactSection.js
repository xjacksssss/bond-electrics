'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from './ContactForm';

/**
 * Contact Section Component
 * Contact form and business contact information
 */
export default function ContactSection() {
  return (
    <section id="contact">
      <Container>
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p className="lead text-secondary">
            Ready to discuss your electrical needs? Contact us today for a free quote
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Form */}
          <Col lg={7}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <h4 className="mb-4 text-primary-custom">
                  <i className="fas fa-envelope me-2"></i>
                  Send Us a Message
                </h4>
                <ContactForm />
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={5}>
            <div className="h-100">
              {/* Phone */}
              <Card className="border-0 shadow-sm mb-3">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-primary-custom text-white d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px' }}
                      >
                        <i className="fas fa-phone"></i>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-1 fs-6">Phone</h5>
                      <a 
                        href="tel:07938008007" 
                        className="phone-link text-decoration-none d-block fw-semibold"
                      >
                        07938 008 007
                      </a>
                      <p className="text-secondary small mb-0 mt-1">
                        Available 24/7 for emergencies
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Email */}
              <Card className="border-0 shadow-sm mb-3">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-secondary-custom text-white d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px' }}
                      >
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-1 fs-6">Email</h5>
                      <a 
                        href="mailto:info@bondelectrics.co.uk" 
                        className="text-decoration-none d-block fw-semibold"
                        style={{ wordBreak: 'break-word' }}
                      >
                        info@bondelectrics.co.uk
                      </a>
                      <p className="text-secondary small mb-0 mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Opening Times */}
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-accent text-white d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px' }}
                      >
                        <i className="fas fa-clock"></i>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-2 fs-6">Opening Times</h5>
                      <ul className="list-unstyled mb-0 small">
                        <li className="mb-1">
                          <strong>Mon - Fri:</strong> 8:00 AM - 6:00 PM
                        </li>
                        <li className="mb-1">
                          <strong>Saturday:</strong> 9:00 AM - 4:00 PM
                        </li>
                        <li className="mb-1">
                          <strong>Sunday:</strong> Emergency Only
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}