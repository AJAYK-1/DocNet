import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import DoctorNavbar from './doctornavbar'
import { MdLocalPharmacy } from 'react-icons/md'
import { Form, FloatingLabel } from 'react-bootstrap'
import Footer from '../footer'
import { toast } from 'react-toastify'

export default function AddPrescription() {
    const [rows, setRows] = useState([{ medicine: '', quantity: '', dosage: '' }])
    const [mention, setMention] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    const addRow = () => {
        setRows([...rows, { medicine: '', quantity: '', dosage: '' }])
    }

    const handleChange = (index, e) => {
        const { name, value } = e.target
        const updatedRows = [...rows]
        updatedRows[index][name] = value
        setRows(updatedRows)
    }

    const handleMentionChange = (e) => {
        setMention(e.target.value)
    }

    const onSubmission = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_HOST_URL}/api/doctor/yourprescription`,
                {
                    prescriptionsData: rows,
                    mention: mention
                },
                {
                    headers: { id: params.id }
                }
            ).then((res) => {
                if (res.data.status == 200) {
                    toast.success(res.data.msg)
                    setTimeout(() => navigate('/viewprescription'), 2000);
                }
            })
        } catch (err) {
            console.log(err)
            toast.error(err)
        }
    }

    const handleCancel = () => {
        navigate('/viewappointment')
    }

    return (
        <>
            <DoctorNavbar />
            <div className="container mt-5" style={{ minHeight: '600px', padding: '40px' }}>
                <h2
                    className="text-center mb-4 fw-bold text-dark border-bottom pb-2"
                    style={{
                        fontFamily: "'Shadows Into Light', cursive",
                        fontSize: '2rem',
                        letterSpacing: '1px',
                        textShadow: '10px 5px 1px rgba(0,0,0,0.1)'
                    }}
                >
                    <MdLocalPharmacy style={{ marginRight: '10px', color: '#E74C3C', filter: 'drop-shadow(10px 2px 2px rgba(0,0,0,0.3))' }} />
                    Add Prescription
                </h2>

                <form onSubmit={onSubmission}>
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle text-center" style={{ filter: 'drop-shadow(15px 2px 5px rgba(0,0,0,0.3))' }}>
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
                                        <td><input type="text" className="form-control" name="medicine" value={row.medicine} onChange={(e) => handleChange(index, e)} placeholder='Enter Medicine name...' required /></td>
                                        <td><input type="text" className="form-control" name="quantity" value={row.quantity} onChange={(e) => handleChange(index, e)} placeholder='Enter Quantity...' required /></td>
                                        <td><input type="text" className="form-control" name="dosage" value={row.dosage} onChange={(e) => handleChange(index, e)} placeholder='Enter Dosage...' required /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="button" className="btn btn-outline-info" onClick={addRow}>➕ Add More Medicines</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <FloatingLabel controlId="floatingMentions" label="Anything to mention to the patient..." className="mb-4" style={{ width: '400px' }}>
                            <Form.Control
                                as="textarea"
                                name="mention"
                                value={mention}
                                onChange={handleMentionChange}
                                style={{ height: '70px', background: 'rgba(204, 238, 241, 0.46)' }}
                                placeholder="Enter mention"
                            />
                        </FloatingLabel>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-success px-5">Submit</button>
                        <button type="button" className="btn btn-danger px-5" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}
