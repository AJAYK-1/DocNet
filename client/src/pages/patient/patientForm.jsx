import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Footer from '../../components/layouts/footer';
import Navbar from '../../components/layouts/navbar';

const PatientForm = () => {
    const token = localStorage.getItem('token')
    const { id } = useParams()

    const [schedule, setSchedule] = useState([])
    const [PatientDetails, setPatientDetails] = useState({
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientSymptoms: '',
        appointmentDate: '',
        appointmentTime: ''
    });
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState()
    const [fees, setFees] = useState(0)
    const [timeSlot, SetTimeSlot] = useState({
        date: '', time: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPatientDetails({ ...PatientDetails, [e.target.name]: e.target.value });
    };

    const handleSlot = (appointmentTime) => {
        setPatientDetails({ ...PatientDetails, appointmentTime })
        SetTimeSlot({ time: appointmentTime })
    }

    const handleDate = (sch) => {
        setSelectedSlots(sch.slots);
        setPatientDetails({ ...PatientDetails, appointmentDate: sch.date })
    }
    console.log(PatientDetails);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/fetch-schedule/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.status === 200) {
                setSchedule(response.data.schedule)
                SetTimeSlot({ date: response.data.schedule[0].date })
                setSelectedSlots(response.data.schedule[0].slots)
                setFees(response.data.fees)
            } else {
                toast.error(response.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong...")
        }
    }

    useEffect(() => {
        fetchSchedule()
    }, [])

    const handleAppointment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/bookappointment`, {
                doctorId: id,
                ...PatientDetails,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.status === 200) {
                toast.success(res.data.msg);
                setTimeout(() => navigate('/appointment'), 3000);
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            console.log(err);
            toast.error("Booking failed.");
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault()
        const amount = fees * 100
        axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/payment`,
            {
                amount: amount,
                currency: "INR",
                receipt: "qazwsx1"
            },
            { headers: { "Content-Type": "application/json" } })
            .then((res) => {
                const order = res.data
                const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID
                const options = {
                    "key": keyId, // Enter the Key ID generated from the Dashboard
                    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    "name": "DocNet", //your business name
                    "description": "Dummy Transaction",
                    "image": "https://www.freeiconspng.com/thumbs/doctor-logo/doctor-logo-png-photo-5.png",
                    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response) {
                        axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/validate-payment`,
                            response, { headers: { "Content-Type": "application/json" } }
                        )
                            .then((res) => {
                                if (res.data.status == 200) {
                                    toast.success(res.data.msg)
                                    handleAppointment(id)
                                } else {
                                    toast.error(res.data.msg)
                                }
                            }).catch((err) => {
                                console.log(err)
                                toast.error("Payment Error...")
                            })
                    },
                    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                        "name": "", //your customer's name
                        "email": "",
                        "contact": ""  //Provide the customer's phone number for better conversion rates 
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp1.open()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Navbar />

            <div className='min-h-[700px] p-20'>
                <div className='modal-content'>

                    <div className="modal-header">
                        <h5 className="modal-title">✏️ Fill the Patient's Details please</h5>
                    </div>

                    <Form
                        className="modal-body flex flex-col justify-content-center bg-gray-100 p-5"
                        onSubmit={handlePayment}>
                        <div className="modal-body-bg p-5">
                            <FloatingLabel controlId="floatingPatientName" label="Patient's Name" className="mb-3">
                                <Form.Control type="text" name="patientName" onChange={handleChange} placeholder="Enter name" required />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPatientAge" label="Patient's Age" className="mb-3">
                                <Form.Control type="number" name="patientAge" onChange={handleChange} placeholder="Enter age" required />
                            </FloatingLabel>
                            <Form.Group className="mb-3">
                                <Form.Label className='text-muted'>Patient's Gender:</Form.Label>
                                <Form.Check type='radio' label='♂️ Male' name="patientGender" value={'Male'} onChange={handleChange} required />
                                <Form.Check type='radio' label='♀️ Female' name="patientGender" value={'Female'} onChange={handleChange} />
                            </Form.Group>
                            <FloatingLabel controlId="floatingSymptoms" label="Patient's Symptoms" className="mb-3">
                                <Form.Control as="textarea" name="patientSymptoms" onChange={handleChange} style={{ height: '100px' }} required />
                            </FloatingLabel>

                            <Form.Label className='text-muted'>Select Appointment date:</Form.Label>
                            <div className="modal-body d-flex justify-content-center">
                                {schedule.map((sch) =>
                                    <button
                                        key={sch._id}
                                        type='button'
                                        onClick={() => handleDate(sch)}
                                        className="btn btn-success mx-2">
                                        {new Date(sch.date).toLocaleDateString()}
                                    </button>
                                )}
                            </div>

                            <div className="modal-body d-flex justify-center flex-wrap">
                                {selectedSlots.map((selected) =>
                                    selected.isBooked ? (
                                        <button
                                            type='button'
                                            key={selected._id}
                                            disabled
                                            className='bg-sky-400 m-2 p-2 rounded-xl'>
                                            {selected.time}
                                        </button>
                                    ) : (
                                        selected.time === timeSlot.time && PatientDetails.appointmentDate === timeSlot.date ? (
                                            <button
                                                type='button'
                                                key={selected._id}
                                                className='bg-red-400 m-2 p-2 rounded-xl'>
                                                {selected.time}
                                            </button>
                                        ) : (
                                            <button
                                                type='button'
                                                key={selected._id}
                                                onClick={() => handleSlot(selected.time)}
                                                className='bg-gray-400 m-2 p-2 rounded-xl'>
                                                {selected.time}
                                            </button>
                                        )
                                    ))}
                            </div>

                            <Form.Text className='text-muted mt-1'>
                                ⚠️ You cannot select a date/time on which the doctor is unavailable.
                            </Form.Text>
                        </div>
                        <div className=''>
                            <Button variant="primary" type='submit'>Confirm Booking</Button>
                        </div>
                    </Form>
                </div >
            </div >

            <Footer />
        </>
    )
}

export default PatientForm