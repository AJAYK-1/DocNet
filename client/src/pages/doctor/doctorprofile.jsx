import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/footer'
import { Container, Row, Col, Image, Card, Button, Form, FloatingLabel } from 'react-bootstrap'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useGSAP } from '@gsap/react'
import DatePicker, { DateObject } from "react-multi-date-picker"
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'
import { SPECIALIZATIONS } from '../../components/constants/specializations'

export default function DoctorProfile() {

    const token = localStorage.getItem('token');

    const [DocData, setDocData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ProfileEdit, setProfileEdit] = useState({
        name: '',
        address: '',
        license: '',
        qualification: '',
        specialization: ''
    });
    const [doctorImage, setDoctorImage] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/doctor/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                console.log(res.data.data);

                setDocData(res.data.data)
                // const unavailableDates = res.data.data.schedule
                //     .filter(entry => entry.availability === "Unavailable")
                //     .map(item => item.dates);

                // setMarkedDates(unavailableDates); // Used to highlight red dates
                // setSelectedDates(unavailableDates.map(d => new DateObject(d))); // Initialize selection in calendar

                setProfileEdit({
                    name: res.data.data.docname,
                    address: res.data.data.address,
                    license: res.data.data.license,
                    qualification: res.data.data.qualification,
                    specialization: res.data.data.specialization
                })
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...')
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        setProfileEdit({ ...ProfileEdit, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setDoctorImage(e.target.files[0])
    }

    const handleSaveChanges = async (e) => {
        e.preventDefault()
        try {
            const newData = new FormData()
            newData.append('docname', ProfileEdit.name)
            newData.append('license', ProfileEdit.license)
            newData.append('qualification', ProfileEdit.qualification)
            newData.append('specialization', ProfileEdit.specialization)
            newData.append('address', ProfileEdit.address)
            newData.append('profileImage', doctorImage)

            handleClose()
            const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/edit-profile`, newData,
                { headers: { Authorization: `Bearer ${token}` } })

            if (res.status == 200) {
                toast.success(res.data.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong...')
        }
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
        axios.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/changeavailability`, { id: decoded.id, schedule: formattedSchedule }
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
    }, [DocData.profileImage])

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '550px' }}>
                <Container className="my-5">
                    <Row className="justify-content-center text-center">
                        <Col xs={12}>
                            <h1
                                className='flex justify-center'
                                ref={headerRef}
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: '700',
                                    color: '#34495E',
                                    marginBottom: '1rem',
                                }}
                            >
                                <FaAddressCard size={32} style={{ marginBottom: '5px', marginRight: '10px', color: '#2980B9' }} />
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
                                        Dr. {DocData.name}
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
                                                        <DatePicker style={{ minWidth: '400px' }}
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
                <Modal.Body style={{ background: 'rgba(143, 211, 229, 0.33)' }}>
                    <Form>
                        <FloatingLabel controlId="floatingDocName" label="Doctor Name" className="mb-3">
                            <Form.Control type="text" name="name" value={ProfileEdit.name} onChange={handleChange} placeholder="Enter name" />
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
                                {SPECIALIZATIONS.map((spec) =>
                                    <option value={spec} key={spec}> {spec} </option>
                                )}
                            </Form.Select> </FloatingLabel>

                        <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                            <Form.Control as="textarea" name="address" value={ProfileEdit.address} onChange={handleChange} style={{ height: '100px' }} placeholder="Enter address" />
                        </FloatingLabel>

                        <Form.Group className="mb-3">
                            <Form.Label>Current Profile Image:</Form.Label>
                            <div style={{ marginTop: '5px', marginLeft: '100px' }}>
                                <img
                                    src={`${import.meta.env.VITE_HOST_URL}/uploads/${DocData.profileImage}`}
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
