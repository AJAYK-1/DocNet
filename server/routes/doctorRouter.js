const express = require('express')
const { DoctorRegister, fetchAppointments, addPrescription, viewPrescription, viewLoggedDoctor, changeAvalibility } = require('../controller/doctorControl')
const upload = require('../middleware/multerConfig')
const RouterDoctor = express.Router()


RouterDoctor.post('/doctorregistration',upload.single('profileImage'), DoctorRegister)
RouterDoctor.get('/viewloggeddoctor',viewLoggedDoctor)
RouterDoctor.put('/changeavailability',changeAvalibility)
RouterDoctor.get('/fetchappointments', fetchAppointments)
RouterDoctor.post('/yourprescription', addPrescription)
RouterDoctor.get('/viewprescription',viewPrescription)


module.exports = RouterDoctor