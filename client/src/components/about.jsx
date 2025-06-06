import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaHeartbeat, FaLaptopMedical, FaShieldAlt } from 'react-icons/fa'
import HomeNavbar from './homenavbar'
import Footer from './footer'


export default function About() {
    return (
        <>
            <HomeNavbar />

            {/* Header Section */}
            <div style={{
                background: 'linear-gradient(to right, #2ecc71, #3498db)',
                color: '#fff',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                    About DocNet
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '20px auto' }}>
                    DocNet is your all-in-one digital healthcare platform — connecting patients and doctors with ease, security, and convenience.
                </p>
            </div>

            {/* About Content */}
            <Container className="my-5">
                <Row className="mb-4">
                    <Col md={6}>
                        <img
                            src="https://img.freepik.com/premium-photo/spotted-light-red-heart-stethoscope-black-table-3d-rendering_648796-2595.jpg?w=996"
                            alt="Healthcare illustration"
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                    <Col md={6}>
                        <h3 className="mb-3">Our Mission</h3>
                        <p>
                            At DocNet, our mission is to simplify and streamline healthcare for both patients and medical professionals. We provide an intuitive interface for appointment tracking, prescriptions, and seamless doctor-patient communication.
                        </p>
                        <p>
                            Whether you're a doctor managing multiple patients or a patient seeking easy access to medical care — DocNet brings healthcare to your fingertips.
                        </p>
                    </Col>
                </Row>

                <h3 className="text-center mb-4">Why Choose Us?</h3>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <FaLaptopMedical size={40} className="text-primary mb-3" />
                                <Card.Title>Easy Access</Card.Title>
                                <Card.Text>
                                    Access your healthcare records, prescriptions, and appointments anytime, anywhere.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <FaHeartbeat size={40} className="text-danger mb-3" />
                                <Card.Title>Doctor-Friendly</Card.Title>
                                <Card.Text>
                                    Doctors can efficiently manage patients, upload prescriptions, and update profiles with just a few clicks.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <FaShieldAlt size={40} className="text-success mb-3" />
                                <Card.Title>Secure Platform</Card.Title>
                                <Card.Text>
                                    Security and privacy of medical data are our top priority with secure token-based access.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}
