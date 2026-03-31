import axios from 'axios';
import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateSchedule = ({ token, handlecloseModal }) => {
    const [schedule, setSchedule] = useState({
        startTime: '', endTime: '', interval: ''
    })

    const handleChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/doctor/create-schedule`,
                schedule,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.status === 200) {
                toast.success(res.data.msg)
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...')
        }
    }

    return (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ minHeight: '700px' }}>
            <div className="modal-dialog modal-dialog-top" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Set your schedule</h5>
                        <button type="button" className="btn-close" onClick={handlecloseModal}></button>
                    </div>

                    <Form onSubmit={handleSubmit} className="modal-body flex flex-col justify-content-center bg-gray-200">
                        <FloatingLabel controlId="floatingStartTime" label="Start Time" className="mb-3">
                            <Form.Control type="text" name="startTime" value={schedule.startTime} onChange={handleChange} placeholder="Enter Start Time" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingEndTime" label="End Time" className="mb-3">
                            <Form.Control type="text" name="endTime" value={schedule.endTime} onChange={handleChange} placeholder="Enter End Time" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInterval" label="Interval" className="mb-3">
                            <Form.Control type="text" name="interval" value={schedule.interval} onChange={handleChange} placeholder="Enter Interval" />
                        </FloatingLabel>
                    </Form>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handlecloseModal}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={handleSubmit} >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSchedule