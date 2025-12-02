'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';

/**
 * Hero Section Component
 * Full-width hero section with background image and CTA buttons
 */
export default function HeroSection() {
  return (
    <section id="home" className="hero-section position-relative" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Background Image */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <Image
          src="https://images.unsplash.com/photo-1655179696694-13aec4026aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzcxMzl8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHByb2Zlc3Npb25hbCUyMHdvcmt8ZW58MHwwfHx8MTc2NDYyNTUxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Professional electrical work"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.7 }}></div>
      </div>

      {/* Content */}
      <Container className="h-100 d-flex align-items-center">
        <Row className="w-100">
          <Col lg={8} xl={7}>
            <div className="text-white fade-in-up">
              <h1 className="display-3 fw-bold mb-4">
                Trusted Electrical Services in Kingston Upon Thames
              </h1>
              <p className="lead mb-4 fs-4">
                Experienced, qualified electricians providing a wide range of electrical 
                solutions for residential and commercial clients
              </p>
              <div className="d-flex flex-wrap gap-3 mt-5">
                <Button 
                  href="#contact" 
                  size="lg" 
                  variant="success"
                  className="px-4 py-3"
                >
                  <i className="fas fa-file-alt me-2"></i>
                  Get a Free Quote
                </Button>
                <Button 
                  href="tel:07938008007" 
                  size="lg" 
                  variant="outline-light"
                  className="px-4 py-3"
                >
                  <i className="fas fa-phone me-2"></i>
                  Call Us Today
                </Button>
              </div>

              {/* Trust Indicators */}
              <Row className="mt-5 g-4">
                <Col xs={6} md={4}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-accent fs-3 me-3"></i>
                    <div>
                      <h5 className="mb-0 fw-bold">15+ Years</h5>
                      <small>Experience</small>
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={4}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-certificate text-accent fs-3 me-3"></i>
                    <div>
                      <h5 className="mb-0 fw-bold">Fully Certified</h5>
                      <small>Qualified Team</small>
                    </div>
                  </div>
                </Col>
                <Col xs={6} md={4}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-clock text-accent fs-3 me-3"></i>
                    <div>
                      <h5 className="mb-0 fw-bold">24/7 Available</h5>
                      <small>Emergency Service</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}