import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AdminNavbar from './adminnavbar'
import Footer from '../footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faUsers, faCalendarCheck,faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'


export default function Adminhome() {
  const navigate = useNavigate()
  const [Calculations, setCalculations] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9000/api/admin/admingetappointments')
      .then((res) => {
        setCalculations({
          numberOfUsers: res.data.numberOfUsers.length,
          numberOfDoctors: res.data.numberOfDoctors.length,
          numberOfAppointments: res.data.numberOfAppointments.length,
          numberOfPrescriptions: res.data.numberOfPrescriptions.length
        })
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <AdminNavbar />
      <div style={{ minHeight: '500px' }}>
        <Container className="my-5" >
          <h2 className="text-center mb-4" style={{ borderBottom: '2px solid #BDC3C7', paddingBottom: '0.2rem' }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
          </h2>
          <Row className="g-4 justify-content-center">
            <Col md={5}>
              <Card className="text-center shadow-sm border-info">
                <Card.Body>
                  <i className="bi bi-people-fill fs-1 text-primary mb-3"></i>
                  <FontAwesomeIcon className='fa-3x mt-3 mb-3 text-info' icon={faUsers} beat />
                  <Card.Title>Total Number of Users:</Card.Title>
                  <Card.Title style={{ fontSize: '30px', fontFamily: 'sans-serif', paddingBottom: '0.2rem' }}>{Calculations.numberOfUsers}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="text-center shadow-sm border-danger">
                <Card.Body>
                  <i className="bi bi-person-badge-fill fs-1 text-info mb-3"></i>
                  <FontAwesomeIcon className='fa-3x mt-3 mb-3 text-danger' icon={faUserDoctor} beat />
                  <Card.Title>Total Number of Doctors:</Card.Title>
                  <Card.Title style={{ fontSize: '30px', fontFamily: 'sans-serif' }}>{Calculations.numberOfDoctors}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="text-center shadow-sm border-warning">
                <Card.Body>
                  <i className="bi bi-people-fill fs-1 text-primary mb-3"></i>
                  <FontAwesomeIcon className='fa-3x mt-3 mb-3 text-warning' icon={faCalendarCheck} beat />
                  <Card.Title>Total Number of Appointments from users:</Card.Title>
                  <Card.Title style={{ fontSize: '30px', fontFamily: 'sans-serif', paddingBottom: '0.2rem' }}>{Calculations.numberOfAppointments}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="text-center shadow-sm border-success">
                <Card.Body>
                  <i className="bi bi-person-badge-fill fs-1 text-success mb-3"></i>
                  <FontAwesomeIcon className='fa-3x mt-3 mb-3 text-success' icon={faPrescriptionBottleMedical} beat />
                  <Card.Title>Total Number of Prescriptons from doctors:</Card.Title>
                  <Card.Title style={{ fontSize: '30px', fontFamily: 'sans-serif' }}>{Calculations.numberOfPrescriptions}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="my-5" >
          <h2 className="text-center mb-4 " style={{ borderBottom: '2px solid #BDC3C7' }}>
            <i className="bi bi-speedometer2 me-2 "></i>MANAGEMENT SECTION
          </h2>
          <Row className="g-4 justify-content-center">
            <Col md={5}>
              <Card className="text-center shadow-sm border-primary">
                <Card.Body>
                  <i className="bi bi-people-fill fs-1 text-primary mb-3"></i>
                  <Card.Title>Manage Users</Card.Title>
                  <Card.Text>View and manage all users</Card.Text>
                  <Button variant="primary" onClick={() => navigate("/adminviewusers")}>
                    <i className="bi bi-eye-fill me-2"></i>View Users
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="text-center shadow-sm border-success">
                <Card.Body>
                  <i className="bi bi-person-badge-fill fs-1 text-success mb-3"></i>
                  <Card.Title>Manage Doctors</Card.Title>
                  <Card.Text>View and manage all doctors</Card.Text>
                  <Button variant="success" onClick={() => navigate("/adminviewdoctors")}>
                    <i className="bi bi-eye-fill me-2"></i>View Doctors
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}
