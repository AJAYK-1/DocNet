import React, { useState, useEffect } from 'react';
import UserNavbar from './usernavbar';
import Footer from '../../components/layouts/footer';
import { Form, Card, Button } from 'react-bootstrap';
import { BsGeoAltFill, BsPersonWorkspace } from "react-icons/bs";
import { FaHeartbeat, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './userStyling.css';
import axios from 'axios';
import PatientForm from './components/patientForm';

export default function SeeAllDoctors() {

  const token = localStorage.getItem('token');

  const [DocProfiles, setDocProfiles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const getDoctors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewdoctors`,
        { headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 200) {
        setDocProfiles(response.data.data)
      } else {
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong...")
    }
  }

  useEffect(() => {
    getDoctors()
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedDoctor(null);
  };

  const chooseDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    handleShow();
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
              doctor.name.toLowerCase().includes(query) ||
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
                  <Card.Title>Dr. {doctor.name}</Card.Title>
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
                  <Button variant="info" className="w-100 mt-2" onClick={() => chooseDoctor(doctor)}>
                    Book an Appointment
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <PatientForm show={show} handleClose={handleClose} token={token} selectedDoctor={selectedDoctor} />
      )}

      <Footer />
    </>
  );
}
