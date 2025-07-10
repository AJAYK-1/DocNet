import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, FloatingLabel, Container, Card, Tabs, Tab } from 'react-bootstrap';
import HomeNavbar from './homenavbar'
import Footer from './footer'
import { toast } from 'react-toastify';
import './App.css'
import Lottie from 'lottie-react';
import ForgotPasswordAnimation from '../assets/ForgotPasswordAnimation.json'


export default function ForgotPassword() {

  const [NewPass, setNewPass] = useState({
    email: '',
    otp: '',
    newpassword: '',
    confirmpassword: '',
    reqtype: 'Resetpassword'
  })

  const [VerifyOTP, setVerifyOTP] = useState(1)

  const handleChange = (e) => {
    setNewPass({ ...NewPass, [e.target.name]: e.target.value })
  }

  const handleOTP = async (e) => {
    e.preventDefault()
    axios.put(`${import.meta.env.VITE_HOST_URL}/api/user/send-otp`, NewPass)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)
          setVerifyOTP(2)
        } else if (res.data.status == 400) {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("Error sending OTP...")
      })
  }

  const confirmOTP = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/confirm-otp`, NewPass)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)
          setVerifyOTP(3)
        } else {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("An Error Occured...")
      })
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`${import.meta.env.VITE_HOST_URL}/api/user/reset-password`, NewPass)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)
          setTimeout(() => {
            navigate('/login')
          }, 3000);
        } else {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
        toast.error("An Error Occured...")
      })
  }


  return (
    <>
      <HomeNavbar />
      <div className="resetpassword-background">
        <div className="login-overlay" />
        <Lottie animationData={ForgotPasswordAnimation} style={{ height: '500px', zIndex: '2', marginLeft: '200px' }} />
        <Container className="login-container">
          <Card className="login-card">
            <h2 className="text-center mb-4 login-heading fw-bold"
              style={{ fontFamily: "'Shadows Into Light', cursive", fontSize: '2rem', letterSpacing: '1px' }}>
              Reset Password</h2>

            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput" label="Enter Email address" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingOTP" label="Enter OTP" className="mb-4">
                <Form.Control
                  type="number"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              {VerifyOTP == 1 ? (
                <Button variant="primary" type="button" className="w-100" onClick={handleOTP}>Send OTP</Button>
              ) : (
                <>
                  {VerifyOTP == 2 ? (
                    <>

                      <Button variant="primary" type="button" className="w-100" onClick={confirmOTP}>Confirm OTP</Button>
                    </>
                  ) : (
                    <>
                      <FloatingLabel controlId="floatingNewPassword" label="Enter New Password" className="mb-3">
                        <Form.Control
                          type="password"
                          name="newpassword"
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        />
                      </FloatingLabel>

                      <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-5">
                        <Form.Control
                          type="password"
                          name="confirmpassword"
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        />
                      </FloatingLabel>

                      <Button variant="primary" type="submit" className="w-100">Reset Password</Button>
                    </>
                  )}

                </>

              )}

            </Form>

          </Card>
        </Container>
      </div>
      <Footer />
    </>
  )
}
