const express = require('express')
const { DoctorRegister, fetchAppointments } = require('../controller/doctorControl')
const RouterDoctor = express.Router()


RouterDoctor.post('/doctorregistration', DoctorRegister)
RouterDoctor.get('/fetchappointments', fetchAppointments)


module.exports = RouterDoctor