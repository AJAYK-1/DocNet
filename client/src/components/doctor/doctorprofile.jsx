import React, { useState, useEffect, useRef } from 'react'
import AXIOS from 'axios'
import { jwtDecode } from 'jwt-decode'
import DoctorNavbar from './doctornavbar'
import { Container, Row, Col, Image, Card, Button, Form, FloatingLabel } from 'react-bootstrap'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Footer from '../footer'
import { useGSAP } from '@gsap/react'
import DatePicker, { DateObject } from "react-multi-date-picker"
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'


export default function DoctorProfile() {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const [DocData, setDocData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ProfileEdit, setProfileEdit] = useState({
        docname: '',
        address: '',
        license: '',
        qualification: '',
        specialization: ''
    });
    const [doctorImage, setDoctorImage] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        AXIOS.get('http://localhost:9000/api/doctor/viewloggeddoctor', {
            headers: { id: decoded.id }
        })
            .then((res) => {
                setDocData(res.data.data)
                console.log(res.data.data.docname)
                const unavailableDates = res.data.data.schedule
                    .filter(entry => entry.availability === "Unavailable")
                    .map(item => item.dates);

                setMarkedDates(unavailableDates); // Used to highlight red dates
                setSelectedDates(unavailableDates.map(d => new DateObject(d))); // Initialize selection in calendar

                setProfileEdit({
                    docname: res.data.data.docname,
                    address: res.data.data.address,
                    license: res.data.data.license,
                    qualification: res.data.data.qualification,
                    specialization: res.data.data.specialization
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    const handleChange = (e) => {
        setProfileEdit({ ...ProfileEdit, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setDoctorImage(e.target.files[0])
    }

    const handleSaveChanges = (e) => {
        e.preventDefault()

        const newData = new FormData()
        newData.append('docname', ProfileEdit.docname)
        newData.append('license', ProfileEdit.license)
        newData.append('qualification', ProfileEdit.qualification)
        newData.append('specialization', ProfileEdit.specialization)
        newData.append('address', ProfileEdit.address)
        newData.append('profileImage', doctorImage)

        handleClose()
        AXIOS.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/doctoreditprofile`, newData, { headers: { id: decoded.id } })
            .then((res) => {
                if(res.data.status == 200) {
                    toast.success(res.data.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            }).catch((err) => {
                console.log(err)
                toast.error(err)
            })
    }


    const [showModal, setShowModal] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [markedDates, setMarkedDates] = useState([])

    const handleOpen = () => setShowModal(true);
    const handlecloseModal = () => setShowModal(false);

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    }

    const handleAvailability = (e) => {
        e.preventDefault()
        const formattedSchedule = selectedDates.map((date) => ({
            dates: date.format("YYYY-MM-DD")
        }));
        console.log(formattedSchedule)
        AXIOS.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/changeavailability`, { id: decoded.id, schedule: formattedSchedule }
        ).then((res) => {
            window.location.reload()
            toast.success(res.data.msg)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(markedDates)
    console.log(selectedDates)

    const navigate = useNavigate()

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        navigate("/login")
    }


    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const headerRef = useRef(null)

    useGSAP(() => {

        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
        )

        gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )
    }, [])

    return (
        <>
            <DoctorNavbar />
            <div style={{ minHeight: '550px' }}>
                <Container className="my-5">
                    <Row className="justify-content-center text-center">
                        <Col xs={12}>
                            <h1
                                ref={headerRef}
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: '700',
                                    color: '#34495E',
                                    marginBottom: '1rem',
                                }}
                            >
                                <FaAddressCard size={32} style={{ marginBottom: '7px', marginRight: '10px', color: '#2980B9' }} />
                                Profile
                            </h1>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="d-flex justify-content-center mb-4"
                            ref={imageRef}
                        >
                            <Image
                                src={`${import.meta.env.VITE_HOST_URL}/uploads/${DocData.profileImage}`}
                                roundedCircle
                                height={280}
                                width={280}
                                style={{ objectFit: 'fill', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                                alt="Doctor Profile"
                            />
                        </Col>

                        <Col xs={12} md={6} lg={5} ref={cardRef}>
                            <Card
                                className="shadow-lg"
                                style={{ borderRadius: '15px', minHeight: '280px', backgroundColor: '#f8f9fa' }}
                            >
                                <Card.Body className="d-flex flex-column justify-content-center h-100 px-4">
                                    <Card.Title
                                        className="mb-3"
                                        style={{ fontSize: '1.8rem', fontWeight: '600', color: '#2c3e50' }}
                                    >
                                        Dr. {DocData.docname}
                                    </Card.Title>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Email:</strong> {DocData.email || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Medical License:</strong> {DocData.license || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Educational Qualification:</strong> {DocData.qualification || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-2" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Specialization:</strong> {DocData.specialization || 'N/A'}
                                    </Card.Text>

                                    <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                        <strong>Address:</strong> {DocData.address || 'N/A'}
                                    </Card.Text>

                                    <Button variant="success" size="md" style={{ fontWeight: '600' }} onClick={handleOpen}>
                                        Your Schedule
                                    </Button>
                                    {showModal && (
                                        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ minHeight: '700px' }}>
                                            <div className="modal-dialog modal-dialog-top" role="document">
                                                <div className="modal-content">

                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Set your schedule</h5>
                                                        <button type="button" className="btn-close" onClick={handlecloseModal}></button>
                                                    </div>
                                                    {/* Display selected dates */}
                                                    <div style={{ marginTop: "10px", marginLeft: '20px', marginRight: '20px' }}>
                                                        <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                                                            <strong>You will not recieve appointments on selected days.</strong>
                                                            {/* <ul>
                                                                {selectedDates.map((date, index) => (
                                                                    <li key={index}>{date}</li>
                                                                ))}
                                                            </ul> */}
                                                        </Card.Text>
                                                    </div>

                                                    <div className="modal-body d-flex justify-content-center">
                                                        <DatePicker style={{minWidth:'400px'}}
                                                            multiple
                                                            value={selectedDates}
                                                            onChange={handleDateChange}
                                                            format="YYYY-MM-DD"
                                                            minDate={new Date()}
                                                            highlightToday
                                                            onlyCalendar
                                                            inline
                                                            sort
                                                            mapDays={({ date }) => {
                                                                const dateStr = date.format("YYYY-MM-DD")
                                                                const isUnavailable = markedDates.includes(dateStr)
                                                                return {
                                                                    style: isUnavailable
                                                                        ? { backgroundColor: "#3498db", color: "white", borderRadius: "50%" }
                                                                        : {}
                                                                };
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button className="btn btn-secondary" onClick={handlecloseModal}>
                                                            Cancel
                                                        </button>
                                                        <button className="btn btn-success" onClick={handleAvailability} onMouseEnter={() => setOpen(!open)} onMouseLeave={() => setOpen(!open)}>
                                                            Set Dates
                                                        </button>
                                                        
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex gap-3 justify-content-center mt-3">
                                        <Button variant="outline-warning" size="md" style={{ fontWeight: '600' }} onClick={handleShow}>
                                            📝 Edit Profile
                                        </Button>
                                        <Button variant="outline-danger" size="md" style={{ fontWeight: '600' }} onClick={handleLogout}>
                                            📤 Logout
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>✏️ Edit your profile</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background:'rgba(143, 211, 229, 0.33)'}}>
                    <Form>
                        <FloatingLabel controlId="floatingDocName" label="Doctor Name" className="mb-3">
                            <Form.Control type="text" name="docname" value={ProfileEdit.docname} onChange={handleChange} placeholder="Enter name" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingLicense" label="Medical License Number" className="mb-3">
                            <Form.Control type="text" name="license" value={ProfileEdit.license} onChange={handleChange} placeholder="Enter Medical License Number" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingQualification" label="Educational Qualification" className="mb-3">
                            <Form.Control type="text" name="qualification" value={ProfileEdit.qualification} onChange={handleChange} placeholder="Enter Educational Qualification" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingSpecialization" label="Specialization" className="mb-3">
                            <Form.Select name="specialization" value={ProfileEdit.specialization} onChange={handleChange} required>
                                <option value="">-- Select Specialization --</option>

                                <optgroup label=" Non-Surgical (MD/DNB)">
                                    <option value="General Medicine">General Medicine</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Psychiatry">Psychiatry</option>
                                    <option value="Radiology">Radiology</option>
                                    <option value="Pathology">Pathology</option>
                                    <option value="Anesthesiology">Anesthesiology</option>
                                    <option value="Pulmonology">Pulmonology</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Endocrinology">Endocrinology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="Nephrology">Nephrology</option>
                                    <option value="Hematology">Hematology</option>
                                </optgroup>
                                <optgroup label=" Surgical (MS/MCh)">
                                    <option value="General Surgery">General Surgery</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="ENT">ENT (Otorhinolaryngology)</option>
                                    <option value="Ophthalmology">Ophthalmology</option>
                                    <option value="Obstetrics & Gynecology">Obstetrics & Gynecology (OBG)</option>
                                    <option value="Urology">Urology</option>
                                    <option value="Neurosurgery">Neurosurgery</option>
                                    <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                                    <option value="Plastic Surgery">Plastic Surgery</option>
                                </optgroup>
                                <optgroup label=" Alternative & Traditional Medicine">
                                    <option value="Ayurveda">Ayurveda</option>
                                    <option value="Homeopathy">Homeopathy</option>
                                    <option value="Unani">Unani</option>
                                    <option value="Naturopathy">Naturopathy</option>
                                </optgroup> </Form.Select> </FloatingLabel>

                        <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                            <Form.Control as="textarea" name="address" value={ProfileEdit.address} onChange={handleChange} style={{ height: '100px' }} placeholder="Enter address" />
                        </FloatingLabel>

                        <Form.Group className="mb-3">
                            <Form.Label>Current Profile Image:</Form.Label>
                            <div style={{ marginTop: '5px', marginLeft: '100px' }}>
                                <img
                                    src={`http://localhost:9000/uploads/${DocData.profileImage}`}
                                    alt="Current Profile"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                            <Form.Label className="mt-3">Upload a new image:</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </>
    )
}
