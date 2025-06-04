const express = require('express')
const App = express()
const cors = require('cors')
const DataBaseConnect = require('./middleware/dbconnection')
const upload = require('./middleware/multerConfig')


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


// App.use('/api',upload)
App.use('/uploads',express.static('uploads'))


App.listen(9000, () => {
    console.log("Server Running Successfully...😊")
})