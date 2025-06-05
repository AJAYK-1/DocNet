import React from 'react'
import DoctorNavbar from './doctornavbar'


export default function Doctorhome() {
  return (
    <>
    <DoctorNavbar/>
      <div>Welcome Doctor</div>
      <a href="/viewappointment">View Appointment</a>
      <br />
      <a href="/viewprescription">View Prescription</a>
      <br />
      <a href="/doctorprofile">Profile</a>
    </>
  )
}
