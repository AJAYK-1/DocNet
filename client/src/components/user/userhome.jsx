import React, { useState, useEffect } from 'react';
import AXIOS from 'axios';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { Form, FloatingLabel, Modal, Card, Button, Toast } from 'react-bootstrap';
import { BsGeoAltFill, BsCalendarCheck, BsPersonWorkspace, BsPersonCircle, BsFileEarmarkText } from "react-icons/bs";
import { FaHeartbeat } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';


export default function UserHome() {
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

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/user/viewdoctors")
            .then((res) => {
                setDocProfiles(res.data);
            }).catch((err) => {
                console.log(err);
            });

        AXIOS.get("http://localhost:9000/api/user/viewloggeduser", { headers: { id: decoded.id } })
            .then((res) => {
                setUserData(res.data);
            }).catch((err) => {
                console.log(err);
            });
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
        const appointDate = selectedDates.format("YYYY-MM-D")
        console.log(appointDate)
        AXIOS.post('http://localhost:9000/api/user/bookappointment', {
            userId: decoded.id,
            doctorId: docId,
            patientName: PatientDetails.patientName,
            patientAge: PatientDetails.patientAge,
            patientGender: PatientDetails.patientGender,
            patientSymptoms: PatientDetails.patientSymptoms,
            appointmentDate: appointDate
        })
            .then((res) => {
                toast.success(res.data)
                handleClose();
            }).catch((err) => {
                console.log(err);
                toast.error(err)
            });
    };

    return (
        <>
            <UserNavbar />
            <div className="container mt-4">
                <h1 className="mb-4 text-center">Welcome {UserData.username}</h1>

                <div className="row justify-content-center mb-4">
                    {/* Cards */}
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsPersonCircle size={50} className="mb-3 text-primary" />
                                <h5 className="card-title">Your Profile</h5>
                                <p className="card-text">View and update your personal and medical profile.</p>
                                <a href="/userprofile" className="btn btn-outline-primary w-100 mt-2">Go to Profile</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsCalendarCheck size={50} className="mb-3 text-success" />
                                <h5 className="card-title">Your Appointments</h5>
                                <p className="card-text">Track your appointments with ease.</p>
                                <a href="/appointment" className="btn btn-outline-success w-100 mt-2">View Appointments</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm border-0 h-100">
                            <div className="card-body">
                                <BsFileEarmarkText size={50} className="mb-3 text-secondary" />
                                <h5 className="card-title">Your Prescription</h5>
                                <p className="card-text">Access your prescriptions and view treatment details.</p>
                                <a href="/getprescription" className="btn btn-outline-secondary w-100 mt-2">View Prescriptions</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Cards */}
                <h2 className="text-left mb-4 mt-5" style={{ fontFamily: "'Poppins', sans-serif", color: '#2c3e50', borderBottom: '2px solid #BDC3C7', fontSize: '2.2rem' }}>
                    Find the best doctors
                </h2>

                <div className="row g-4">
                    {DocProfiles.map((doctor) => (
                        <div className="col-md-4" key={doctor._id}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:9000/uploads/${doctor.profileImage}`}
                                    style={{ height: "250px", objectFit: "cover" }}
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

            {/* Modal for selected doctor */}
            {selectedDoctor && (
                <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={() => handleAppointment(selectedDoctor._id)}>
                        <Modal.Header closeButton>
                            <Modal.Title>✏️ Fill the Patient's Details please</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

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

                            <FloatingLabel controlId="floatingDocAddress" label="Patient's Symptoms" className="mb-3">
                                <Form.Control as="textarea" name="patientSymptoms" onChange={handleChange} style={{ height: '100px' }} required />
                            </FloatingLabel>

                            <Form.Label className='text-muted'>Select Appointment date:</Form.Label>
                            <DatePicker
                                disable={(selectedDoctor.schedule || [])
                                    .filter(entry => entry.availability === "Unavailable")
                                    .map(item => new DateObject(item.dates))
                                }
                                onChange={(date) => setSelectedDates(date)}
                                value={selectedDates}
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                                multiple={false}
                                highlightToday
                                onlyCalendar
                                inline
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
                                required />
                            <Form.Label className='text-muted'>⚠️ You cannot select the date on which the doctor is unavailable for appointments.</Form.Label>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type='submit' >Confirm Booking</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}

            <Footer />
        </>
    );
}
