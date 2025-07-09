import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import DoctorNavbar from './doctornavbar'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { FaCalendarCheck, FaPrescriptionBottleAlt, FaUserMd } from 'react-icons/fa'
import Footer from '../footer'
import { toast } from 'react-toastify'


export default function Doctorhome() {

  const doctorstoken = localStorage.getItem('token')
  const decodedtoken = jwtDecode(doctorstoken)

  const notified = useRef(false)

  useEffect(() => {

    if (notified.current) return

    axios.get(`${import.meta.env.VITE_HOST_URL}/api/doctor/fetchappointments`, {
        headers: { id: decodedtoken.id },
      })
      .then((res) => {
        const pendingAppointments = res.data.data.filter(
          (a) => a.appointmentStatus === "Pending"
        );

        if (pendingAppointments.length > 0) {
          toast.info(`🩺 You have ${pendingAppointments.length} pending appointment(s).`, {
            position: 'top-center',
            autoClose: 3000,
          });
          notified.current = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <DoctorNavbar />
      <div style={{ minHeight: '600px' }}>

        {/* Hero Welcome Section */}
        <div style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: 'white',
          padding: '60px 0',
          textAlign: 'center'
        }}>
          <Container>
            <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Welcome, Doctor!</h1>
            <p style={{ fontSize: '1.2rem' }}>Manage your appointments, prescriptions, and profile with ease.</p>
          </Container>
        </div>

        {/* Action Cards */}
        <Container className="my-5">
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm text-center border-primary">
                <Card.Body>
                  <FaCalendarCheck size={40} className="text-primary mb-3" />
                  <Card.Title>View Appointments</Card.Title>
                  <Card.Text>See your scheduled appointments and plan your day efficiently.</Card.Text>
                  <Button variant="primary" href="/viewappointment">Go</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm text-center border-success">
                <Card.Body>
                  <FaPrescriptionBottleAlt size={40} className="text-success mb-3" />
                  <Card.Title>Prescriptions</Card.Title>
                  <Card.Text>Access and manage all your written prescriptions in one place.</Card.Text>
                  <Button variant="success" href="/viewprescription">View</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm text-center border-info">
                <Card.Body>
                  <FaUserMd size={40} className="text-info mb-3" />
                  <Card.Title>Profile</Card.Title>
                  <Card.Text>Update your profile, availability, and contact information.</Card.Text>
                  <Button variant="info" href="/doctorprofile">Edit</Button>
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
