const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const Feedback = require('../models/feedbackModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const { sendaMail } = require('../middleware/nodeMailer')


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const ExistingUser = await User.findOne({ email })
        if (ExistingUser) {
            res.json({ msg: "Regisration failed... User already exist...", status: 400 })
        }
        else {
            const userdata = await User({
                username,
                email,
                password
            })
            await userdata.save()
            res.json({ msg: "Data Registered Successfully...", status: 200 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Registration Error...", status: 404 })
    }
}


const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            res.json({ msg: "Logging in as Admin...", status: 202, token: token })
        } else {


            let ValidUser = await User.findOne({ email })
            let userType = 'user'

            if (!ValidUser) {
                ValidUser = await Doctor.findOne({ email })
                userType = 'doctor'
            }
            if (!ValidUser) {
                res.json({ msg: "User not found", status: 400 })
            } else {
                if (userType == 'user') {
                    if (ValidUser.password == password) {
                        if (ValidUser.userStatus != 'Active') {
                            res.json({ msg: "Your account is deactivated.", status: 400 })
                        } else {
                            const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                            res.json({ msg: "Login successfull...", status: 200, token: token })
                        }
                    } else {
                        res.json({ msg: "Incorrect Email or Password...", status: 400 })
                    }
                }
                if (userType = 'doctor') {
                    if (ValidUser.password = password) {
                        if (ValidUser.doctorStatus != 'Active') {
                            res.json({ msg: "Your account has been deactivated.", status: 400 })
                        } else {
                            const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                            res.json({ msg: "Login successfull...", status: 201, token: token })
                        }
                    } else {
                        res.json({ msg: "Incorrect Email or Password...", status: 400 })
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "User Not Found...", status: 400 })
    }
}


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()


const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        let userExist = await User.findOne({ email })
        if (!userExist) {
            userExist = await Doctor.findOne({ email })
        }
        if (!userExist) {
            res.json({ msg: "Incorrect Email address...", status: 400 })
        } else {
            loginotp = generateOTP()
            expiry = Date.now() + 5 * 60 * 1000
            sendaMail(email, "OTP to Login to DocNet", `Your OTP for login is ${loginotp}. It is valid for only 5 minutes.`, "")
            userExist.otp = loginotp
            userExist.otpExpiry = expiry
            await userExist.save()
            res.json({ msg: "OTP send to your Email address...", status: 200 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "User not found...", status: 404 })
    }
}


const loginWithOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        let userExist = await User.findOne({ email })
        let userType = 'user'

        if (!userExist) {
            userExist = await Doctor.findOne({ email })
            userType = 'doctor'
        }
        if (!userExist) {
            res.json({ msg: "User not found", status: 400 })
        } else if (userExist.otpExpiry < Date.now()) {
            res.json({ msg: "OTP expired or invalid.", status: 400 })
        } else {
            if (userExist.otp == otp) {
                const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                if (userType == 'user') {
                    res.json({ msg: "Login successfull", status: 200, token: token })
                } else if (userType == 'doctor') {
                    res.json({ msg: "Login successfull...", status: 201, token: token })
                }
            } else {
                res.json({ msg: "Incorrect OTP", status: 400 })
            }
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "User not found...", status: 404 })
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
        const { userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate } = req.body
        const appointment = await Appointment({ userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate })
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
                prescription: check.prescription,
                mention: check.mention
            }))
        console.log(fetchedprescription)
        res.json(fetchedprescription)
    } catch (err) {
        console.log(err)
    }
}


const fetchPrescriptionById = async (req, res) => {
    try {
        const id = req.headers.id
        console.log(id)
        const fetchedPrescription = await Prescription.findOne({ appointmentId: id })
            .populate("appointmentId")
        if (fetchedPrescription) {
            res.json(fetchedPrescription)
        } else {
            res.json({ msg: "No Prescription found", status: 400 })
        }

    } catch (err) {
        console.log(err)
    }
}


const viewFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find().populate("userId")
        console.log(allFeedbacks)
        res.json(allFeedbacks)
    } catch (err) {
        console.log(err)
    }
}


const submitFeedback = async (req, res) => {
    try {
        const { userId, feedback, rating } = req.body
        console.log(userId)
        const newFeedback = await Feedback({ userId, feedback, rating })
        await newFeedback.save()
        res.json({ msg: "Feedback submission successfull...", status: 200 })
    } catch (err) {
        res.json({ msg: "Feeback Submisson error...", status: 400 })
    }
}


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
    }
}


module.exports = {
    registerUser,
    userlogin,
    sendOTP,
    loginWithOTP,
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