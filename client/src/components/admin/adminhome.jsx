import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AdminNavbar from './adminnavbar'
import Footer from '../footer'
import { useNavigate } from 'react-router-dom'

export default function Adminhome() {
  const navigate = useNavigate()

  return (
    <>
      <AdminNavbar />
      <Container className="my-5" style={{minHeight:'500px'}}>
        <h2 className="text-center mb-4">
          <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
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
      <Footer />
    </>
  )
}
