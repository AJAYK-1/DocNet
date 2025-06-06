import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '20px 0', marginTop: '50px' }}>
      <Container>
        <Row className="text-center text-md-start align-items-center">
          <Col md={6}>
            <h5>DocNet</h5>
            <p>&copy; {new Date().getFullYear()} DocNet. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light me-3">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-light me-3">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/ajaykumartp" target="_blank" rel="noreferrer" className="text-light me-3">
              <FaLinkedin />
            </a>
            <a href="https://github.com/AJAYK-1" target="_blank" rel="noreferrer" className="text-light">
              <FaGithub />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
