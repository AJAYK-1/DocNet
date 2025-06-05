import React, { useState, useEffect } from 'react'
import AXIOS from 'axios'
import { jwtDecode } from 'jwt-decode'
import DoctorNavbar from './doctornavbar'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function DoctorProfile() {

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const [DocData, setDocData] = useState({
        docname: '',
        email: ''
    })

    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/doctor/viewloggeddoctor", { headers: { id: decoded.id } })
            .then((res) => {
                setDocData(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <DoctorNavbar />
            <h1>Welcome Doctor</h1>
            <Container >
                <Row>
                    <Col xs={5} md={5}>
                        <Image src={`http://localhost:9000/uploads/${DocData.profileImage}`} height={300} width={300} roundedCircle />
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    Dr. {DocData.docname}
                                    </Card.Title>
                                <Card.Title>
                                    Email: {DocData.email}
                                    </Card.Title>
                                <Card.Text>
                                    Address: {DocData.address}
                                </Card.Text>
                                <Button variant="outline-warning">📝Edit</Button>
                                <Button variant="outline-danger">📤Logout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
