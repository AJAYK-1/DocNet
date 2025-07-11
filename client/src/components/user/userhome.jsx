import React, { useState, useEffect, useMemo } from 'react';
import AXIOS from 'axios';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { BsGeoAltFill, BsCalendarCheck, BsPersonWorkspace, BsPersonCircle, BsFileEarmarkText } from "react-icons/bs";
import { FaArrowRight, FaHeartbeat } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useGSAP } from '@gsap/react';
import { HomePageContentSection, UserSection } from '../gsapAnimation';
import '../App.css'
import { useNavigate } from 'react-router-dom';


export default function UserHome() {

    const decoded = useMemo(() => {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    }, [])

    const [DocProfiles, setDocProfiles] = useState([]);
    const [UserData, setUserData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        AXIOS.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewdoctors`)
            .then((res) => {
                setDocProfiles(res.data.data);
            }).catch((err) => {
                console.log(err);
            });

        AXIOS.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewloggeduser`, { headers: { id: decoded.id } })
            .then((res) => {
                setUserData(res.data.data);
            }).catch((err) => {
                console.log(err);
            });

        AXIOS.get(`${import.meta.env.VITE_HOST_URL}/api/user/fetchmyappointments`, { headers: { id: decoded.id } })
            .then((res) => {
                const pendingAppointments = res.data.data.filter(
                    (a) => a.appointmentStatus === "Complete"
                );
                if (pendingAppointments.length > 0) {
                    toast.info(`Your appointment is complete`, {
                        position: 'top-center',
                        autoClose: 1000,
                    });
                }
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    const navigate = useNavigate()

    useGSAP(() => {
        if (UserData.username) {
            UserSection()
        }
        HomePageContentSection()
    }, [UserData.username])

    return (
        <>
            <UserNavbar />

            <div className="hero-section">
                <div className="hero-overlay"></div>
                <h1 className=" mb-4 text-center">
                    <span className='welcome-part'>Welcome </span>
                    <span className='user-name'>{UserData.username}</span>
                </h1>
            </div>
            <div style={{ padding: '20px' }}>
                <div className="health-quote-section py-5">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="text-left">
                                <h1 className="health-quote-text">
                                    Healthcare, Simplified. <br /> Book Appointments in Minutes.
                                </h1>
                            </Col>
                            <Col md={6} className="text-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/5703/5703412.png"
                                    alt="Healthcare"
                                    className="img-fluid health-image"
                                    style={{ maxWidth: '80%' }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="stat-card-background row justify-content-center text-center mb-4 mt-5" style={{ padding: '20px' }}>
                    <h1 className="health-quote-text mb-4">
                        Just one click to see...
                    </h1>
                    {/* Cards */}
                    <div className="col-md-4">
                        <div className="info-card card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsPersonCircle size={50} className="mb-3 text-primary" />
                                <h5 className="card-title">Your Profile</h5>
                                <p className="card-text">View and update your personal and medical profile.</p>
                                <a href="/userprofile" className="btn btn-outline-primary w-100 mt-2">Go to Profile</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="info-card card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsCalendarCheck size={50} className="mb-3 text-success" />
                                <h5 className="card-title">Your Appointments</h5>
                                <p className="card-text">Track your appointments with ease.</p>
                                <a href="/appointment" className="btn btn-outline-success w-100 mt-2">View Appointments</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="info-card card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsFileEarmarkText size={50} className="mb-3 text-secondary" />
                                <h5 className="card-title">Your Prescription</h5>
                                <p className="card-text">Access your prescriptions and view treatment details.</p>
                                <a href="/getprescription" className="btn btn-outline-secondary w-100 mt-2">View Prescriptions</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Cards */}
                <h2 className="text-left mb-4 mt-5" style={{ fontFamily: "'Poppins', sans-serif", color: '#2c3e50', borderBottom: '2px solid #BDC3C7', fontSize: '2.2rem' }}>
                    Find the best doctors
                </h2>

                <div className="row g-4" style={{ background: 'rgba(219, 227, 236, 0.41)', borderRadius: '10px', padding: '10px' }}>

                    {DocProfiles.slice(0, 2).map((doctor) => (
                        <div className="col-md-4" key={doctor._id}>
                            <Card id='info-card' className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={`${import.meta.env.VITE_HOST_URL}/uploads/${doctor.profileImage}`}
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title>Dr. {doctor.docname}</Card.Title>
                                    <Card.Text className="mb-1 text-muted">
                                        <BsPersonWorkspace className="me-2 text-primary" />
                                        {doctor.qualification}
                                    </Card.Text>
                                    <Card.Text className="mb-1 text-muted">
                                        <FaHeartbeat className="me-2 text-danger" />
                                        {doctor.specialization}
                                    </Card.Text>
                                    <Card.Text className="text-muted">
                                        <BsGeoAltFill className="me-2 text-success" />
                                        {doctor.address}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    {/* Show More Button */}
                    <div className="col-md-4 text-center" style={{ marginTop: '200px' }}>
                        <Button id='info-card' variant="info" onClick={() => navigate('/seealldoctors')} style={{ borderRadius: '20px' }}>
                            See more doctors <FaArrowRight className="ms-2" />
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
