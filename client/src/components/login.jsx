import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AXIOS from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function Login() {

    const [UserData, setUserData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = async (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (UserData.email == "admin@gmail.com" && UserData.password == "admin") {
            alert("Logged in as ADMIN...")
            navigate("/adminhome")
        } else {
            AXIOS.post('http://localhost:9000/api/user/login', UserData)
                .then((res) => {
                    console.log(res.data.token)
                    alert(res.data.msg)
                    if (res.data.status == 200) {
                        localStorage.setItem("token", res.data.token)
                        navigate("/userhome")
                    } else if (res.data.status == 201) {
                        localStorage.setItem("token", res.data.token)
                        navigate("/doctorhome")
                    }
                }).catch((error) => {
                    console.log(error)
                    alert("Login failed...")
                })
        }
    }


    return (
        <>
            <h2>Login</h2>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Button type="submit">SignIn</Button>
                <br />
                Don't have an account? <a href="/registration">SignUp here</a>
            </Form>
        </>
    )
}
