import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import UserNavbar from './usernavbar'
import Footer from '../footer'
import { FaHeartbeat, FaRegCommentDots } from 'react-icons/fa'
import { Row, Col, Card, ListGroup, Modal, Button } from 'react-bootstrap';


export default function Appointment() {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const [Appointments, setAppointments] = useState([])
  const [prescriptions, setPrescription] = useState({
    appointmentId: '',
    prescription: [
      { medicine: '', quantity: '', dosage: '' }]
  })
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewloggeduser`, { headers: { id: decoded.id } })
      .then((res) => {
        console.log("User logged in...")
      }).catch((err) => {
        console.log(err)
      })

    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/fetchmyappointments`, { headers: { id: decoded.id } })
      .then((res) => {
        setAppointments(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const handleButton = (id) => {
    setModalShow(true)
    const appId = id
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/fetch-prescription-byId`, { headers: { id: appId } })
      .then((res) => {
        if (res.data.status == 200) {
          setPrescription(res.data.data)
        } else {
          setPrescription(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <UserNavbar />
      <div style={{ minHeight: '550px', padding: '40px' }}>
        <div>
          <h2
            className="mb-4 mt-5 text-center d-flex justify-content-center align-items-center"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2.2rem',
              color: '#34495E',
              borderBottom: '2px solid #BDC3C7',
              display: 'inline-flex',
              paddingBottom: '0.2rem',
            }}
          >
            <FaHeartbeat style={{ marginRight: '10px', color: '#E74C3C' }} />
            Your Appointments
          </h2>
        </div>
        {Appointments.length === 0 ? (
          <p className="text-center mt-5 fs-5 text-muted">No appointments found.</p>
        ) : (
          <div className="row g-4">
            {Appointments.map((appointment) => (
              <div className="col-md-6 col-lg-4" key={appointment._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-danger">
                      Your Appointment to Dr. {appointment.doctorId?.docname || 'N/A'}
                    </h5>
                    <h5 className='card-subtitle text-primary'>{appointment.appointmentDate}</h5>
                    <p className="card-text mb-1">
                      <strong>Patient Name:</strong> {appointment.patientName}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Age:</strong> {appointment.patientAge}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Gender:</strong> {appointment.patientGender}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Symptoms:</strong> {appointment.patientSymptoms}
                    </p>
                    <button
                      className="btn btn-outline-info mt-auto"
                      onClick={() => handleButton(appointment._id)}
                    >
                      💊 View Prescription
                    </button>
                  </div>
                </div>
                <Modal
                  show={modalShow} onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Your Prescription
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {prescriptions.prescription ? (
                      <Row className="g-4">
                        {prescriptions.prescription.map((item, index) => (
                          <Col md={6} key={index}>
                            <Card className="shadow-sm border-2" border="success">
                              <Card.Body>
                                <ListGroup variant="flush">
                                  <ListGroup.Item className="d-flex justify-content-between">
                                    <div>
                                      <strong>{item.medicine}</strong>
                                      <div className="text-muted small">Dosage: {item.dosage}</div>
                                    </div>
                                    <span className="badge bg-secondary align-self-center">
                                      Qty: {item.quantity}
                                    </span>
                                  </ListGroup.Item>
                                </ListGroup>

                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                        <Col md={6} sm={6} xs={12} >
                          <Card className="h-100 border-success border-4">
                            <Card.Body>
                              <Card.Title className="text-primary">
                                <FaRegCommentDots className="me-2 text-dark mb-1" />
                                <strong>Doctor Mentioned:</strong>
                              </Card.Title>
                              <Card.Text>
                                <strong>{prescriptions.mention}</strong>

                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    ) : (
                      <p className="text-muted">No prescription available.</p>
                    )}
                  </Modal.Body>


                  <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
