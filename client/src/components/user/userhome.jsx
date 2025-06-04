import React from 'react'
import { useState } from 'react'
import AXIOS from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function UserHome() {

    const [DocProfiles, setDocProfiles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/user/viewdoctors")
            .then((res) => {
                console.log(res.data)
                setDocProfiles(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleSubmit = async (id) => {
        // id.preventDefault()
        console.log(id)
        navigate(`/appointment/${id}`)
    }

    return (
        <>
            <h1>Welcome User</h1>
            <a href="/userprofile">Your Profile</a>
            <br />
            <a href="/getprescription">Your Prescription</a>
            <div>
                {DocProfiles.map((doctors) => {
                    return (
                        <>
                            <h3>{doctors.docname}</h3>
                            <button onClick={() => handleSubmit(doctors._id)}>Book an Appointment</button>
                        </>
                    )
                })}

            </div>
        </>
    )
}
