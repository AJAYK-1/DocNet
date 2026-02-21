const Users = require('../models/usersModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const path = require('path')
const fs = require('fs')
const argon2 = require('argon2')
const { sendaMail } = require('../config/nodeMailer')
const { WelcomeMailDoctor } = require('../emails/welcomeDoctor')
const DoctorSchedule = require("../models/docScheduleModel")
const generateSlots = require("../utils/generateSlots")

// Create a schedule for the doctor...
const createSchedule = async (req, res) => {
    try {
        const doctorId = req.user.id
        const { startTime, endTime, interval } = req.body

        if (!startTime || !endTime || !interval) {
            return res.status(400).json({ msg: "All fields required" })
        }

        const generatedSlots = generateSlots(startTime, endTime, interval)

        if (generatedSlots.length === 0) {
            return res.status(400).json({ msg: "Invalid time range" })
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const schedules = []

        for (let i = 0; i < 7; i++) {

            const date = new Date(today)
            date.setDate(today.getDate() + i)

            const existing = await DoctorSchedule.findOne({
                doctorId,
                date
            })

            if (!existing) {
                schedules.push({
                    doctorId,
                    date,
                    slots: generatedSlots.map(time => ({
                        time,
                        isBooked: false
                    }))
                })
            }
        }

        if (schedules.length > 0) {
            await DoctorSchedule.insertMany(schedules)
        }

        return res.status(200).json({ msg: "Schedule created successfully" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

// Registration for doctors...
const DoctorRegister = async (req, res) => {
    try {
        const { docname, email, password, address, license, qualification, specialization } = req.body
        const profileImage = req.file.filename
        const ExistingDoctor = await Users.findOne({ email })
        if (ExistingDoctor) {
            res.json({ msg: "Account already exists...", status: 400 })
        } else {
            const hashedPassword = await argon2.hash(password)
            const DoctorData = await Users({
                docname,
                email,
                password: hashedPassword,
                address,
                license,
                qualification,
                specialization,
                profileImage
            })
            const personalMail = await WelcomeMailDoctor(docname)
            sendaMail(email, "🎉 Welcome to DocNet – Your Health, Simplified!", "", personalMail)
            await DoctorData.save()
            res.status(200).json({ msg: "Registration Successfull..." })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Registration Error...", status: 404 })
    }
}

// Currently Logged in doctor...
const viewLoggedDoctor = async (req, res) => {
    try {
        const id = req.user.id
        const LoggedinDoctor = await Users.findById(id).select("-password -otp -otpExpiry")

        if (!LoggedinDoctor)
            return res.status(404).json({ msg: "No doctor found..." })

        return res.status(200).json({ msg: "Doctor data fetched successfully...", data: LoggedinDoctor })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Error user not found..." })
    }
}

// Changing the doctors schedule...
const editSchedule = async (req, res) => {
    try {
        const doctorId = req.user.id
        const { date, startTime, endTime, interval } = req.body

        const selectedDate = new Date(date)
        selectedDate.setHours(0, 0, 0, 0)

        const schedule = await DoctorSchedule.findOne({ doctorId, date: selectedDate })

        if (!schedule)
            return res.status(404).json({ msg: "Schedule for the date not found" })

        const hasBookedSlots = schedule.slots.some(slot => slot.isBooked === true)

        if (hasBookedSlots)
            return res.status(400).json({ msg: "Cannot edit schedule with booked appointments" })

        const newSlots = generateSlots(startTime, endTime, interval)

        if (newSlots.length === 0) return res.status(400).json({ msg: "Invalid Time range" })

        schedule.slots = newSlots.map(time => ({ time, isBooked: false }))
        await schedule.save()

        return res.status(200).json({ msg: "Availability status changed" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error..." })
    }
}

// Editing Doctor's Profile...
const doctorProfileEdit = async (req, res) => {
    try {
        const doctorId = req.user.id
        const { name, license, qualification, specialization, address } = req.body

        const doctor = await Users.findById(doctorId)
        if (!doctor) return res.status(404).json({ msg: "Doctor not found..." })

        doctor.name = name ?? doctor.name
        doctor.license = license ?? doctor.license
        doctor.qualification = qualification ?? doctor.qualification
        doctor.specialization = specialization ?? doctor.specialization
        doctor.address = address ?? doctor.address

        if (req.file) {
            if (doctor.profileImage) {
                const oldPicPath = path.join(__dirname, '..', 'uploads', doctor.profileImage)
                if (fs.existsSync(oldPicPath)) {
                    fs.unlink(oldPicPath, (err) => {
                        if (err) {
                            console.log("Error deleting old Profile Picture.")
                        } else {
                            console.log("Old Profile Picture deleted successfully...")
                        }
                    })
                }
            }
            doctor.profileImage = req.file.filename
        }
        await doctor.save()

        return res.status(200).json({ msg: "Profile edited successfully", doctor })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error..." })
    }
}

// Fetch the appointments...
const fetchAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id
        const appointments = await Appointment.find({ doctorId })
            .populate("patientId", "name email")
            .sort({ appointmentDate: 1, appointmentTime: 1 })

        return res.status(200).json({ msg: "Fetched Appointments successfully...", appointments })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error..." })
    }
}

// Give Prescriptions...
const addPrescription = async (req, res) => {
    try {
        const doctorId = req.user.id
        const { appointmentId } = req.params
        const { prescriptionsData, mention } = req.body;

        if (!Array.isArray(prescriptionsData) || prescriptionsData.length === 0) {
            return res.status(400).json({ msg: "Prescription data cannot be empty." });
        }

        const appointment = await Appointment.findById(appointmentId)

        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" })
        }
        if (appointment.doctorId.toString() !== doctorId) {
            return res.status(403).json({ msg: "Access denied" })
        }
        if (appointment.appointmentStatus === "Completed") {
            return res.status(400).json({ msg: "Prescription already added" })
        }

        await Prescription.create({
            appointmentId,
            prescription: prescriptionsData,
            mention: mention
        });

        appointment.appointmentStatus = "Completed"
        await appointment.save()

        return res.status(200).json({ msg: "Prescription added Successfully..." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error..." })
    }
}

// View Prescriptions...
const viewPrescription = async (req, res) => {
    try {
        const doctorId = req.user.id

        const appointments = await Appointment.find({ doctorId }).select("_id")
        if (appointments.length === 0)
            return res.status(404).json({ msg: "No Prescriptions found...", prescriptions: [] })

        const appointmentIds = appointments.map(appointment => appointment._id)

        const prescriptions = await Prescription.find({
            appointmentId: { $in: appointmentIds }
        })
            .populate({
                path: "appointmentId",
                populate: { path: "patientId", select: "name email" }
            })
            .sort({ createdAt: -1 })

        return res.status(200).json({ msg: "Prescriptions fetched successfully...", prescriptions })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error..." })
    }
}

module.exports = {
    DoctorRegister,
    createSchedule,
    viewLoggedDoctor,
    editSchedule,
    doctorProfileEdit,
    fetchAppointments,
    addPrescription,
    viewPrescription
}