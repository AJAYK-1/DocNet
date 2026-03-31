import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import DatePicker, { DateObject } from "react-multi-date-picker"
import { toast } from 'react-toastify'

const Schedule = ({ token, handlecloseModal }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [markedDates, setMarkedDates] = useState([])
    const [schedule, setSchedule] = useState([])

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    }

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

    return (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ minHeight: '700px' }}>
            <div className="modal-dialog modal-dialog-top" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Set your schedule</h5>
                        <button type="button" className="btn-close" onClick={handlecloseModal}></button>
                    </div>
                    {/* Display selected dates */}
                    <div style={{ marginTop: "10px", marginLeft: '20px', marginRight: '20px' }}>
                        <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#34495E' }}>
                            <strong>You will not recieve appointments on selected days.</strong>
                            {/* <ul>
                                                                {selectedDates.map((date, index) => (
                                                                    <li key={index}>{date}</li>
                                                                ))}
                                                            </ul> */}
                        </Card.Text>
                    </div>

                    <div className="modal-body d-flex justify-content-center">
                        <DatePicker style={{ minWidth: '400px' }}
                            multiple
                            value={selectedDates}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            highlightToday
                            onlyCalendar
                            inline
                            sort
                            mapDays={({ date }) => {
                                const dateStr = date.format("YYYY-MM-DD")
                                const isUnavailable = markedDates.includes(dateStr)
                                return {
                                    style: isUnavailable
                                        ? { backgroundColor: "#3498db", color: "white", borderRadius: "50%" }
                                        : {}
                                };
                            }}
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handlecloseModal}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={handleSchedule} >
                            Set Dates
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Schedule