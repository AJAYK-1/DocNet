const express = require('express')
const { DoctorRegister, fetchAppointments, addPrescription, viewPrescription, viewLoggedDoctor, editSchedule, doctorProfileEdit, createSchedule } = require('../controller/doctorControl')
const upload = require('../config/multerConfig')
const authorizeRole = require('../middlewares/authorizeRole')
const verifyToken = require('../middlewares/verifyToken')
const RouterDoctor = express.Router()

// RouterDoctor.post('/doctorregistration',upload.single('profileImage'), DoctorRegister)
RouterDoctor.get('/profile', verifyToken, authorizeRole('doctor'), viewLoggedDoctor)
RouterDoctor.post('/create-schedule', verifyToken, authorizeRole('doctor'), createSchedule)
RouterDoctor.put('/edit-schedule', verifyToken, authorizeRole('doctor'), editSchedule)
RouterDoctor.put('/edit-profile', verifyToken, authorizeRole('doctor'), upload.single('profileImage'), doctorProfileEdit)
RouterDoctor.get('/appointments', verifyToken, authorizeRole('doctor'), fetchAppointments)
RouterDoctor.post('/prescription/:appointmentId', verifyToken, authorizeRole('doctor'), addPrescription)
RouterDoctor.get('/prescriptions', verifyToken, authorizeRole('doctor'), viewPrescription)

module.exports = RouterDoctor