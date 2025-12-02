'use client';

import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

/**
 * Header Component
 * Sticky navigation header with mobile responsive menu
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`${scrolled ? 'navbar-scrolled shadow' : ''} bg-white`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-primary-custom">
          <i className="fas fa-bolt me-2"></i>
          Bond Electrics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" onClick={handleNavClick} className="mx-2 fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="#services" onClick={handleNavClick} className="mx-2 fw-semibold">
              Services
            </Nav.Link>
            <Nav.Link href="#about" onClick={handleNavClick} className="mx-2 fw-semibold">
              About
            </Nav.Link>
            <Nav.Link href="#testimonials" onClick={handleNavClick} className="mx-2 fw-semibold">
              Testimonials
            </Nav.Link>
            <Nav.Link href="#contact" onClick={handleNavClick} className="mx-2 fw-semibold">
              Contact
            </Nav.Link>
            <Nav.Link href="tel:07938008007" className="mx-2 btn btn-primary text-white ms-lg-3">
              <i className="fas fa-phone me-2"></i>
              Call Now
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}