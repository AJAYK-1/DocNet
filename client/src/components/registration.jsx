import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom'

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
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input type="text" name='username' value={FormData.username} onChange={handleChange} />
        <br />
        <label>Email:</label>
        <input type="email" name='email' value={FormData.email} onChange={handleChange} />
        <br />
        <label>Password:</label>
        <input type="password" name='password' value={FormData.password} onChange={handleChange} />
        <br />
        <button type='submit' name='submit' value={FormData.submit}>Signup</button>
        <br />
        Already registered?<a href="/login"> Signin here</a>
      </form>
    </>
  )
}
