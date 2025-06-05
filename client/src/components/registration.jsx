import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Registration() {

  const [FormData, setformdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [error, seterror] = useState('')

  const handleChange = (e) => {
    setformdata({ ...FormData, [e.target.name]: e.target.value })
  }


  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    seterror('')
    AXIOS.post("http://localhost:9000/api/user/registeruser", FormData)
      .then((response) => {
        console.log(response.data)
        alert(response.data.msg)
        navigate("/login")
        setformdata({ username: "", email: "", password: "" })
      }).catch((error) => {
        console.log(error)
        alert("Registration Error....")
      })


  }


  return (
    <>
      <h2>User Registration</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name:</Form.Label>
          <Form.Control type="text" name='username' placeholder="Normal text" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
        </Form.Group>
        <Button type="submit">SignUp</Button>
        <br />
        Already registered?<a href="/login"> Signin here</a>
      </Form>
    </>
  )
}
