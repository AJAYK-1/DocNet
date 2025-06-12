const express = require('express')
const { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor, Calculations } = require('../controller/adminControl')
const RouterAdmin = express.Router()


RouterAdmin.get('/adminviewusers',AdminviewUsers)
RouterAdmin.get('/adminviewdoctors',AdminviewDoctors)
RouterAdmin.put('/action-on-user',ActionOnUser)
RouterAdmin.put('/action-on-doctor',ActionOnDoctor)
RouterAdmin.get('/admingetappointments',Calculations)


module.exports = RouterAdmin