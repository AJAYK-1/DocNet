import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaGlobe, } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '50px 0',
      }}
    >
      <Container>
        <Row className="text-center text-md-start align-items-center justify-content-between">
          {/* Column 1: Branding */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>DocNet</h5>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} DocNet. All rights reserved.
            </p>
          </Col>

          {/* Column 2: Contact Info */}
          <Col md={4} className="mb-3 mb-md-0 text-center">
            <p className="mb-1">
              <FaGlobe className="me-2 fs-5" />
              <a
                href="https://www.docnet.com"
                target="_blank"
                rel="noreferrer"
                className="text-light text-decoration-none"
              >
                www.docnet.com
              </a>
            </p>
            <p className="mb-0">
              <FaEnvelope className="me-2 fs-5" />
              <a
                href="mailto:ajaykumartp10@gmail.com"
                className="text-light text-decoration-none"
              >
                ajaykumartp10@gmail.com
              </a>
            </p>
          </Col>

          {/* Column 3: Social Media Icons */}
          <Col md={4} className="text-md-end text-center">
            <h5>My Social Handles</h5>
            <a
              href="https://www.instagram.com/njan.ajay/"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3 fs-3"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/ajaykumartp"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3 fs-3"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/AJAYK-1"
              target="_blank"
              rel="noreferrer"
              className="text-light fs-3"
            >
              <FaGithub />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
