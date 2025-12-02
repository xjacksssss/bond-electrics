'use client';

import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';

/**
 * Testimonials Section Component
 * Customer reviews and testimonials in a carousel
 */
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Thompson',
      location: 'Kingston Upon Thames',
      rating: 5,
      text: 'Excellent service from start to finish. Bond Electrics completed a full rewire of our property professionally and efficiently. Highly recommend!',
      service: 'Complete Rewire',
    },
    {
      name: 'James Mitchell',
      location: 'Surbiton',
      rating: 5,
      text: 'Very impressed with the EV charging point installation. The team was knowledgeable, tidy, and completed the work on time. Great value for money.',
      service: 'EV Charging Point',
    },
    {
      name: 'Emma Roberts',
      location: 'New Malden',
      rating: 5,
      text: 'As a landlord, I need reliable electrical certificates. Bond Electrics always provides thorough testing and prompt certification. Professional and trustworthy.',
      service: 'Landlord Certificates',
    },
    {
      name: 'David Chen',
      location: 'Hampton Wick',
      rating: 5,
      text: 'Called them for an emergency when our RCD kept tripping. They came out quickly, diagnosed the issue, and fixed it efficiently. Excellent customer service.',
      service: 'Emergency Repair',
    },
    {
      name: 'Lisa Anderson',
      location: 'Teddington',
      rating: 5,
      text: 'Had a consumer unit upgrade done. The electrician was very professional, explained everything clearly, and left the area spotless. Very happy with the service.',
      service: 'Fuse Board Upgrade',
    },
    {
      name: 'Michael Brown',
      location: 'Kingston Upon Thames',
      rating: 5,
      text: 'Needed PAT testing for our office equipment. Bond Electrics was efficient, provided clear documentation, and their pricing was very competitive. Will use again.',
      service: 'PAT Testing',
    },
  ];

  return (
    <section id="testimonials" className="bg-light-pattern">
      <Container>
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p className="lead text-secondary">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Desktop View - 3 Cards */}
        <div className="d-none d-lg-block">
          <Carousel indicators={true} controls={true} interval={5000}>
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
              <Carousel.Item key={slideIndex}>
                <Row className="g-4 pb-5">
                  {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, index) => (
                    <Col key={index} lg={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <div className="mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star text-warning"></i>
                            ))}
                          </div>
                          <Card.Text className="mb-4 fst-italic">
                            "{testimonial.text}"
                          </Card.Text>
                          <div className="mt-auto">
                            <h6 className="mb-1 fw-bold text-primary-custom">
                              {testimonial.name}
                            </h6>
                            <p className="text-secondary small mb-1">
                              <i className="fas fa-map-marker-alt me-1"></i>
                              {testimonial.location}
                            </p>
                            <p className="text-muted small mb-0">
                              <i className="fas fa-wrench me-1"></i>
                              {testimonial.service}
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Mobile/Tablet View - 1 Card */}
        <div className="d-lg-none">
          <Carousel indicators={true} controls={true} interval={5000}>
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="pb-5">
                  <Card className="border-0 shadow-sm mx-2">
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-warning"></i>
                        ))}
                      </div>
                      <Card.Text className="mb-4 fst-italic">
                        "{testimonial.text}"
                      </Card.Text>
                      <div className="mt-auto">
                        <h6 className="mb-1 fw-bold text-primary-custom">
                          {testimonial.name}
                        </h6>
                        <p className="text-secondary small mb-1">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {testimonial.location}
                        </p>
                        <p className="text-muted small mb-0">
                          <i className="fas fa-wrench me-1"></i>
                          {testimonial.service}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Trust Badges */}
        <Row className="mt-5 text-center">
          <Col>
            <div className="bg-white rounded p-4 shadow-sm">
              <Row className="align-items-center justify-content-center g-4">
                <Col xs={6} md={3}>
                  <h3 className="text-accent fw-bold mb-0">500+</h3>
                  <p className="text-secondary mb-0">Happy Customers</p>
                </Col>
                <Col xs={6} md={3}>
                  <h3 className="text-accent fw-bold mb-0">15+</h3>
                  <p className="text-secondary mb-0">Years Experience</p>
                </Col>
                <Col xs={6} md={3}>
                  <h3 className="text-accent fw-bold mb-0">100%</h3>
                  <p className="text-secondary mb-0">Satisfaction Rate</p>
                </Col>
                <Col xs={6} md={3}>
                  <h3 className="text-accent fw-bold mb-0">24/7</h3>
                  <p className="text-secondary mb-0">Emergency Service</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}