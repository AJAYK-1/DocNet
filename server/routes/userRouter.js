const express = require('express')
const RouterUser = express.Router()
const { registerUser, userlogin, viewLoggedUser, viewDoctors, viewDoctorsProfile, bookAppointment, fetchMyPrescription, fetchMyAppointments, fetchPrescriptionById, viewFeedbacks, submitFeedback, Payment, ValidatePayment, loginWithOTP, sendOTP, confirmOTP, PasswordReset } = require('../controller/userControl')


RouterUser.post('/registeruser', registerUser)
RouterUser.post('/login', userlogin)
RouterUser.put('/send-otp', sendOTP)
RouterUser.post('/loginwithOTP', loginWithOTP)
RouterUser.post('/confirm-otp', confirmOTP)
RouterUser.put('/reset-password',PasswordReset)
RouterUser.get('/viewloggeduser', viewLoggedUser)
RouterUser.get('/viewdoctors', viewDoctors)
RouterUser.get('/viewdoctorprofile/:id', viewDoctorsProfile)
RouterUser.post('/bookappointment', bookAppointment)
RouterUser.get('/fetchmyappointments', fetchMyAppointments)
RouterUser.get('/fetchmyprescription', fetchMyPrescription)
RouterUser.get('/fetch-prescription-byId', fetchPrescriptionById)
RouterUser.post('/write-feedback', submitFeedback)
RouterUser.get('/seefeedbacks', viewFeedbacks)
RouterUser.post('/payment', Payment)
RouterUser.post('/validate-payment', ValidatePayment)


module.exports = RouterUser