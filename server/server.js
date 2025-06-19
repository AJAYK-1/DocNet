const express = require('express')
const App = express()
const cors = require('cors')
const DataBaseConnect = require('./middleware/dbconnection')


App.use(cors())
App.use(express.json())
require('dotenv').config()

DataBaseConnect()

const RouterUser = require('./routes/userRouter')
App.use('/api/user',RouterUser)


const RouterDoctor = require('./routes/doctorRouter')
App.use('/api/doctor',RouterDoctor)


const RouterAdmin = require('./routes/adminRouter')
App.use('/api/admin',RouterAdmin)


App.use('/uploads',express.static('uploads'))


App.listen(process.env.PORT, () => {
    console.log("Server Running Successfully...😊")
})