import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import DoctorNavbar from './doctornavbar'
import { FaFirstAid } from 'react-icons/fa'
import Footer from '../footer'


export default function AppointmentHistory() {
  
  const decodedtoken = useMemo(() => {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  }, [])

  const [Appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAppointments, setFilteredAppointments] = useState([])


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/doctor/fetchappointments`, {
      headers: { id: decodedtoken.id },
    })
      .then((res) => {
        const pendingAppointments = res.data.data.filter(
          (a) => a.appointmentStatus === 'Complete'
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
          <FaFirstAid style={{
            marginRight: '10px',
            color: 'rgb(17, 129, 2)',
            filter: 'drop-shadow(10px 2px 2px rgba(0,0,0,0.3))'
          }} />
          Your Appointment History
        </h2>

        {/* Search Input */}
        <div className="mb-4 d-flex justify-content-center ">
          <input
            type="text"
            className="form-control w-50 border-secondary"
            style={{ background: 'rgb(215, 250, 252)', borderRadius: '20px' }}
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
                      <h5 className="card-title text-success m-0">
                        Appointment from {appointment.userId?.username || 'N/A'}
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
