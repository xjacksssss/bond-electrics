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

        <Row className="g-5">
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
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-primary-custom text-white d-flex align-items-center justify-content-center"
                        style={{ width: '60px', height: '60px' }}
                      >
                        <i className="fas fa-phone fa-lg"></i>
                      </div>
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Phone</h5>
                      <a 
                        href="tel:07938008007" 
                        className="phone-link text-decoration-none d-block"
                      >
                        07938 008 007
                      </a>
                      <p className="text-secondary small mb-0 mt-2">
                        Available 24/7 for emergencies
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Email */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-secondary-custom text-white d-flex align-items-center justify-content-center"
                        style={{ width: '60px', height: '60px' }}
                      >
                        <i className="fas fa-envelope fa-lg"></i>
                      </div>
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Email</h5>
                      <a 
                        href="mailto:info@bondelectrics.co.uk" 
                        className="text-decoration-none d-block"
                      >
                        info@bondelectrics.co.uk
                      </a>
                      <p className="text-secondary small mb-0 mt-2">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Location */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-accent text-white d-flex align-items-center justify-content-center"
                        style={{ width: '60px', height: '60px' }}
                      >
                        <i className="fas fa-map-marker-alt fa-lg"></i>
                      </div>
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Service Area</h5>
                      <p className="mb-0">
                        Kingston Upon Thames<br />
                        and surrounding areas
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Hours */}
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <div 
                        className="rounded-circle bg-primary-custom text-white d-flex align-items-center justify-content-center"
                        style={{ width: '60px', height: '60px' }}
                      >
                        <i className="fas fa-clock fa-lg"></i>
                      </div>
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Business Hours</h5>
                      <p className="mb-1">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="mb-1">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="mb-0">Sunday: Emergency calls only</p>
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