import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AXIOS from 'axios'
import { Button, Form, FloatingLabel, Container, Card, Tabs, Tab } from 'react-bootstrap';
import HomeNavbar from '../../components/layouts/homenavbar'
import Footer from '../../components/layouts/footer'
import { toast } from 'react-toastify';

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

    AXIOS.post(`${import.meta.env.VITE_HOST_URL}/api/user/login`, UserData)
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

  const [VerifyOTP, setVerifyOTP] = useState(1)

  const [userData2, setUserData2] = useState({
    email: '',
    otp: '',
    reqtype: 'Login'
  })

  const handleChange2 = (e) => {
    setUserData2({ ...userData2, [e.target.name]: e.target.value })
  }

  const handleOTP = async (e) => {
    e.preventDefault()
    setVerifyOTP(2)
    AXIOS.put(`${import.meta.env.VITE_HOST_URL}/api/user/send-otp`, userData2)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)
        } else if (res.data.status == 400) {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("Error sending OTP...")
      })
  }

  const handleOTPLogin = async (e) => {
    e.preventDefault()
    AXIOS.post(`${import.meta.env.VITE_HOST_URL}/api/user/loginwithOTP`, userData2)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => navigate('/userhome'), 2000);
        } else if (res.data.status == 201) {
          toast.success(res.data.msg)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => navigate('/doctorhome'), 2000);
        } else {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("Login Error...")
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
              
            <Tabs defaultActiveKey="passlogin" id="registration-tabs" className="mb-4 tabs-nav" justify>
              <Tab eventKey="passlogin" title="using Password">
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

                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-5">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>

                  <Button variant="primary" type="submit" className="w-100">Sign In</Button>
                  <p className="click-here mt-2 text-end"><a href="/forgotpassword">forgot password?</a> </p>
                  <p className="click-here mt-3 text-center"> Don’t have an account? <a href="/registration">Sign Up here</a></p>
                </Form>
              </Tab>

              <Tab eventKey="otplogin" title="using OTP">
                <Form noValidate onSubmit={handleOTPLogin}>
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange2}
                      required
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Enter OTP" className="mb-4">
                    <Form.Control
                      type="number"
                      name="otp"
                      placeholder="Enter OTP"
                      onChange={handleChange2}
                      required
                    />
                  </FloatingLabel>

                  {VerifyOTP == 1 ? (
                    <Button variant="primary" type="button" className="w-100" onClick={handleOTP}>Send OTP</Button>
                  ) : (
                    <Button variant="primary" type="submit" className="w-100">Sign In</Button>
                  )}

                  <p className="click-here mt-3 text-center"> Don’t have an account? <a href="/registration">Sign Up here</a></p>

                </Form>
              </Tab>
            </Tabs>
          </Card>
        </Container>
      </div>

      <Footer />

    </>
  )
}
