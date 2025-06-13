import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css'
import DoctorNavbar from './doctornavbar'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { FaNotesMedical, FaUser, FaPills,FaRegCommentDots } from 'react-icons/fa'
import Footer from '../footer'


export default function ViewPrescription() {

    const [prescriptions, setPrescriptions] = useState([])

    const fetchtoken = localStorage.getItem('token')
    const decodedtoken = jwtDecode(fetchtoken)

    useEffect(() => {
        axios.get("http://localhost:9000/api/doctor/viewprescription", {
            headers: { id: decodedtoken.id }
        }).then((res) => {
            setPrescriptions(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <>
            <DoctorNavbar />
            <Container className="mt-5" style={{minHeight:'500px'}}>
                <h2 className="text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#2c3e50', borderBottom: '2px solid #BDC3C7', fontSize: '2.2rem' }}>
                    <FaNotesMedical style={{ marginRight: '10px', marginBottom: '10px', color: '#2980B9' }} />
                    Prescriptions
                </h2>
                {prescriptions.length === 0 ? (
                    <p className="text-center mt-5 fs-5 text-muted">No prescriptions found.</p>
                ) : (
                    prescriptions.map((presc, prescIndex) => (
                        <Card className="mb-4 shadow" key={prescIndex}>
                            <Card.Header style={{ backgroundColor: '#2c3e50', color: '#fff' }}>
                                <FaUser className="me-2" />
                                Patient: {presc.patientName} | From: {presc.username}
                            </Card.Header>
                            <Card.Body>
                                <Row className="g-3">
                                    {presc.prescription.map((item, index) => (
                                        <Col md={4} sm={6} xs={12} key={index}>
                                            <Card className="h-100 border-info">
                                                <Card.Body>
                                                    <Card.Title className="text-info">
                                                        <FaPills className="me-2 text-danger" />
                                                        {item.medicine}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <strong>Quantity:</strong> {item.quantity}<br />
                                                        <strong>Dosage:</strong> {item.dosage} <br />
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                    <Col md={4} sm={6} xs={12} >
                                            <Card className="h-100 border-success border-4">
                                                <Card.Body>
                                                    <Card.Title className="text-primary">
                                                        <FaRegCommentDots className="me-2 text-dark mb-1" />
                                                        <strong>Mention:</strong> 
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <strong>{presc.mention}</strong> 
                                                        
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
            <Footer/>
        </>
    )
}
