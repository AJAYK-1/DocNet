import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import DatePicker, { DateObject } from "react-multi-date-picker"

const Schedule = ({ setOpen, handlecloseModal }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [markedDates, setMarkedDates] = useState([])
    const [schedule, setSchedule] = useState([])
    
    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    }

    const handleAvailability = (e) => {
        e.preventDefault()
        const formattedSchedule = selectedDates.map((date) => ({
            dates: date.format("YYYY-MM-DD")
        }));
        console.log(formattedSchedule)
        axios.put(`${import.meta.env.VITE_HOST_URL}/api/doctor/changeavailability`, { id: decoded.id, schedule: formattedSchedule }
        ).then((res) => {
            window.location.reload()
            toast.success(res.data.msg)
        }).catch((err) => {
            console.log(err)
        })
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
                        <button className="btn btn-success" onClick={handleAvailability} onMouseEnter={() => setOpen(!open)} onMouseLeave={() => setOpen(!open)}>
                            Set Dates
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Schedule