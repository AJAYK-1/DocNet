import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'


export default function AdminViewDoctors() {

    const [doctors, setDoctors] = useState([])
    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/admin/adminviewdoctors")
            .then((res) => {
                console.log(res.data)
                setDoctors(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <h1>Doctors</h1>
            <table>
                <thead>
                    <tr>
                        <th>Doctor Name:</th>
                        <th>Profile Photo:</th>
                        <th>Email:</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => {
                        return (
                            <tr key={doctor._id}>
                                <td>{doctor.docname}</td>
                                <td><img src={`http://localhost:9000/uploads/${doctor.profileImage}`} alt="Image Not Found" height={200} width={150} /></td>
                                <td>{doctor.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
