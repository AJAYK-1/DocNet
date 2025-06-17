import React, { useState, useEffect } from 'react';
import AXIOS from 'axios';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { Form, FloatingLabel, Modal, Card, Button } from 'react-bootstrap';
import { BsGeoAltFill, BsPersonWorkspace } from "react-icons/bs";
import { FaHeartbeat, FaSearch } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './userStyling.css';


export default function SeeAllDoctors() {

  const [DocProfiles, setDocProfiles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDates, setSelectedDates] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [PatientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientSymptoms: ''
  });
  const [UserData, setUserData] = useState({
    username: '',
    email: ''
  });
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    AXIOS.get("http://localhost:9000/api/user/viewdoctors")
      .then(res => setDocProfiles(res.data))
      .catch(err => console.log(err));

    AXIOS.get("http://localhost:9000/api/user/viewloggeduser", { headers: { id: decoded.id } })
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setPatientDetails({ ...PatientDetails, [e.target.name]: e.target.value });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedDoctor(null);
    setSelectedDates();
  };

  const handleSubmit = (doctor) => {
    setSelectedDoctor(doctor);
    handleShow();
  };

  const handleAppointment = async (docId) => {
    const appointDate = selectedDates.format("YYYY-MM-D");
    AXIOS.post('http://localhost:9000/api/user/bookappointment', {
      userId: decoded.id,
      doctorId: docId,
      ...PatientDetails,
      appointmentDate: appointDate
    })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.msg);
          setTimeout(() => navigate('/appointment'), 3000);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Booking failed.");
      });
  };

  return (
    <>
      <UserNavbar />

      <div className="see-all-container">
        <h2 className="see-all-heading">Find the best doctors</h2>

        <div className="row g-4 doctor-section-wrapper">
          <div className="position-relative mb-4">
            <Form.Control
              type="text"
              placeholder="Search doctors by name, specialization or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <FaSearch className="search-icon" />
          </div>

          {DocProfiles.filter((doctor) => {
            const query = searchTerm.toLowerCase();
            return (
              doctor.docname.toLowerCase().includes(query) ||
              doctor.specialization.toLowerCase().includes(query) ||
              doctor.address.toLowerCase().includes(query)
            );
          }).map((doctor) => (
            <div className="col-md-3" key={doctor._id}>
              <Card className="h-100 shadow-sm border-0 doctor-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:9000/uploads/${doctor.profileImage}`}
                  className="doctor-img"
                />
                <Card.Body>
                  <Card.Title>Dr. {doctor.docname}</Card.Title>
                  <Card.Text className="mb-1 text-muted">
                    <BsPersonWorkspace className="me-2 text-primary" />
                    {doctor.qualification}
                  </Card.Text>
                  <Card.Text className="mb-1 text-muted">
                    <FaHeartbeat className="me-2 text-danger" />
                    {doctor.specialization}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <BsGeoAltFill className="me-2 text-success" />
                    {doctor.address}
                  </Card.Text>
                  <Button variant="info" className="w-100 mt-2" onClick={() => handleSubmit(doctor)}>
                    Book an Appointment
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleAppointment(selectedDoctor._id);
          }}>
            <Modal.Header closeButton>
              <Modal.Title>✏️ Fill the Patient's Details please</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-bg">
              <FloatingLabel controlId="floatingPatientName" label="Patient's Name" className="mb-3">
                <Form.Control type="text" name="patientName" onChange={handleChange} placeholder="Enter name" required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPatientAge" label="Patient's Age" className="mb-3">
                <Form.Control type="number" name="patientAge" onChange={handleChange} placeholder="Enter age" required />
              </FloatingLabel>
              <Form.Group className="mb-3">
                <Form.Label className='text-muted'>Patient's Gender:</Form.Label>
                <Form.Check type='radio' label='♂️ Male' name="patientGender" value={'Male'} onChange={handleChange} required />
                <Form.Check type='radio' label='♀️ Female' name="patientGender" value={'Female'} onChange={handleChange} />
              </Form.Group>
              <FloatingLabel controlId="floatingSymptoms" label="Patient's Symptoms" className="mb-3">
                <Form.Control as="textarea" name="patientSymptoms" onChange={handleChange} style={{ height: '100px' }} required />
              </FloatingLabel>
              <Form.Label className='text-muted'>Select Appointment date:</Form.Label>
              <DatePicker
                disable={(selectedDoctor.schedule || [])
                  .filter(entry => entry.availability === "Unavailable")
                  .map(item => new DateObject(item.dates))}
                onChange={(date) => setSelectedDates(date)}
                value={selectedDates}
                format="YYYY-MM-DD"
                minDate={new Date()}
                highlightToday
                onlyCalendar
                mapDays={({ date }) => {
                  const isUnavailable = (selectedDoctor.schedule || []).some(
                    entry => entry.availability === "Unavailable" && entry.dates === date.format("YYYY-MM-DD")
                  );
                  return {
                    disabled: isUnavailable,
                    style: isUnavailable
                      ? { backgroundColor: "#e74c3c", color: "white", borderRadius: "50%" }
                      : {}
                  };
                }}
                required
              />
              <Form.Text className='text-muted'>
                ⚠️ You cannot select a date on which the doctor is unavailable.
              </Form.Text>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type='submit'>Confirm Booking</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}

      <Footer />
    </>
  );
}
