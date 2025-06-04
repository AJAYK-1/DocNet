import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


export default function AddPrescription() {

    const [rows, setrows] = useState([{
        medicine: "",
        quantity: "",
        dosage: ""
    }])

    const params = useParams()
    // console.log(params.id)
const navigate = useNavigate()

    const addRow = () => {
        setrows((prev) => [
            ...prev, { medicine: "", quantity: "", dosage: "" }
        ])
    }

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setrows(updatedRows);
    };

    const onSubmission = async (e) => {
        e.preventDefault()
        console.log(rows)
        axios.post("http://localhost:9000/api/doctor/yourprescription", rows, { headers: { id: params.id } })
            .then((res) => {
                console.log(res.data)
                setrows(res.data)
                navigate("/viewprescription")
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <h2>Add Prescription</h2>
            <form onSubmit={onSubmission}>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Dosage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input type="text" value={row.medicine} name='medicine' onChange={(e) => handleChange(index, e)} />
                                    </td>
                                    <td>
                                        <input type="number" value={row.quantity} name='quantity' onChange={(e) => handleChange(index, e)} />
                                    </td>
                                    <td>
                                        <input type="text" value={row.dosage} name='dosage' onChange={(e) => handleChange(index, e)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <button type="button" onClick={addRow}>+</button>
                <br />
                <br />
                <button type='submit' >Submit</button>
            </form>
        </>
    )
}
