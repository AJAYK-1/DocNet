import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import UserNavbar from './usernavbar'
import Footer from '../footer'
import { FaHeartbeat } from 'react-icons/fa'


export default function Appointment() {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const [Appointments, setAppointments] = useState([])

  // const params = useParams()
  // console.log(params.id)

  useEffect(() => {
    // axios.get(`http://localhost:9000/api/user/viewdoctorprofile/${params.id}`)
    //   .then((res) => {
    //     setDocData(res.data)
    //     console.log(res.data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })

    axios.get(`http://localhost:9000/api/user/viewloggeduser`, { headers: { id: decoded.id } })
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })

    axios.get(`http://localhost:9000/api/user/fetchmyappointments`, { headers: { id: decoded.id } })
      .then((res) => {
        setAppointments(res.data)
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <>
      <UserNavbar />
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
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>
  )
}
