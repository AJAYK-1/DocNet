import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


export default function Appointment() {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const [DocData, setDocData] = useState([])
  const [PatientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientSymptoms: ''
  })


  const params = useParams()
  console.log(params.id)

  useEffect(() => {
    axios.get(`http://localhost:9000/api/user/viewdoctorprofile/${params.id}`)
      .then((res) => {
        setDocData(res.data)
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })

    axios.get(`http://localhost:9000/api/user/viewloggeduser`, { headers: { id: decoded.id } })
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])


  const handleChange = async (e) => {
    setPatientDetails({ ...PatientDetails, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(PatientDetails)
    axios.post('http://localhost:9000/api/user/bookappointment', {
      userId: decoded.id,
      doctorId: params.id,
      patientName: PatientDetails.patientName,
      patientAge: PatientDetails.patientAge,
      patientGender: PatientDetails.patientGender,
      patientSymptoms: PatientDetails.patientSymptoms
    })
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }


  return (
    <>
      <h2>Book an Appointment</h2>
      <h3>Docname: {DocData.docname}</h3>
      <form onSubmit={handleSubmit}>
        <label >Patient Name:</label>
        <input type="text" name='patientName' value={PatientDetails.patientName} onChange={handleChange} />
        <br />
        <label >Patient Age:</label>
        <input type="number" name='patientAge' value={PatientDetails.patientAge} onChange={handleChange} />
        <br />
        <label >Patient Gender:</label>
        <input type="radio" name='patientGender' value="Male" onChange={handleChange} />Male
        <input type="radio" name='patientGender' value="Female" onChange={handleChange} />Female
        <br />
        <label >What are the symptoms?</label>
        <textarea name="patientSymptoms" value={PatientDetails.patientSymptoms} onChange={handleChange}></textarea>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
