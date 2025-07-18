import React, { useState, useEffect, useMemo } from 'react';
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
import axios from 'axios';


export default function SeeAllDoctors() {

  const decoded = useMemo(() => {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  }, [])

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

  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewdoctors`)
      .then(res => setDocProfiles(res.data.data))
      .catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewloggeduser`, { headers: { id: decoded.id } })
      .then(res => setUserData(res.data.data))
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
    axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/bookappointment`, {
      userId: decoded.id,
      doctorId: docId,
      ...PatientDetails,
      appointmentDate: selectedDates.format('YYYY-MM-DD')
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

  const handlePayment = async (docId) => {

    axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/payment`,
      {
        amount: 1000,
        currency: "INR",
        receipt: "qazwsx1"
      },
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        const order = res.data
        const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID
        const options = {
          "key": keyId, // Enter the Key ID generated from the Dashboard
          amount: 1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          "name": "DocNet", //your business name
          "description": "Dummy Transaction",
          "image": "https://www.freeiconspng.com/thumbs/doctor-logo/doctor-logo-png-photo-5.png",
          "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": async function (response) {
            axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/validate-payment`,
              response, { headers: { "Content-Type": "application/json" } }
            )
              .then((res) => {
                if (res.data.status == 200) {
                  toast.success(res.data.msg)
                  handleAppointment(docId)
                } else {
                  toast.error(res.data.msg)
                }

              }).catch((err) => {
                console.log(err)
                toast.error("Payment Error...")
              })

          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "", //your customer's name
            "email": "",
            "contact": ""  //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open()
      })
      .catch((err) => {
        console.log(err)
      })
  }



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
              <Card id='info-card' className="h-100 shadow-sm border-0 doctor-card">
                <Card.Img
                  variant="top"
                  src={`${import.meta.env.VITE_HOST_URL}/uploads/${doctor.profileImage}`}
                  className="doctor-img"
                  alt='Image not Found '
                />
                <Card.Body>
                  <Card.Title>Dr. {doctor.docname}</Card.Title>
                  <Card.Text className="mb-1 text-muted flex items-center">
                    <BsPersonWorkspace className="me-2 text-primary" />
                    {doctor.qualification}
                  </Card.Text>
                  <Card.Text className="mb-1 text-muted flex items-center">
                    <FaHeartbeat className="me-2 text-danger" />
                    {doctor.specialization}
                  </Card.Text>
                  <Card.Text className="text-muted flex items-center">
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
            handlePayment(selectedDoctor._id)
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
              /> <br />
              <Form.Text className='text-muted mt-1'>
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
