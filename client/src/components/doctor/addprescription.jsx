import React, { useState } from 'react'

export default function AddPrescription() {

    const [rows, setrows] = useState([{
        medicine: "",
        quantity: "",
        dosage: ""
    }])

    const addRow = () => {
        setrows((prev) => [
            ...prev, { medicine: "", quantity: "", dosage: "" }
        ])
    }

    const handleChange = (e) => {
        setrows({ ...rows, [e.target.name]: e.target.value })
    }


    return (
        <>
            <h2>Add Prescription</h2>

            <table>
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Dosage</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx}>
                            <td>
                                <input type="text" value={row.medicine} onChange={handleChange} />
                            </td>
                            <td>
                                <input type="number" value={row.quantity} onChange={handleChange} />
                            </td>
                            <td>
                                <input type="text" value={row.dosage} onChange={handleChange} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button type="button" onClick={addRow}>+</button>
            <br />
            <br />
            <button>Submit</button>
        </>
    )
}
