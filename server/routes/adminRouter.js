const express = require('express')
const { AdminviewUsers, AdminviewDoctors } = require('../controller/adminControl')
const RouterAdmin = express.Router()


RouterAdmin.get('/adminviewusers',AdminviewUsers)
RouterAdmin.get('/adminviewdoctors',AdminviewDoctors)


module.exports = RouterAdmin