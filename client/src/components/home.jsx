import React, { useRef } from 'react'
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap'
import HomeNavbar from './homenavbar'
import Footer from './footer'
import { FaUserMd, FaNotesMedical, FaLaptopMedical } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import { HomePageHeroSection } from './gsapAnimation'


export default function Home() {

    const firstDivRef = useRef()
    const welcomeRef = useRef()
    const statementRef = useRef()
    const loginRef = useRef()
    const registerRef = useRef()

    useGSAP(() => {
        HomePageHeroSection({ firstDivRef, welcomeRef, statementRef, loginRef, registerRef })
    },[])

    return (
        <>
            <HomeNavbar />

            <div ref={firstDivRef} style={{
                background: 'linear-gradient(to right, #3498db, #2ecc71)',
                color: '#fff',
                padding: '80px 0',
                textAlign: 'center'
            }}>
                <Container>
                    <h1 ref={welcomeRef} style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Poppins' }}>Welcome to DocNet</h1>
                    <p ref={statementRef} style={{ fontSize: '1.2rem', marginTop: '20px' }}>
                        Your all-in-one healthcare companion for doctors and patients.
                    </p>
                    <div className="mt-4">
                        <Button ref={loginRef} variant="light" href="/login" className="me-3">Login</Button>
                        <Button ref={registerRef} variant="outline-light" href="/registration">Register</Button>
                    </div>
                </Container>
            </div>
            <div className='mt-2'>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img src='https://wallpaperaccess.com/full/3275630.jpg' height={'600px'} width={'100%'} text="First slide" />
                        <Carousel.Caption style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.9)' }}>
                            <h3>“Wherever the art of medicine is loved, there is also a love of humanity.”</h3>
                            <p>– Hippocrates</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img src='https://wallpaperaccess.com/full/136995.jpg' height={'600px'} width={'100%'} text="Second slide" />
                        <Carousel.Caption style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.9)' }}>
                            <h3>“The best doctor gives the least medicine — and the most attention.”</h3>
                            <p>– Benjamin Franklin</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img src='https://wallpaperaccess.com/full/624111.jpg' height={'600px'} width={'100%'} text="Third slide" />
                        <Carousel.Caption style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.9)' }}>
                            <h3>“Digital healthcare empowers patients, saves lives, and transforms futures.”</h3>
                            <p>– DocNet Vision</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>


            <Container className="my-5">
                <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins', color: '#2c3e50' }}>What You Can Do with DocNet</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaUserMd size={40} className="text-primary mb-3" />
                                <Card.Title>Doctor Registration</Card.Title>
                                <Card.Text>
                                    Doctors can sign up, upload their profile, and manage patient prescriptions with ease.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaNotesMedical size={40} className="text-success mb-3" />
                                <Card.Title>Prescriptions Management</Card.Title>
                                <Card.Text>
                                    View and manage prescriptions in a clean, structured format built for quick access.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaLaptopMedical size={40} className="text-danger mb-3" />
                                <Card.Title>Accessible Portal</Card.Title>
                                <Card.Text>
                                    Patients and doctors access a unified dashboard — secure, fast, and user-friendly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <Footer />
        </>
    )
}
