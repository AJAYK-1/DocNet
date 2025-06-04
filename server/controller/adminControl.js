const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')


const AdminviewUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        console.log(allUsers)
        res.json(allUsers)
    } catch (err) {
        console.log(err)
    }
}


const AdminviewDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        console.log(allDoctors)
        res.json(allDoctors)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { AdminviewUsers, AdminviewDoctors }