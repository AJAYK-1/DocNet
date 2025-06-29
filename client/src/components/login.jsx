import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AXIOS from 'axios'
import { Button, Form, FloatingLabel, Container, Card } from 'react-bootstrap';
import HomeNavbar from './homenavbar'
import Footer from './footer'
import { toast } from 'react-toastify';
import './App.css'


export default function Login() {
  const [UserData, setUserData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    AXIOS.post('http://localhost:9000/api/user/login', UserData)
      .then((res) => {
        if (res.data.status == 202) {
          toast.success(res.data.msg)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => navigate('/adminhome'), 2000)
        }
        else if (res.data.status == 200) {
          toast.success(res.data.msg)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => navigate('/userhome'), 2000)
        } else if (res.data.status == 201) {
          toast.success(res.data.msg)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => navigate('/doctorhome'), 2000)
        } else {
          toast.error(res.data.msg)
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error('Login failed...')
      })

  }

  return (
    <>
      <HomeNavbar />

      <div className="login-background">
        <div className="login-overlay" />
        <Container className="login-container">
          <Card className="login-card">
            <h2 className="text-center mb-4 login-heading fw-bold"
              style={{ fontFamily: "'Shadows Into Light', cursive", fontSize: '2rem', letterSpacing: '1px' }}>
              Login</h2>
            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <Button variant="primary" type="submit" className="w-100">Sign In</Button>

              <p className="click-here mt-3 text-center"> Don’t have an account? <a href="/registration">Sign Up here</a></p>

            </Form>
          </Card>
        </Container>
      </div>

      <Footer />

    </>
  )
}
