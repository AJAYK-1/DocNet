const express = require('express')
const { DoctorRegister, fetchAppointments, addPrescription, viewPrescription } = require('../controller/doctorControl')
const RouterDoctor = express.Router()


RouterDoctor.post('/doctorregistration', DoctorRegister)
RouterDoctor.get('/fetchappointments', fetchAppointments)
RouterDoctor.post('/yourprescription', addPrescription)
RouterDoctor.get('/viewprescription',viewPrescription)


module.exports = RouterDoctor