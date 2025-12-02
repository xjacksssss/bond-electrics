'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

/**
 * About Section Component
 * Company background, experience, and qualifications
 */
export default function AboutSection() {
  const features = [
    {
      icon: 'fa-user-check',
      title: 'Qualified Professionals',
      description: 'All our electricians are fully qualified, certified, and experienced professionals.',
    },
    {
      icon: 'fa-shield-alt',
      title: 'Safety First',
      description: 'We prioritize safety in every job, ensuring compliance with all regulations.',
    },
    {
      icon: 'fa-clock',
      title: 'Reliable Service',
      description: 'Punctual, professional, and committed to completing work on time.',
    },
    {
      icon: 'fa-pound-sign',
      title: 'Competitive Pricing',
      description: 'Fair, transparent pricing with no hidden costs or surprises.',
    },
  ];

  return (
    <section id="about">
      <Container>
        <div className="section-title">
          <h2>About Bond Electrics</h2>
          <p className="lead text-secondary">
            Your trusted electrical partner in Kingston Upon Thames
          </p>
        </div>

        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="position-relative">
              <Image
                src="https://images.unsplash.com/photo-1759542877886-39d81e8f2eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzcxMzl8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHRlYW18ZW58MHwwfHx8MTc2NDY2NzU5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Bond Electrics team"
                width={600}
                height={400}
                className="rounded shadow-lg w-100"
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 end-0 bg-accent text-white p-4 rounded shadow m-3">
                <h3 className="fw-bold mb-0">15+</h3>
                <p className="mb-0">Years Experience</p>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <h3 className="mb-4 text-primary-custom">
              Leading Electrical Services Provider
            </h3>
            <p className="mb-4">
              Bond Electrics is a leading provider of electrical services in the Kingston Upon Thames 
              area. With over 15 years of experience, our team of qualified electricians is dedicated 
              to delivering high-quality, reliable, and safe electrical work for our customers.
            </p>
            <p className="mb-4">
              From electrical testing and installation to maintenance and certification, we have the 
              expertise to handle all your electrical needs. We pride ourselves on our professional 
              approach, attention to detail, and commitment to customer satisfaction.
            </p>
            <p className="mb-4">
              Whether you're a homeowner, landlord, or commercial client, you can trust Bond Electrics 
              to provide exceptional service and workmanship on every project.
            </p>

            <Row className="g-4 mt-4">
              {features.map((feature, index) => (
                <Col key={index} sm={6}>
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <i className={`fas ${feature.icon} text-accent fs-3 me-3`}></i>
                    </div>
                    <div>
                      <h5 className="mb-2">{feature.title}</h5>
                      <p className="text-secondary small mb-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}