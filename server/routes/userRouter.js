const express = require('express')
const RouterUser = express.Router()
const { registerUser, userlogin, viewLoggedUser, viewDoctors, viewDoctorsProfile,
    bookAppointment, fetchMyPrescription, fetchMyAppointments, fetchPrescriptionById,
    viewFeedbacks, submitFeedback, Payment, ValidatePayment, loginWithOTP, sendOTP,
    confirmOTP, PasswordReset, ContactDeveloper } = require('../controller/userControl')
const upload = require('../config/multerConfig')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')
const authorizeRole = require('../middlewares/authorizeRole')
const { registerSchema } = require('../utils/validators/authValidator')

RouterUser.post('/registeruser', upload.single('profileImage'), validate(registerSchema), registerUser)
RouterUser.post('/login', userlogin)
RouterUser.put('/send-otp', sendOTP)
RouterUser.post('/loginwithOTP', loginWithOTP)
RouterUser.post('/confirm-otp', confirmOTP)
RouterUser.put('/reset-password', PasswordReset)
RouterUser.post('/contact-developer', ContactDeveloper)
RouterUser.get('/viewloggeduser', viewLoggedUser)
RouterUser.get('/viewdoctors', verifyToken, authorizeRole('patient'), viewDoctors)
RouterUser.get('/viewdoctorprofile/:id', verifyToken, authorizeRole('patient'), viewDoctorsProfile)
RouterUser.post('/bookappointment', verifyToken, authorizeRole('patient'), bookAppointment)
RouterUser.get('/fetchmyappointments', verifyToken, authorizeRole('patient'), fetchMyAppointments)
RouterUser.get('/fetchmyprescription', verifyToken, authorizeRole('patient'), fetchMyPrescription)
RouterUser.get('/fetch-prescription-byId', verifyToken, authorizeRole('patient'), fetchPrescriptionById)
RouterUser.post('/write-feedback', verifyToken, authorizeRole('patient'), submitFeedback)
RouterUser.get('/seefeedbacks', verifyToken, authorizeRole('patient'), viewFeedbacks)
RouterUser.post('/payment', verifyToken, authorizeRole('patient'), Payment)
RouterUser.post('/validate-payment', verifyToken, authorizeRole('patient'), ValidatePayment)

module.exports = RouterUser