import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {useNavigate} from 'react-router-dom'


export default function DoctorViewAppointment() {

    const doctorstoken = localStorage.getItem('token')
    const decodedtoken = jwtDecode(doctorstoken)

    const [Appointments, setAppointments] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9000/api/doctor/fetchappointments", { headers: { id: decodedtoken.id } })
            .then((res) => {
                setAppointments(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const navigate = useNavigate()

    const handleButton = async(e) => {
        e.preventDefault()
        navigate("/addprescription")
    }

    return (
        <>
            <h2>Your Appointments</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Username:</th>
                        <th>Patient Name:</th>
                        <th>Patient Age:</th>
                        <th>Patient Gender:</th>
                        <th>Patient's Symptoms:</th>
                        <th><button onClick={handleButton}>Add Prescription</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Appointments.map((appointment) => {
                            return (
                                <tr key={appointment._id}>

                                    <td>{appointment.userId.username}</td>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.patientAge}</td>
                                    <td>{appointment.patientGender}</td>
                                    <td>{appointment.patientSymptoms}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
