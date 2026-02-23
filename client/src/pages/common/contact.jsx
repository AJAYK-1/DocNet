import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FaUserTie, FaMobileAlt, FaTools } from 'react-icons/fa'
import HomeNavbar from '../../components/layouts/homenavbar'
import Footer from '../../components/layouts/footer'
import { useGSAP } from '@gsap/react'
import { HomePageHeroSection } from '../../components/gsapAnimation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Contact() {

    const [ContactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setContactInfo({ ...ContactInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/contact-developer`, ContactInfo)
            .then((res) => {
                if (res.data.status == 200) {
                    toast.success(res.data.msg)
                    setContactInfo({ name: '', email: '', message: '' })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } else {
                    toast.error(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
                toast.error("An Error Occured...")
            })
    }

    useGSAP(() => {
        HomePageHeroSection()
    })

    return (
        <>
            <HomeNavbar />

            {/* Header Section */}
            <div className="hero-section">
                <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                    Contact Me
                </h1>
                <p className='hero-subtext' style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '20px auto' }}>
                    Have a question, feedback, or need help with DocNet? Feel free to get in touch — I’d love to hear from you!
                </p>
            </div>

            {/* Contact Info & Form Section */}
            <Container className="my-5">
                <Row className="mb-5">
                    {/* Contact Information */}
                    <Col md={6} className="mb-4">
                        <h3>Developer Info</h3>
                        <Card className="p-3 mb-3 shadow-sm">
                            <Card.Body >
                                <div className='flex'>
                                <FaUserTie className="me-1 text-xl text-primary" />
                                <strong>Name:</strong> Ajay Kumar T P
                                </div>
                                <span className='ml-6'>Full Stack Developer | MERN Stack</span>
                            </Card.Body>
                        </Card>

                        <Card className="p-3 mb-3 shadow-sm">
                            <Card.Body className='flex'>
                                <FaMobileAlt className="me-1 text-xl text-success" />
                                <strong>Phone:</strong> +91 82899 38749
                            </Card.Body>
                        </Card>

                        <Card className="p-3 shadow-sm">
                            <Card.Body>
                                <div className='flex'>

                                <FaTools className="me-1 text-xl text-warning" />
                                <strong>Technologies Used:</strong>
                                </div>
                                <table style={{ width: '100%',marginLeft:'4%', borderCollapse: 'collapse' }} cellPadding="4" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td style={{ verticalAlign: 'top', fontWeight: 'bold' }}>Frontend:</td>
                                            <td>React.js, HTML5, CSS3, Bootstrap, GSAP</td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: 'top', fontWeight: 'bold' }}>Backend:</td>
                                            <td>Node.js, Express.js, JavaScript</td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: 'top', fontWeight: 'bold' }}>Database:</td>
                                            <td>MongoDB</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Contact Form */}
                    <Col md={6}>
                        <h3>Send a Message</h3>
                        <Card className="p-4 shadow-sm" style={{ background: 'linear-gradient(-45deg,rgb(160, 214, 250),rgb(233, 176, 255))' }}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Control type="text" name='name' placeholder="Enter your name" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Control type="email" name='email' placeholder="Enter your email" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Control as="textarea" rows={4} name='message' onChange={handleChange} placeholder="Write your message here..." required />
                                </Form.Group>

                                <Button variant="dark" type="submit">
                                    Send Message
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}
