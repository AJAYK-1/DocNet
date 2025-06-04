import React from 'react'
import { useState } from 'react'
import AXIOS from 'axios'


export default function DoctorRegistration() {

    const [DoctorData, setDoctorData] = useState({
        docname: '',
        email: '',
        password: ''
    })
    const [doctorImage, setDoctorImage] = useState(null)

    const handleChange = async (e) => {
        setDoctorData({ ...DoctorData, [e.target.name]: e.target.value })
    }

    const handleImage = async (e) => {
        setDoctorImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('docname', DoctorData.docname)
        formData.append('email', DoctorData.email)
        formData.append('password', DoctorData.password)
        formData.append('profileImage', doctorImage)

        AXIOS.post("http://localhost:9000/api/doctor/doctorregistration", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                console.log(res.data)
                setDoctorData({ docname: "", email: "", password: "" })
                setDoctorImage(null)
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
                <label >Upload Profile Picture:</label>
                <input type='file' name='profileImage' onChange={handleImage} />
                <br />
                <button type='submit'>Submit</button>
                <br />
                Already have an account? <a href="/login">SignIn here</a>
            </form>
        </>
    )
}
