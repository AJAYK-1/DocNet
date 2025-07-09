const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')


// view all users...
const AdminviewUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json({ msg: 'All users fetched...', data: allUsers, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// View all doctors...
const AdminviewDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        res.json({ msg: 'All doctors fetched...', data: allDoctors, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}

// Activate or Deactivate users accounts...
const ActionOnUser = async (req, res) => {
    try {
        const { id, userStatusChange } = req.body
        const thatUser = await User.findById(id)
        thatUser.accountStatus = userStatusChange
        await thatUser.save()
        res.json({ msg: "User's account status changed", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Activate or Deactivate doctor accounts...
const ActionOnDoctor = async (req, res) => {
    try {
        const { id, doctorStatusChange } = req.body
        const thatDoctor = await Doctor.findById(id)
        thatDoctor.accountStatus = doctorStatusChange
        await thatDoctor.save()
        res.json({ msg: "Doctor's account status changed", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Data for charts on dashboard...
const Calculations = async (req, res) => {
    try {
        const numberOfUsers = await User.find()
        const numberOfDoctors = await Doctor.find()
        const numberOfAppointments = await Appointment.find()
        const numberOfPrescriptions = await Prescription.find()
        res.json({ numberOfUsers, numberOfDoctors, numberOfAppointments, numberOfPrescriptions })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


module.exports = { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor, Calculations }