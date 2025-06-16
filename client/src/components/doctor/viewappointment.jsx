import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import DoctorNavbar from './doctornavbar'
import { FaHeartbeat } from 'react-icons/fa'
import Footer from '../footer'

export default function DoctorViewAppointment() {
  const doctorstoken = localStorage.getItem('token')
  const decodedtoken = jwtDecode(doctorstoken)

  const [Appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAppointments, setFilteredAppointments] = useState([])

  const navigate = useNavigate()

 useEffect(() => {
  axios
    .get('http://localhost:9000/api/doctor/fetchappointments', {
      headers: { id: decodedtoken.id },
    })
    .then((res) => {
      const pendingAppointments = res.data.filter(
        (a) => a.appointmentStatus === 'Pending'
      );
      const sorted = pendingAppointments.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );
      setAppointments(sorted);
      setFilteredAppointments(sorted);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


  useEffect(() => {
    const lower = searchTerm.toLowerCase()
    const filtered = Appointments.filter((a) =>
      (a.userId?.username || '').toLowerCase().includes(lower) ||
      (a.patientName || '').toLowerCase().includes(lower) ||
      (a.appointmentDate || '').toLowerCase().includes(lower)
    )
    setFilteredAppointments(filtered)
  }, [searchTerm, Appointments])

  const handleButton = (id) => {
    navigate(`/addprescription/${id}`)
  }

  return (
    <>
      <DoctorNavbar />
      <div className="container mt-5" style={{ minHeight: '550px', padding: '40px' }}>
        <h2
          className="mb-4 text-center d-flex justify-content-center align-items-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2.2rem',
            color: '#34495E',
            borderBottom: '2px solid #BDC3C7',
            display: 'inline-flex',
            paddingBottom: '0.2rem',
            textShadow: '10px 5px 1px rgba(0,0,0,0.1)'
          }}
        >
          <FaHeartbeat style={{
            marginRight: '10px',
            color: '#E74C3C',
            filter: 'drop-shadow(10px 2px 2px rgba(0,0,0,0.3))'
          }} />
          Your Appointments
        </h2>

        {/* Search Input */}
        <div className="mb-4 d-flex justify-content-center ">
          <input
            type="text"
            className="form-control w-50 "
            style={{background: 'rgb(215, 250, 252)', borderRadius: '20px'}}
            placeholder="Search by username, patient name, or date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <p className="text-center mt-5 fs-5 text-muted">No appointments found.</p>
        ) : (
          <div className="row g-4">
            {filteredAppointments.map((appointment) => (
              <div className="col-md-6 col-lg-5" key={appointment._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title text-danger m-0">
                        An appointment from {appointment.userId?.username || 'N/A'}
                      </h5>
                      <h6 className="text-primary m-0" style={{ whiteSpace: 'nowrap' }}>
                        {appointment.appointmentDate}
                      </h6>
                    </div>

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
                      💊 Prescribe Medicines
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
