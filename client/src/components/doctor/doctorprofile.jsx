import React, { useState, useEffect, useRef } from 'react'
import AXIOS from 'axios'
import { jwtDecode } from 'jwt-decode'
import DoctorNavbar from './doctornavbar'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa';


export default function DoctorProfile() {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const [DocData, setDocData] = useState({
        docname: '',
        email: '',
        address: '',
        profileImage: '',
    })

    // Refs for GSAP target elements
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const headerRef = useRef(null)

    useEffect(() => {
        AXIOS.get('http://localhost:9000/api/doctor/viewloggeddoctor', {
            headers: { id: decoded.id },
        })
            .then((res) => {
                setDocData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
        )

        // Image appears from left
        gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )
    }, [])

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <>
            <DoctorNavbar />
            <Container className="my-5">
                <Row className="justify-content-center text-center">
                    <Col xs={12}>
                        <h1
                            ref={headerRef}
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '700',
                                color: '#34495E',
                                marginBottom: '1rem',
                            }}
                        >
                            <FaAddressCard size={32} style={{ marginBottom: '7px', marginRight: '10px', color: '#2980B9' }} />
                            Your Profile
                        </h1>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col
                        xs={12}
                        md={6}
                        lg={4}
                        className="d-flex justify-content-center mb-4"
                        ref={imageRef}
                    >
                        <Image
                            src={`http://localhost:9000/uploads/${DocData.profileImage}`}
                            roundedCircle
                            height={280}
                            width={280}
                            style={{ objectFit: 'fill', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                            alt="Doctor Profile"
                        />
                    </Col>

                    <Col xs={12} md={6} lg={5} ref={cardRef}>
                        <Card
                            className="shadow-lg"
                            style={{ borderRadius: '15px', minHeight: '280px', backgroundColor: '#f8f9fa' }}
                        >
                            <Card.Body className="d-flex flex-column justify-content-center h-100 px-4">
                                <Card.Title
                                    className="mb-3"
                                    style={{ fontSize: '1.8rem', fontWeight: '600', color: '#2c3e50' }}
                                >
                                    Dr. {DocData.docname}
                                </Card.Title>

                                <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                    <strong>Email:</strong> {DocData.email || 'N/A'}
                                </Card.Text>

                                <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                    <strong>Address:</strong> {DocData.address || 'N/A'}
                                </Card.Text>

                                <div className="d-flex gap-3 justify-content-center">
                                    <Button variant="outline-warning" size="md" style={{ fontWeight: '600' }}>
                                        📝 Edit Profile
                                    </Button>
                                    <Button variant="outline-danger" size="md" style={{ fontWeight: '600' }} onClick={handleLogout}>
                                        📤 Logout
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
