import React, { useState, useEffect } from 'react'
import AXIOS from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function UserProfile() {

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const [UserData, setUserData] = useState({
        username: '',
        email: ''
    })

    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/user/viewloggeduser", { headers: { id: decoded.id } })
            .then((res) => {
                setUserData(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <h1>Welcome User</h1>
            <div>
                <h3>Name: {UserData.username}</h3>
                <h3>Email: {UserData.email}</h3>
            </div>
        </>
    )
}
