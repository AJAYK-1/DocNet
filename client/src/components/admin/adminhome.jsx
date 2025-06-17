import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AdminNavbar from './adminnavbar'
import Footer from '../footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faUsers, faCalendarCheck, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'rgb(204, 209, 212)' }}>
      <AdminNavbar />

      <div style={{ flex: 1, padding: '20px' }}>
        <Container fluid>
          <h2 className="text-center mb-4" style={{ color: 'black', borderBottom: '2px solid #ccc', paddingBottom: '0.2rem' }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
          </h2>

          {/* Management Section */}
          <Container className="mb-4">
            <h4 className="text-center mb-4" style={{ color: 'black', borderBottom: '2px solid #ccc' }}>
              <i className="bi bi-tools me-2"></i>Management Section
            </h4>
            <Row className="g-4 justify-content-center">
              <Col md={5}>
                <Card className="text-center shadow-sm border border-2 border-light bg-light">
                  <Card.Body>
                    <i className="bi bi-people-fill fs-1 text-dark mb-3"></i>
                    <Card.Title style={{ color: 'black' }}>Manage Users</Card.Title>
                    <Card.Text style={{ color: 'black' }}>View and manage all users</Card.Text>
                    <Button variant="primary" onClick={() => navigate("/adminviewusers")}>
                      <i className="bi bi-eye-fill me-2"></i>View Users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="text-center shadow-sm border border-2 border-light bg-light">
                  <Card.Body>
                    <i className="bi bi-person-badge-fill fs-1 text-dark mb-3"></i>
                    <Card.Title style={{ color: 'black' }}>Manage Doctors</Card.Title>
                    <Card.Text style={{ color: 'black' }}>View and manage all doctors</Card.Text>
                    <Button variant="success" onClick={() => navigate("/adminviewdoctors")}>
                      <i className="bi bi-eye-fill me-2"></i>View Doctors
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Charts + Stat Cards Section */}
          <h4 className="text-center mb-4" style={{ color: 'black', borderBottom: '2px solid #ccc' }}>
            <i className="bi bi-tools me-2"></i>System Overview
          </h4>
          <Row className="align-items-start g-4">
            <Col md={7} style={{ marginLeft: '200px', height: '500px', width: '500px' }}>
              <Card className="p-3 shadow-sm border-0 bg-light">
                <h5 className="text-center mb-3" style={{ color: 'black' }}>Appointments vs Prescriptions</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Appointments', value: Calculations.numberOfAppointments || 0 },
                        { name: 'Prescriptions', value: Calculations.numberOfPrescriptions || 0 }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      <Cell fill="rgb(255, 0, 0)" />
                      <Cell fill="rgb(7, 255, 251)" />
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Stat Cards */}
            <Col md={5}>
              <Row className="g-4 justify-content-center">
                <Col xs={6}>
                  <Card className="text-center shadow-sm border border-2 border-light bg-light">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-danger" icon={faUsers} />
                      <Card.Title style={{ color: 'black' }}>Total Users</Card.Title>
                      <Card.Text style={{ fontSize: '22px', color: 'black' }}>
                        {Calculations.numberOfUsers}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6}>
                  <Card className="text-center shadow-sm border border-2 border-light bg-light">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-info" icon={faUserDoctor} />
                      <Card.Title style={{ color: 'black' }}>Total Doctors</Card.Title>
                      <Card.Text style={{ fontSize: '22px', color: 'black' }}>
                        {Calculations.numberOfDoctors}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6}>
                  <Card className="text-center shadow-sm border border-2 border-light bg-light">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-warning" icon={faCalendarCheck} />
                      <Card.Title style={{ color: 'black' }}>Total Appointments</Card.Title>
                      <Card.Text style={{ fontSize: '22px', color: 'black' }}>
                        {Calculations.numberOfAppointments}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6}>
                  <Card className="text-center shadow-sm border border-2 border-light bg-light">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-success" icon={faPrescriptionBottleMedical} />
                      <Card.Title style={{ color: 'black' }}>Total Prescriptions</Card.Title>
                      <Card.Text style={{ fontSize: '22px', color: 'black' }}>
                        {Calculations.numberOfPrescriptions}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  )
}
