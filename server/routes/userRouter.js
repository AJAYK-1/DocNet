const express = require('express')
const RouterUser = express.Router()
const { registerUser, userlogin, viewLoggedUser, viewDoctors, viewDoctorsProfile, bookAppointment, fetchMyPrescription, fetchMyAppointments, fetchPrescriptionById } = require('../controller/userControl')


RouterUser.post('/registeruser',registerUser)
RouterUser.post('/login',userlogin)
RouterUser.get('/viewloggeduser',viewLoggedUser)
RouterUser.get('/viewdoctors',viewDoctors)
RouterUser.get('/viewdoctorprofile/:id',viewDoctorsProfile)
RouterUser.post('/bookappointment',bookAppointment)
RouterUser.get('/fetchmyappointments',fetchMyAppointments)
RouterUser.get('/fetchmyprescription',fetchMyPrescription)
RouterUser.get('/fetch-prescription-byId',fetchPrescriptionById)


module.exports = RouterUser