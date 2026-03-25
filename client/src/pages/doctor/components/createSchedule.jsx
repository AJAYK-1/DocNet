import axios from 'axios';
import React, { useState } from 'react'
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
        <div>createSchedule</div>
    )
}

export default CreateSchedule