const express = require('express')
const { AdminviewUsers } = require('../controller/adminControl')
const RouterAdmin = express.Router()


RouterAdmin.get('/adminviewusers',AdminviewUsers)


module.exports = RouterAdmin