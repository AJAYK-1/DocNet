import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AdminNavbar from './adminnavbar'
import Footer from '../footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faUsers, faCalendarCheck, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />

      <div style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Container fluid>
          <h2 className="text-center mb-4" style={{ borderBottom: '2px solid #BDC3C7', paddingBottom: '0.2rem' }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
          </h2>

          {/* Management Section */}
          <Container className="mb-4">
            <h4 className="text-center mb-4" style={{ borderBottom: '2px solid #BDC3C7' }}>
              <i className="bi bi-tools me-2"></i>Management Section
            </h4>
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

          {/* Charts + Stat Cards Section */}
          <Row className="align-items-start g-4">
            <Col md={7}>
              {/* Bar Chart: Users vs Doctors */}
              <Card className="p-3 shadow-sm mb-4">
                <h5 className="text-center mb-3">Users vs Doctors</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: 'Users', value: Calculations.numberOfUsers || 0 },
                      { name: 'Doctors', value: Calculations.numberOfDoctors || 0 }
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" barSize={40}>
                      <Cell fill="#28a745" />
                      <Cell fill="#17a2b8" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Pie Chart: Appointments vs Prescriptions */}
              <Card className="p-3 shadow-sm">
                <h5 className="text-center mb-3">Appointments vs Prescriptions</h5>
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
                      <Cell fill="#007bff" />
                      <Cell fill="#ffc107" />
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Stat Cards */}
            <Col md={5}>
              <Row className="gy-4">
                <Col xs={12}>
                  <Card className="text-center shadow-sm border-info border-4">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-info" icon={faUsers} />
                      <Card.Title>Total Users</Card.Title>
                      <Card.Text style={{ fontSize: '22px' }}>{Calculations.numberOfUsers}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12}>
                  <Card className="text-center shadow-sm border-danger border-4">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-danger" icon={faUserDoctor} />
                      <Card.Title>Total Doctors</Card.Title>
                      <Card.Text style={{ fontSize: '22px' }}>{Calculations.numberOfDoctors}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12}>
                  <Card className="text-center shadow-sm border-warning border-4">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-warning" icon={faCalendarCheck} />
                      <Card.Title>Total Appointments</Card.Title>
                      <Card.Text style={{ fontSize: '22px' }}>{Calculations.numberOfAppointments}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12}>
                  <Card className="text-center shadow-sm border-success border-4">
                    <Card.Body>
                      <FontAwesomeIcon className="fa-2x mb-2 text-success" icon={faPrescriptionBottleMedical} />
                      <Card.Title>Total Prescriptions</Card.Title>
                      <Card.Text style={{ fontSize: '22px' }}>{Calculations.numberOfPrescriptions}</Card.Text>
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
