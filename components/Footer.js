'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

/**
 * Footer Component
 * Contains company info, quick links, contact details, and image attribution
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-custom text-white pt-5 pb-3">
      <Container>
        <Row className="g-4">
          {/* Company Info */}
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-3">
              <i className="fas fa-bolt me-2"></i>
              Bond Electrics
            </h5>
            <p className="mb-3">
              Trusted electrical services in Kingston Upon Thames. Providing professional, 
              reliable electrical solutions for residential and commercial clients.
            </p>
            <div className="d-flex gap-3">
              <a 
                href="mailto:info@bondelectrics.co.uk" 
                className="text-white"
                aria-label="Email"
              >
                <i className="fab fa-envelope fa-lg"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#home" className="text-white text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-white text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-white text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#testimonials" className="text-white text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Testimonials
                </a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-white text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={4} md={12}>
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="fas fa-phone me-2"></i>
                <a href="tel:07938008007" className="text-white text-decoration-none">
                  07938 008 007
                </a>
              </li>
              <li className="mb-3">
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:info@bondelectrics.co.uk" className="text-white text-decoration-none">
                  info@bondelectrics.co.uk
                </a>
              </li>
              <li className="mb-3">
                <i className="fas fa-map-marker-alt me-2"></i>
                Kingston Upon Thames
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 bg-white opacity-25" />

        {/* Copyright & Attribution */}
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {currentYear} Bond Electrics. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 small">
              Images by{' '}
              <a 
                href="https://unsplash.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white text-decoration-underline"
              >
                Unsplash
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}