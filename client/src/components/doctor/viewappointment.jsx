import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorNavbar from './doctornavbar'
import { FaHeartbeat } from 'react-icons/fa'
import Footer from '../footer'


export default function DoctorViewAppointment() {
  
  const doctorstoken = localStorage.getItem('token')
  const decodedtoken = jwtDecode(doctorstoken)

  const [Appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/doctor/fetchappointments', {
        headers: { id: decodedtoken.id },
      })
      .then((res) => {
        setAppointments(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleButton = (id) => {
    navigate(`/addprescription/${id}`)
  }

  return (
    <>
      <DoctorNavbar />
      <div className="container mt-5" style={{minHeight:'500px'}}>
        <h2
          className="mb-4 text-center d-flex justify-content-center align-items-center"
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

        {Appointments.length === 0 ? (
          <p className="text-center mt-5 fs-5 text-muted">No appointments found.</p>
        ) : (
          <div className="row g-4">
            {Appointments.map((appointment) => (
              <div className="col-md-6 col-lg-4" key={appointment._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-danger">
                      An appointment from  {appointment.userId?.username || 'N/A'}
                    </h5>
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
      <Footer/>
    </>
  )
}
