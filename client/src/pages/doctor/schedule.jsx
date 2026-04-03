import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/footer'
import CreateSchedule from './components/createSchedule'

const Schedule = () => {
    const token = localStorage.getItem('token')

    const [selectedDates, setSelectedDates] = useState([]);
    const [markedDates, setMarkedDates] = useState([])
    const [schedule, setSchedule] = useState([])

    const handleDate = (sch) => {
        setSelectedDates(sch);
    }

    const fetchSchedule = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/doctor/schedule`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.status === 200) {
                setSchedule(res.data.schedule)
                setSelectedDates(res.data.schedule[0].slots);
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong...')
        }
    }

    useEffect(() => {
        fetchSchedule()
    }, [])

    const handleSchedule = async (e) => {
        try {
            e.preventDefault()
            const formattedSchedule = selectedDates.map((date) => ({
                dates: date.format("YYYY-MM-DD")
            }));
            console.log(formattedSchedule)
            const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/changeavailability`,
                { id: decoded.id, schedule: formattedSchedule },
            )
            if (res.status === 200) {
                window.location.reload()
                toast.success(res.data.msg)
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong...')
        }
    }

    if (schedule.length === 0)
        return <CreateSchedule token={token} />

    return (
        <>
            <Navbar />
            <div className='min-h-[700px] p-5'>
                <div >
                    <div className="modal-header">
                        <h5 className="modal-title">Set your schedule</h5>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: '20px', marginRight: '20px' }}>
                        <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                            <strong>You will not recieve appointments on selected days.</strong>
                        </Card.Text>
                    </div>

                    <div className="modal-body d-flex justify-content-center">
                        {schedule.map((sch) =>
                            <button
                                key={sch._id}
                                onClick={() => handleDate(sch.slots)}
                                className="btn btn-success mx-2">
                                {new Date(sch.date).toLocaleDateString()}
                            </button>
                        )}
                    </div>
                    <br />

                    <div className="modal-body d-flex justify-center flex-wrap">
                        {selectedDates.map((selected) =>
                            <div key={selected._id} className='bg-gray-400 m-2 p-2 rounded-2xl'>{selected.time}</div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-success" onClick={handleSchedule} >
                            Set Schedule
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Schedule