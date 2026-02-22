import React from 'react'
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap'
import HomeNavbar from '../../components/layouts/homenavbar'
import Footer from '../../components/layouts/footer'
import { FaUserMd, FaNotesMedical, FaLaptopMedical } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import { HomePageContentSection, HomePageHeroSection } from '../../components/gsapAnimation'

export default function Home() {

    useGSAP(() => {
        HomePageHeroSection()
        HomePageContentSection()
    }, [])

    return (
        <>
            <HomeNavbar />

            {/* Hero Section Starting */}
            <div className="hero-section text-center ">
                <div className='hero-overlay'></div>
                <Container>
                    <h1 className="hero-title">Welcome to DocNet</h1>
                    <p className="hero-subtext">
                        Your all-in-one healthcare companion for doctors and patients.
                    </p>
                    <div className="mt-4">
                        <Button className="hero-login me-3" variant="light" href="/login" >Login</Button>
                        <Button className='hero-register' variant="outline-light" href="/registration">Register</Button>
                    </div>
                </Container>
            </div>
            {/* Hero Section Ending */}

            {/* Home Page Content Starting */}
            {/* Sliding Image Section Starting */}
            <div className='carousel-wrapper'>
                <Carousel>
                    <Carousel.Item interval={3000} >
                        <div className="carousel-item-wrapper">
                            <img
                                src="https://wallpaperaccess.com/full/3275630.jpg"
                                alt="First slide"
                                className="carousel-image"
                            />
                            <div id="overlay" className="carousel-overlay"></div>
                            <Carousel.Caption className="carousel-caption">
                                <h3>“Wherever the art of medicine is loved, there is also a love of humanity.”</h3>
                                <p>– Hippocrates</p>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item interval={3000}>
                        <img src='https://wallpaperaccess.com/full/136995.jpg' alt="Second slide" className="carousel-image" />
                        <Carousel.Caption className="carousel-caption">
                            <h3>“The best doctor gives the least medicine — and the most attention.”</h3>
                            <p>– Benjamin Franklin</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={3000}>
                        <img src='https://wallpaperaccess.com/full/624111.jpg' alt="Third slide" className="carousel-image" />
                        <Carousel.Caption className="carousel-caption">
                            <h3>“Digital healthcare empowers patients, saves lives, and transforms futures.”</h3>
                            <p>– DocNet Vision</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            {/* Sliding Image Section Ending */}

            {/* Information Boxes Starting */}
            <Container className="my-5">
                <h2 className="section-title text-center mb-4">What You Can Do with DocNet</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card id='info-card' className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaUserMd size={40} className="text-primary mb-3 mx-auto" />
                                <Card.Title>Doctor Registration</Card.Title>
                                <Card.Text>
                                    Doctors can sign up, upload their profile, and manage patient prescriptions with ease.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card id='info-card' className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaNotesMedical size={40} className="text-success mb-3 mx-auto" />
                                <Card.Title>Prescriptions Management</Card.Title>
                                <Card.Text>
                                    View and manage prescriptions in a clean, structured format built for quick access.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card id='info-card' className="h-100 shadow-sm text-center">
                            <Card.Body>
                                <FaLaptopMedical size={40} className="text-danger mb-3 mx-auto" />
                                <Card.Title>Accessible Portal</Card.Title>
                                <Card.Text>
                                    Patients and doctors access a unified dashboard — secure, fast, and user-friendly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* Information Boxes Ending */}
            {/* Home Page Content Ending */}

            <Footer />
        </>
    )
}
