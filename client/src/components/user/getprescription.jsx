import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

export default function GetMyPrescription() {
    const [prescriptions, setPrescriptions] = useState([]);
    const fetchtoken = localStorage.getItem('token');
    const decodedtoken = jwtDecode(fetchtoken);

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/user/fetchmyprescription", {
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
            <div style={{ minHeight: '500px' }}>
                <Container className="mt-4 mb-5">
                    <h2 className="text-center mb-4">Your Prescriptions</h2>

                    <Row className="g-4">
                        {prescriptions.map((presc) => (
                            <Col md={6} key={presc._id}>
                                <Card className="shadow-sm border-2" border='danger'>
                                    <Card.Body>
                                        <Card.Title className="text-primary">Dr. {presc.docname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Patient: {presc.patientName}</Card.Subtitle>
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
