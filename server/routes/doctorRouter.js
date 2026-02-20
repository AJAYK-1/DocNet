const express = require('express')
const { DoctorRegister, fetchAppointments, addPrescription, viewPrescription, viewLoggedDoctor, editSchedule, doctorProfileEdit, createSchedule } = require('../controller/doctorControl')
const upload = require('../config/multerConfig')
const authorizeRole = require('../middlewares/authorizeRole')
const verifyToken = require('../middlewares/verifyToken')
const RouterDoctor = express.Router()

// RouterDoctor.post('/doctorregistration',upload.single('profileImage'), DoctorRegister)
RouterDoctor.get('/viewloggeddoctor', verifyToken, authorizeRole('doctor'), viewLoggedDoctor)
RouterDoctor.post('/create-schedule', verifyToken, authorizeRole('doctor'), createSchedule)
RouterDoctor.put('/changeavailability', verifyToken, authorizeRole('doctor'), editSchedule)
RouterDoctor.put('/doctoreditprofile', verifyToken, authorizeRole('doctor'), upload.single('profileImage'), doctorProfileEdit)
RouterDoctor.get('/fetchappointments', verifyToken, authorizeRole('doctor'), fetchAppointments)
RouterDoctor.post('/yourprescription', verifyToken, authorizeRole('doctor'), addPrescription)
RouterDoctor.get('/viewprescription', verifyToken, authorizeRole('doctor'), viewPrescription)

module.exports = RouterDoctor