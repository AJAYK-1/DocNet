import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaNotesMedical } from 'react-icons/fa';


export default function GetMyPrescription() {

    const [prescriptions, setPrescriptions] = useState([]);
    const fetchtoken = localStorage.getItem('token');
    const decodedtoken = jwtDecode(fetchtoken);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_HOST_URL}/api/user/fetchmyprescription`, {
                headers: { id: decodedtoken.id }
            })
            .then((res) => {
                setPrescriptions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <UserNavbar />
            <div style={{ minHeight: '550px',paddingBottom: '40px' }}>
                <Container className="mt-4 mb-5">
                    <h2 className="text-center mb-4"
                        style={{ fontFamily: "'Poppins', sans-serif", color: '#2c3e50', borderBottom: '2px solid #BDC3C7', fontSize: '2.2rem' }}>
                        <FaNotesMedical style={{ marginRight: '10px', marginBottom: '10px', color: '#2980B9' }} />
                        Prescriptions</h2>
                    <Row className="g-4">
                        {prescriptions.map((presc) => (
                            <Col md={6} key={presc._id}>
                                <Card className="shadow-sm border-2" border='danger'>
                                    <Card.Body>
                                        <Card.Title className="text-primary">Dr. {presc.docname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Patient: {presc.patientName}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">Doctor's Mention: {presc.mention}</Card.Subtitle>
                                        <hr />
                                        <h6 className="mb-3">Medicines Prescribed:</h6>
                                        <ListGroup variant="flush">
                                            {presc.prescription.map((item, index) => (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between">
                                                    <div>
                                                        <strong>{item.medicine}</strong>
                                                        <div className="text-muted small">Dosage: {item.dosage}</div>
                                                    </div>
                                                    <span className="badge bg-secondary align-self-center">
                                                        Qty: {item.quantity}
                                                    </span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}
