const Users = require('../models/usersModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const Feedback = require('../models/feedbackModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const { sendaMail } = require('../config/nodeMailer')
const { WelcomeMailUser } = require('../emails/welcomeUser')
const { LoginOTP } = require('../emails/LoginOTP')
const { ResetPasswordOTP } = require('../emails/ResetPassword')
const { generateOTP } = require('../utils/OTPgenerator')
const argon2 = require('argon2')

// Registration for the user...
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.json({ msg: "Regisration failed... Account already exist...", status: 400 })
        }

        const hashedPassword = await argon2.hash(password)

        if (role === 'patient') {
            await Users.create({
                name,
                email,
                password: hashedPassword,
                role: role || 'patient'
            })
        } else if (role === 'doctor') {
            const { address, license, qualification, specialization } = req.body
            const profileImage = req.file?.filename || null
            await Users.create({
                name,
                email,
                password: hashedPassword,
                role: role || 'doctor',
                address,
                license,
                qualification,
                specialization,
                profileImage
            })
        }
        const personalMail = WelcomeMailUser(name)
        await sendaMail(email, "🎉 Welcome to DocNet – Your Health, Simplified!", "", personalMail)
        return res.json({ msg: "Registration Successfull...", status: 200 })

    } catch (err) {
        console.log(err)
        return res.json({ msg: "Registration Error...", status: 404 })
    }
}

// Common login using password for all type of users...
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            return res.json({ msg: "Logging in as Admin...", status: 202, token: token })
        }

        let ValidUser = await Users.findOne({ email })
        if (!ValidUser) return res.json({ msg: "User not found", status: 404 })

        const checkPassword = await argon2.verify(ValidUser.password, password)
        if (!checkPassword) return res.json({ msg: "Incorrect password", status: 400 })

        if (ValidUser.accountStatus != 'Active') return res.json({ msg: "Your account has been deactivated.", status: 400 })

        const token = jwt.sign({ id: ValidUser._id, role: ValidUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        return res.json({ msg: "Login successfull...", status: 200, token: token })

    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error...", status: 500 })
    }
}

// sends OTP via email...
const sendOTP = async (req, res) => {
    try {
        const { email, reqtype } = req.body
        let user = await Users.findOne({ email })

        if (!user) return res.json({ msg: "User not found...", status: 404 })

        const newotp = await generateOTP()
        const expiry = Date.now() + 5 * 60 * 1000
        user.otp = newotp
        user.otpExpiry = expiry
        await user.save()

        if (reqtype == 'Login') {
            const LoginotpMail = LoginOTP(user.name, newotp)
            sendaMail(email, "OTP to Login to DocNet", ``, LoginotpMail)
            return res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
        } else if (reqtype == 'Resetpassword') {
            const ResetPasswordMail = ResetPasswordOTP(user.name, newotp)
            sendaMail(email, "OTP to Reset Password", ``, ResetPasswordMail)
            return res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
        }
        return res.json({ msg: "Error Sending OTP...", status: 400 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// OTP confirmation...
const confirmOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        let thatUser = await Users.findOne({ email })

        if (!thatUser) {
            return res.json({ msg: "User not found...", status: 404 })
        } else if (thatUser.otp == otp) {
            return res.json({ msg: "OTP Confirmed...", status: 200 })
        }
        return res.json({ msg: "OTP Incorrect...", status: 400 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Common login using OTP for all types of users...
const loginWithOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        let user = await Users.findOne({ email })

        if (!user) return res.json({ msg: "User not found", status: 404 })

        if (user.accountStatus != 'Active') return res.json({ msg: "Your account has been deactivated.", status: 400 })
        if (user.otpExpiry < Date.now()) return res.json({ msg: "OTP expired or invalid.", status: 400 })

        if (user.otp == otp) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            return res.json({ msg: "Login successfull", status: 200, token: token })
        }
        return res.json({ msg: "Incorrect OTP", status: 400 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Reset Password...
const PasswordReset = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body
        if (newpassword !== confirmpassword) return res.json({ msg: "New and confirm passwords does not match", status: 400 })

        let user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "User not found...", status: 404 })

        const hashedPassword = await argon2.hash(newpassword)
        user.password = hashedPassword
        await user.save()
        return res.json({ msg: "Password Reset successfully...", status: 200 })

    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Contact the developer...
const ContactDeveloper = async (req, res) => {
    try {
        const { name, email, message } = req.body

        if (!name && !email && !message)
            return res.json({ msg: "Error sending mail. Please enter all valid information...", status: 400 })

        sendaMail(process.env.EMAIL, `${name} contacted | DocNet`, `${message} \n contact ${email} `)
        return res.json({ msg: "Mail send successfully...", status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Currently logged in user...
const viewLoggedUser = async (req, res) => {
    try {
        const id = req.headers.id
        const LoggedinUser = await Users.findById(id)
        return res.json({ msg: "Logged in...", data: LoggedinUser, status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Display all doctors...
const viewDoctors = async (req, res) => {
    try {
        const doctors = await Users.find({})

        if (!doctors) return res.json({ msg: "No doctors found", status: 404 })

        return res.json({ msg: "View Doctors...", data: doctors, status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Get Doctor's profile...
const viewDoctorsProfile = async (req, res) => {
    try {
        const id = req.params.id
        const DocData = await Users.findById(id)

        if (!DocData) return res.json({ msg: "No doctor found", status: 404 })

        return res.json({ msg: "View your Profile...", data: DocData, status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Book an appointment...
const bookAppointment = async (req, res) => {
    try {
        const { userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate } = req.body
        const appointment = await Appointment({ userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate })
        await appointment.save()
        return res.json({ msg: "Appointment Booked successfully", status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ msg: "Internal Server Error", status: 500 })
    }
}

// Fetch booked appointment...
const fetchMyAppointments = async (req, res) => {
    try {
        const id = req.headers.id
        const myappointments = await Appointment.find({ userId: id })
            .populate("doctorId")
            .populate("userId")
        res.json({ msg: "Your appointments...", data: myappointments, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Fetch all prescriptions...
const fetchMyPrescription = async (req, res) => {
    try {
        const userId = req.headers.id
        const prescriptions = await Prescription.find()
            .populate({ path: "appointmentId", populate: { path: "doctorId" } })

        const fetchedprescription = prescriptions.filter(check => check.appointmentId.userId == userId)
            .map(check => ({
                docname: check.appointmentId.doctorId.docname,
                patientName: check.appointmentId.patientName,
                prescription: check.prescription,
                mention: check.mention
            }))
        res.json({ msg: "Your Prescriptions...", data: fetchedprescription, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Fetch a single prescription ...
const fetchPrescriptionById = async (req, res) => {
    try {
        const id = req.headers.id
        const fetchedPrescription = await Prescription.findOne({ appointmentId: id })
            .populate("appointmentId")
        if (fetchedPrescription) {
            res.json({ msg: "Your prescription...", data: fetchedPrescription, status: 200 })
        } else {
            res.json({ msg: "No Prescription found", status: 400 })
        }
    } catch (err) {
        console.log(err)
    }
}


// View all feedbacks...
const viewFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find().populate("userId")
        res.json({ msg: "All Feedbacks...", data: allFeedbacks, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Submit a feedback...
const submitFeedback = async (req, res) => {
    try {
        const { userId, feedback, rating } = req.body
        const newFeedback = await Feedback({ userId, feedback, rating })
        await newFeedback.save()
        res.json({ msg: "Feedback submission successfull...", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Feeback Submisson error...", status: 400 })
    }
}


// Payment using RazorPay...
const Payment = async (req, res) => {
    try {
        const razorPay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        })

        const options = req.body
        const order = await razorPay.orders.create(options)

        if (!order) {
            return res.json({ msg: "Error", status: 500 })
        }
        res.json(order)

    } catch (err) {
        res.json(err)
    }
}


// Validate the payment...
const ValidatePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
        const digest = sha.digest("hex")
        if (digest !== razorpay_signature) {
            return res.json({ msg: "Transaction failed!", status: 400 })
        }
        res.json({ msg: "Transaction Successfull!", orderId: razorpay_order_id, paymentId: razorpay_payment_id, status: 200 })

    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


module.exports = {
    registerUser,
    userlogin,
    sendOTP,
    loginWithOTP,
    confirmOTP,
    PasswordReset,
    ContactDeveloper,
    viewLoggedUser,
    viewDoctors,
    viewDoctorsProfile,
    bookAppointment,
    fetchMyAppointments,
    fetchMyPrescription,
    fetchPrescriptionById,
    submitFeedback,
    viewFeedbacks,
    Payment,
    ValidatePayment
}