const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')


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


const ActionOnUser = async (req, res) => {
    try {
        const { id, userStatusChange } = req.body
        console.log(id, userStatusChange)
        const thatUser = await User.findById(id)
        console.log(thatUser)
        thatUser.userStatus = userStatusChange
        await thatUser.save()
        res.json({ msg: "User status changed", status: 200 })
    } catch (err) {
        console.log(err)
    }
}


const ActionOnDoctor = async (req, res) => {
    try {
        const { id, doctorStatusChange } = req.body
        console.log(id, doctorStatusChange)
        const thatDoctor = await Doctor.findById(id)
        console.log(thatDoctor)
        thatDoctor.doctorStatus = doctorStatusChange
        await thatDoctor.save()
        res.json({ msg: "Doctor status changed", status: 200 })
    } catch (err) {
        console.log(err)
    }
}


const Calculations = async(req,res) =>{
    try{
        const numberOfUsers = await User.find()
        const numberOfDoctors = await Doctor.find()
        const numberOfAppointments = await Appointment.find()
        const numberOfPrescriptions = await Prescription.find()
        console.log(numberOfUsers.length)
        console.log(numberOfDoctors.length)
        console.log(numberOfAppointments.length)
        console.log(numberOfPrescriptions.length)
        res.json({numberOfUsers,numberOfDoctors,numberOfAppointments,numberOfPrescriptions})

    }catch(err) {
        console.log(err)
    }
}


module.exports = { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor,Calculations }