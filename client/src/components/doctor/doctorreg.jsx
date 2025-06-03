import React from 'react'
import { useState } from 'react'
import AXIOS from 'axios'


export default function DoctorRegistration() {

    const [DoctorData, setDoctorData] = useState({
        docname: '',
        email: '',
        password: ''
    })

    const handleChange = async (e) => {
        setDoctorData({ ...DoctorData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        AXIOS.post("http://localhost:9000/api/doctor/doctorregistration", DoctorData)
            .then((res) => {
                console.log(res.data)
                setDoctorData({ docname: "", email: "", password: "" })
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <h2>Doctor Registration</h2>
            <form onSubmit={handleSubmit}>
                <label > Name:</label>
                <input type="text" name='docname' value={DoctorData.docname} onChange={handleChange} />
                <br />
                <label > Email:</label>
                <input type="email" name='email' value={DoctorData.email} onChange={handleChange} />
                <br />
                <label > Password:</label>
                <input type="password" name='password' value={DoctorData.password} onChange={handleChange} />
                <br />
                <button type='submit'>Submit</button>
                <br />
                Already have an account? <a href="/login">SignIn here</a>
            </form>
        </>
    )
}
