import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AXIOS from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import HomeNavbar from './homenavbar'
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    if (UserData.email === 'admin@gmail.com' && UserData.password === 'admin') {
      alert('Logged in as ADMIN...')
      // localStorage.setItem('token', token)
      navigate('/adminhome')
    } else {
      AXIOS.post('http://localhost:9000/api/user/login', UserData)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success(res.data.msg)
            localStorage.setItem('token', res.data.token)
            navigate('/userhome')
          } else if (res.data.status === 201) {
            toast.success(res.data.msg)
            localStorage.setItem('token', res.data.token)
            navigate('/doctorhome')
          } else {
            toast.error(res.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Login failed...')
        })
    }
  }

  return (
    <>
      <HomeNavbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '450px', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2 className="text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#2c3e50' }}>Login</h2>
          <Form noValidate onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </FloatingLabel>

            <Button variant="primary" type="submit" className="w-100">Sign In</Button>
            <div className="text-center mt-3">
              Don’t have an account? <a href="/registration">Sign Up here</a>
            </div>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  )
}
