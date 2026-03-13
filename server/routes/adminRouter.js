const express = require('express')
const { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor, Calculations } = require('../controller/adminControl')
const verifyToken = require('../middlewares/verifyToken')
const authorizeRole = require('../middlewares/authorizeRole')
const RouterAdmin = express.Router()

RouterAdmin.get('/view-users', verifyToken, authorizeRole('admin'), AdminviewUsers)
RouterAdmin.get('/view-doctors', verifyToken, authorizeRole('admin'), AdminviewDoctors)
RouterAdmin.put('/action-on-user', verifyToken, authorizeRole('admin'), ActionOnUser)
RouterAdmin.put('/action-on-doctor', verifyToken, authorizeRole('admin'), ActionOnDoctor)
RouterAdmin.get('/admingetappointments', verifyToken, authorizeRole('admin'), Calculations)

module.exports = RouterAdmin