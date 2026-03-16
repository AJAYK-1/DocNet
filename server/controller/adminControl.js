const Users = require('../models/usersModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')

// view all users...
const AdminviewUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({ role: 'patient' }).select('-password -otp -otpExpiry')
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
        const allDoctors = await Users.find({ role: 'doctor' }).select('-password -otp -otpExpiry')
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

        if (!thatUser)
            return res.status(404).json({ msg: "User not found" })

        thatUser.accountStatus = userStatusChange
        await thatUser.save()
        return res.status(200).json({ msg: "User's account status changed" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "An Error Occured..." })
    }
}

// Activate or Deactivate doctor accounts...
const ActionOnDoctor = async (req, res) => {
    try {
        const { id, doctorStatusChange } = req.body
        const thatDoctor = await Users.findById(id)

        if (!thatDoctor)
            return res.status(404).json({ msg: "Doctor not found" })

        thatDoctor.accountStatus = doctorStatusChange
        await thatDoctor.save()
        res.status(200).json({ msg: "Doctor's account status changed" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "An Error Occured..." })
    }
}

// Data for charts on dashboard...
const Calculations = async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments({ role: 'patient' })
        const totalDoctors = await Users.countDocuments({ role: 'doctor' })
        const totalAppointments = await Appointment.countDocuments()
        const totalPrescriptions = await Prescription.countDocuments()

        res.status(200).json({ msg: 'Dashboard data fetched successfully...', data: { totalUsers, totalDoctors, totalAppointments, totalPrescriptions } })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "An Error Occured..." })
    }
}

module.exports = { AdminviewUsers, AdminviewDoctors, ActionOnUser, ActionOnDoctor, Calculations }