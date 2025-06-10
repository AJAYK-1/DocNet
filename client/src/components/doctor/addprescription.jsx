import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import DoctorNavbar from './doctornavbar'
import { FaPills } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { MdLocalPharmacy } from 'react-icons/md';
import Footer from '../footer';


export default function AddPrescription() {

    const [rows, setRows] = useState([{
        medicine: "",
        quantity: "",
        dosage: ""
    }])

    const params = useParams()
    const navigate = useNavigate()

    const addRow = () => {
        setRows(prev => [
            ...prev, { medicine: "", quantity: "", dosage: "" }
        ])
    }

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const onSubmission = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:9000/api/doctor/yourprescription", rows, {
                headers: { id: params.id }
            });
            console.log(res.data)
            navigate("/viewprescription")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <DoctorNavbar />
            <div className="container mt-5">
                <h2
                    className="text-center mb-4 fw-bold text-dark border-bottom pb-2"
                    style={{
                        fontFamily: "'Shadows Into Light', cursive",
                        fontSize: '2rem',
                        letterSpacing: '1px',
                        textShadow: '10px 5px 1px rgba(0,0,0,0.1)'
                    }}
                >
                    <MdLocalPharmacy style={{
                        marginRight: '10px', color: '#E74C3C',
                        filter: 'drop-shadow(10px 2px 2px rgba(0,0,0,0.3))'
                    }} />
                    Add Prescription
                </h2>

                <form onSubmit={onSubmission}>
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Medicine</th>
                                    <th>Quantity</th>
                                    <th>Dosage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="medicine"
                                                value={row.medicine}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="quantity"
                                                value={row.quantity}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="dosage"
                                                value={row.dosage}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="button" className="btn btn-outline-info" onClick={addRow}>➕ Add More Medicines</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success px-5">Submit</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    )
}
