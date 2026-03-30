import axios from 'axios';
import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateSchedule = () => {
    const token = localStorage.getItem('token')

    const [schedule, setSchedule] = useState({
        startTime: '', endTime: '', interval: ''
    })

    const handleChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
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
        <div>
            <Form onSubmit={handleSubmit}>
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
        </div>
    )
}

export default CreateSchedule