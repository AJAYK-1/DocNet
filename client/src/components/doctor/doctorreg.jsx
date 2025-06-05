import React from 'react'
import { useState } from 'react'
import AXIOS from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


export default function DoctorRegistration() {

    const [DoctorData, setDoctorData] = useState({
        docname: '',
        email: '',
        password: '',
        address: ''
    })
    const [doctorImage, setDoctorImage] = useState(null)

    const handleChange = async (e) => {
        setDoctorData({ ...DoctorData, [e.target.name]: e.target.value })
    }

    const handleImage = async (e) => {
        setDoctorImage(e.target.files[0])
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('docname', DoctorData.docname)
        formData.append('email', DoctorData.email)
        formData.append('password', DoctorData.password)
        formData.append('address', DoctorData.address)
        formData.append('profileImage', doctorImage)

        AXIOS.post("http://localhost:9000/api/doctor/doctorregistration", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                console.log(res.data)
                setDoctorData({ docname: "", email: "", password: "", address: "" })
                setDoctorImage(null)
                navigate("/login")
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <>

            <h2>Doctor Registration</h2>

            <Form noValidate onSubmit={handleSubmit}>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Name:"
                    className="mb-3"
                >
                    <Form.Control type="text" name='docname' onChange={handleChange} placeholder="Enter your name..." />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingEmail"
                    label="Email address:"
                    className="mb-3"
                >
                    <Form.Control type="email" name='email' onChange={handleChange} placeholder="Enter your email..." />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password:"
                >
                    <Form.Control type="password" name='password' onChange={handleChange} placeholder="Password" />
                </FloatingLabel><br />

                <FloatingLabel controlId="floatingTextarea2" label="Address:">
                    <Form.Control
                        type='text'
                        as="textarea"
                        name='address'
                        onChange={handleChange}
                        placeholder="Enter your address here..."
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <br />
                <Form.Control
                    type="file"
                    required
                    name="profileImage"
                    onChange={handleImage}
                />
                <br />
                <Button type="submit">SignUp</Button>
                <br />
                Already have an account? <a href="/login">SignIn here</a>
            </Form>
        </>
    )
}
