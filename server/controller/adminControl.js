const Users = require('../models/usersModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')

// view all users...
const AdminviewUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({ role: 'patient' })
        if (!allUsers)
            return res.status(404).json({ msg: 'Users not found...', data: [] })

        return res.status(200).json({ msg: 'All users fetched...', data: allUsers })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "An Error Occured..." })
    }
}

// View all doctors...
const AdminviewDoctors = async (req, res) => {
    try {
        const allDoctors = await Users.find({ role: 'doctor' })
        if (!allDoctors)
            return res.status(404).json({ msg: 'Users not found...', data: [] })

        return res.status(200).json({ msg: 'All users fetched...', data: allDoctors })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "An Error Occured..." })
    }
}

// Activate or Deactivate users accounts...
const ActionOnUser = async (req, res) => {
    try {
        const { id, userStatusChange } = req.body
        const thatUser = await Users.findById(id)
        thatUser.accountStatus = userStatusChange
        await thatUser.save()
        return res.json({ msg: "User's account status changed", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Activate or Deactivate doctor accounts...
const ActionOnDoctor = async (req, res) => {
    try {
        const { id, doctorStatusChange } = req.body
        const thatDoctor = await Users.findById(id)
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
        const numberOfUsers = await Users.find()
        const numberOfDoctors = await Users.find()
        const numberOfAppointments = await Appointment.find()
        const numberOfPrescriptions = await Prescription.find()
        res.json({ numberOfUsers, numberOfDoctors, numberOfAppointments, numberOfPrescriptions })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


module.exports = { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor, Calculations }