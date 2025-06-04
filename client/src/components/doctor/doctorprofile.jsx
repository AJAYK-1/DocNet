import React, { useState, useEffect } from 'react'
import AXIOS from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function DoctorProfile() {

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const [DocData, setDocData] = useState({
        docname: '',
        email: ''
    })

    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/doctor/viewloggeddoctor", { headers: { id: decoded.id } })
            .then((res) => {
                setDocData(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <h1>Welcome Doctor</h1>
            <div>
                <img src={`http://localhost:9000/uploads/${DocData.profileImage}`} alt="Doctor Image" height={200} width={200} />
                <h3>Name: {DocData.docname}</h3>
                <h3>Email: {DocData.email}</h3>
            </div>
        </>
    )
}
