import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/footer'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa';
import { useGSAP } from '@gsap/react'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'
import Schedule from './schedule'
import EditProfile from './components/editprofile'
import CreateSchedule from './components/createSchedule'

export default function DoctorProfile() {

    const token = localStorage.getItem('token');

    const [DocData, setDocData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showModal, setShowModal] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/doctor/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                setDocData(res.data.data)
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...')
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleOpen = () => setShowModal(true);
    const handlecloseModal = () => setShowModal(false);

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const headerRef = useRef(null)

    useGSAP(() => {

        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
        )

        gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )
    }, [DocData.profileImage])

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '550px' }}>
                <Container className="my-5">
                    <Row className="justify-content-center text-center">
                        <Col xs={12}>
                            <h1
                                className='flex justify-center'
                                ref={headerRef}
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: '700',
                                    color: '#34495E',
                                    marginBottom: '1rem',
                                }}
                            >
                                <FaAddressCard size={32} style={{ marginBottom: '5px', marginRight: '10px', color: '#2980B9' }} />
                                Profile
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
                                src={`${import.meta.env.VITE_HOST_URL}/uploads/${DocData.profileImage}`}
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
                                        Dr. {DocData.name}
                                    </Card.Title>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Email:</strong> {DocData.email || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Medical License:</strong> {DocData.license || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Educational Qualification:</strong> {DocData.qualification || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Specialization:</strong> {DocData.specialization || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Address:</strong> {DocData.address || 'N/A'}
                                    </Card.Text>

                                    <Button variant="success" size="md" style={{ fontWeight: '600' }} onClick={() => navigate('/schedule')}>
                                        Your Schedule
                                    </Button>

                                    {showModal && (
                                        // <CreateSchedule token={token} handlecloseModal={handlecloseModal} />
                                        <Schedule token={token} handlecloseModal={handlecloseModal} />
                                    )}

                                    <div className="d-flex gap-3 justify-content-center mt-3">
                                        <Button variant="outline-warning" size="md" style={{ fontWeight: '600' }} onClick={handleShow}>
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
            </div>

            <EditProfile DocData={DocData} show={show} handleClose={handleClose} />
            <Footer />
        </>
    )
}
