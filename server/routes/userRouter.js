const express = require('express')
const RouterUser = express.Router()
const { registerUser, userlogin, viewLoggedUser, viewDoctors, viewDoctorsProfile, bookAppointment } = require('../controller/userControl')


RouterUser.post('/registeruser',registerUser)
RouterUser.post('/login',userlogin)
RouterUser.get('/viewloggeduser',viewLoggedUser)
RouterUser.get('/viewdoctors',viewDoctors)
RouterUser.get('/viewdoctorprofile/:id',viewDoctorsProfile)
RouterUser.post('/bookappointment',bookAppointment)


module.exports = RouterUser