const express = require('express')
const { DoctorRegister, fetchAppointments, addPrescription, viewPrescription, viewLoggedDoctor } = require('../controller/doctorControl')
const upload = require('../middleware/multerConfig')
const RouterDoctor = express.Router()


RouterDoctor.post('/doctorregistration',upload.single('profileImage'), DoctorRegister)
RouterDoctor.get('/viewloggeddoctor',viewLoggedDoctor)
RouterDoctor.get('/fetchappointments', fetchAppointments)
RouterDoctor.post('/yourprescription', addPrescription)
RouterDoctor.get('/viewprescription',viewPrescription)


module.exports = RouterDoctor