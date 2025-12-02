'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';

/**
 * Services Section Component
 * Displays all electrical services in a responsive grid layout
 */
export default function ServicesSection() {
  const services = [
    {
      icon: 'fa-clipboard-check',
      title: 'Electrical Testing',
      description: 'Comprehensive testing services including EICR, PAT testing, and safety inspections to ensure compliance and safety.',
    },
    {
      icon: 'fa-tools',
      title: 'Electrical Installation',
      description: 'Professional installation of electrical systems, lighting, sockets, and complete electrical setups for new builds.',
    },
    {
      icon: 'fa-wrench',
      title: 'Electrical Maintenance',
      description: 'Regular maintenance and repair services to keep your electrical systems running safely and efficiently.',
    },
    {
      icon: 'fa-drafting-compass',
      title: 'Electrical Design',
      description: 'Expert electrical design services for residential and commercial projects, ensuring optimal performance.',
    },
    {
      icon: 'fa-certificate',
      title: 'Electrical Certificates',
      description: 'Full certification services including EIC, EICR, MEIWC, and all landlord certificates for compliance.',
    },
    {
      icon: 'fa-bolt',
      title: 'Fuse Board Upgrades',
      description: 'Modern consumer unit installations and upgrades to meet current safety standards and regulations.',
    },
    {
      icon: 'fa-home',
      title: 'Complete Rewires',
      description: 'Full property rewiring services for domestic and commercial buildings, ensuring safety and reliability.',
    },
    {
      icon: 'fa-charging-station',
      title: 'EV Charging Points',
      description: 'Installation of electric vehicle charging points with Modes 2, 3 & 4, supporting Type 1, 2, or 3 connectors.',
    },
    {
      icon: 'fa-file-contract',
      title: 'Safety Reports',
      description: 'Detailed electrical safety reports including EICR for landlords and homeowners.',
    },
    {
      icon: 'fa-building',
      title: 'Landlord Certificates',
      description: 'PRS landlord certificates and compliance documentation for rental properties.',
    },
    {
      icon: 'fa-fire-extinguisher',
      title: 'Fire Detection Systems',
      description: 'Installation, testing, and servicing of Grade A & Grade C fire detection systems.',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Emergency Lighting',
      description: 'Installation, testing, and servicing of emergency lighting and escape route lighting systems.',
    },
  ];

  return (
    <section id="services" className="bg-light-pattern">
      <Container>
        <div className="section-title">
          <h2>Our Electrical Services</h2>
          <p className="lead text-secondary">
            Comprehensive electrical solutions for all your residential and commercial needs
          </p>
        </div>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} lg={4} md={6}>
              <Card className="h-100 service-card">
                <Card.Body className="p-4 text-center">
                  <div 
                    className="service-icon mx-auto mb-4 rounded-circle bg-primary-custom text-white d-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <i className={`fas ${service.icon} fa-2x`}></i>
                  </div>
                  <Card.Title className="h5 mb-3 text-primary-custom">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Emergency Call-Out Banner */}
        <Row className="mt-5">
          <Col>
            <Card className="bg-accent text-white border-0 shadow-lg">
              <Card.Body className="p-4 text-center">
                <h3 className="mb-3">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  24/7 Emergency Call-Out Service
                </h3>
                <p className="mb-3 fs-5">
                  Electrical emergency? We're here to help anytime, day or night.
                </p>
                <a 
                  href="tel:07938008007" 
                  className="btn btn-light btn-lg px-5"
                >
                  <i className="fas fa-phone me-2"></i>
                  Call Now: 07938 008 007
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}