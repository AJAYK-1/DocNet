const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const ExistingUser = await User.findOne({ email })
        if (ExistingUser) {
            res.json({ msg: "Regisration failed... User already exist..." })
        }
        else {
            const userdata = await User({
                username,
                email,
                password
            })
            await userdata.save()
            res.json({ msg: "Data Registered Successfully..." })
        }
    } catch (err) {
        console.log(err)
    }
}


const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const LoggedUser = await User.findOne({ email })
        const LoggedDoctor = await Doctor.findOne({ email })
        console.log(LoggedDoctor)
        console.log(LoggedUser)
        if (LoggedUser && LoggedUser.userStatus == "Active") {
            if (LoggedUser.password == password) {
                const token = jwt.sign({ id: LoggedUser._id }, "qwertyuio", { expiresIn: '1h' })
                res.json({ msg: "Login Successfull...", status: 200, token: token })
            } else {
                res.json({ msg: "Incorrect Email or Password...", status: 400 })
            }
        } else if (LoggedDoctor && LoggedDoctor.doctorStatus == "Active") {
            if (LoggedDoctor.password == password) {
                const token = jwt.sign({ id: LoggedDoctor._id }, "docasdf", { expiresIn: "1h" })
                res.json({ msg: "Doctor Login Successfull...", status: 201, token: token })
            } else {
                res.json({ msg: "Incorrect Email or Password...", status: 400 })
            }
        } else if (LoggedUser.userStatus == "Deactivated" && LoggedDoctor.doctorStatus == "Deactivated") {
            res.json({ msg: "Your Account has been deactivated. Unable to login..." })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "User Not Found...", status: 400 })
    }
}


const viewLoggedUser = async (req, res) => {
    try {
        const id = req.headers.id
        const LoggedinUser = await User.findById(id)
        console.log(LoggedinUser)
        res.json(LoggedinUser)

    } catch (err) {
        console.log(err)

    }
}


const viewDoctors = async (req, res) => {
    try {
        const Docs = await Doctor.find({})
        res.json(Docs)
    } catch (err) {
        console.log(err)
    }
}


const viewDoctorsProfile = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const DocData = await Doctor.findById(id)
        console.log(DocData)
        res.json(DocData)
    } catch (err) {
        console.log(err)
    }
}


const bookAppointment = async (req, res) => {
    try {
        console.log("req.body", req.body)
        const { userId, doctorId, patientName, patientAge, patientGender, patientSymptoms } = req.body
        const appointment = await Appointment({ userId, doctorId, patientName, patientAge, patientGender, patientSymptoms })
        // console.log(appointment)
        await appointment.save()
        res.json({ msg: "Appointment Booked successfully", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Booking failed", status: 400 })
    }
}


const fetchMyAppointments = async (req, res) => {
    try {
        const id = req.headers.id
        console.log(id)
        const myappointments = await Appointment.find({ userId: id })
            .populate("doctorId")
            .populate("userId")
        console.log(myappointments)
        res.json(myappointments)
    } catch (err) {
        console.log(err)
    }
}


const fetchMyPrescription = async (req, res) => {
    try {
        const userId = req.headers.id
        console.log(userId)
        const prescriptions = await Prescription.find()
            .populate({ path: "appointmentId", populate: { path: "doctorId" } })

        const fetchedprescription = prescriptions.filter(check => check.appointmentId.userId == userId)
            .map(check => ({
                docname: check.appointmentId.doctorId.docname,
                patientName: check.appointmentId.patientName,
                prescription: check.prescription
            }))
        console.log(fetchedprescription)
        res.json(fetchedprescription)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    registerUser,
    userlogin,
    viewLoggedUser,
    viewDoctors,
    viewDoctorsProfile,
    bookAppointment,
    fetchMyAppointments,
    fetchMyPrescription
}