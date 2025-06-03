import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AXIOS from 'axios'


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
            navigate("/adminviewusers")
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
            <form onSubmit={handleSubmit}>
                <label > Email:</label>
                <input type="email" name='email' value={UserData.email} onChange={handleChange} />
                <br />
                <label > Password:</label>
                <input type="password" name='password' value={UserData.password} onChange={handleChange} />
                <br />
                <button type='submit'>SignIn</button>
                <br />
                Don't have an account?<a href="/registration">SignUp here</a>
            </form>
        </>
    )
}
