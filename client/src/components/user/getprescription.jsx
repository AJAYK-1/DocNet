import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'


export default function GetMyPrescription() {

    const [prescriptions, setPrescriptions] = useState([])

    const fetchtoken = localStorage.getItem('token')
    const decodedtoken = jwtDecode(fetchtoken)

    useEffect(() => {
        axios.get("http://localhost:9000/api/user/fetchmyprescription", { headers: { id: decodedtoken.id } })
            .then((res) => {
                setPrescriptions(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <h1>Your Prescriptions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Doctor Name:</th>
                        <th>Patient Name:</th>
                        <th>Medicine:</th>
                        <th>Quantity:</th>
                        <th>Dosage:</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((presc) => {
                        return (
                            <tr key={presc._id}>
                                <td>{presc.docname}</td>
                                <td>{presc.patientName}</td>
                                <td>{presc.prescription.map((item) => {
                                    return (
                                        <>
                                            <tr key={item._id}>
                                                <td>{item.medicine}</td>
                                            </tr>
                                        </>
                                    )
                                })}</td>

                                <td>{presc.prescription.map((item) => {
                                    return (
                                        <>
                                            <tr key={item._id}>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        </>
                                    )
                                })}</td>

                                <td>{presc.prescription.map((item) => {
                                    return (
                                        <>
                                            <tr key={item._id}>
                                                <td>{item.dosage}</td>
                                            </tr>
                                        </>
                                    )
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
