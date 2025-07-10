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
const { WelcomeMailUser } = require('../emails/welcomeUser')
const { LoginOTP } = require('../emails/LoginOTP')
const { ResetPasswordOTP } = require('../emails/ResetPassword')
const argon2 = require('argon2')


// Registration for the user...
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const ExistingUser = await User.findOne({ email })
        if (ExistingUser) {
            res.json({ msg: "Regisration failed... User already exist...", status: 400 })
        }
        else {
            const hashedPassword = await argon2.hash(password)
            const userdata = await User({
                username,
                email,
                password: hashedPassword
            })
            const personalMail = await WelcomeMailUser(username)
            sendaMail(email, "🎉 Welcome to DocNet – Your Health, Simplified!", "", personalMail)
            await userdata.save()
            res.json({ msg: "Data Registered Successfully...", status: 200 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Registration Error...", status: 404 })
    }
}


// Common login using password for all type of users...
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
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
                    const checkPassword = await argon2.verify(ValidUser.password, password)
                    if (checkPassword) {
                        if (ValidUser.accountStatus != 'Active') {
                            res.json({ msg: "Your account has been deactivated.", status: 400 })
                        } else {
                            const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                            res.json({ msg: "Login successfull...", status: 200, token: token })
                        }
                    } else {
                        res.json({ msg: "Incorrect Email or Password...", status: 400 })
                    }
                }
                if (userType = 'doctor') {
                    const checkPassword = await argon2.verify(ValidUser.password, password)
                    if (checkPassword) {
                        if (ValidUser.accountStatus != 'Active') {
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


// OTP Generator function...
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()


// sends OTP via email...
const sendOTP = async (req, res) => {
    try {
        const { email, reqtype } = req.body
        let userExist = await User.findOne({ email })
        let userType = 'user'
        if (!userExist) {
            userExist = await Doctor.findOne({ email })
            userType = 'doctor'
        }
        if (!userExist) {
            res.json({ msg: "Incorrect Email address...", status: 400 })
        } else {
            newotp = generateOTP()
            expiry = Date.now() + 5 * 60 * 1000
            if (userType == 'user') {
                if (reqtype == 'Login') {
                    const LoginotpMail = LoginOTP(userExist.username, newotp)
                    sendaMail(email, "OTP to Login to DocNet", ``, LoginotpMail)
                    res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
                } else if (reqtype == 'Resetpassword') {
                    const ResetPasswordMail = ResetPasswordOTP(userExist.username, newotp)
                    sendaMail(email, "OTP to Reset Password", ``, ResetPasswordMail)
                    res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
                } else {
                    res.json({ msg: "Error Sending OTP...", status: 400 })
                }
            } else if (userType == 'doctor') {
                if (reqtype == 'Login') {
                    const LoginotpMail = LoginOTP(userExist.docname, newotp)
                    sendaMail(email, "OTP to Login to DocNet", ``, LoginotpMail)
                    res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
                } else if (reqtype == 'Resetpassword') {
                    const ResetPasswordMail = ResetPasswordOTP(userExist.docname, newotp)
                    sendaMail(email, "OTP to Reset Password", ``, ResetPasswordMail)
                    res.json({ msg: "OTP send to Mail. Please check your mail.", status: 200 })
                } else {
                    res.json({ msg: "Error Sending OTP...", status: 400 })
                }
            } else {
                res.json({ msg: "Invalid User...", status: 400 })
            }
            userExist.otp = newotp
            userExist.otpExpiry = expiry
            await userExist.save()
            res.json({ msg: "OTP send to your Email address...", status: 200 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "User not found...", status: 404 })
    }
}


// OTP confirmation...
const confirmOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        let thatUser = await User.findOne({ email })

        if (!thatUser) {
            thatUser = await Doctor.findOne({ email })
        }
        if (!thatUser) {
            res.json({ msg: "User not found...", status: 404 })
        } else if (thatUser.otp == otp) {
            res.json({ msg: "OTP Confirmed...", status: 200 })
        } else {
            res.json({ msg: "OTP Incorrect...", status: 404 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Common login using OTP for all types of users...
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
        } else if (userExist.accountStatus != 'Active') {
            res.json({ msg: "Your account has been deactivated.", status: 400 })
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


// Reset Password...
const PasswordReset = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body
        let findUser = await User.findOne({ email })
        if (!findUser) {
            findUser = await Doctor.findOne({ email })
        }
        if (newpassword === confirmpassword) {
            const hashedPassword = await argon2.hash(newpassword)
            findUser.password = hashedPassword
            await findUser.save()
            res.json({ msg: "Password Reset successfully...", status: 200 })
        } else {
            res.json({ msg: "Check the passwords again...", status: 400 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Contact the developer...
const ContactDeveloper = async (req, res) => {
    try {
        const { name, email, message } = req.body
        if (name && email && message) {
            sendaMail(process.env.EMAIL, `${name} contacted | DocNet`, `${message} \n contact ${email} `)
            res.json({ msg: "Mail send successfully...", status: 200 })
        } else {
            res.json({ msg: "Error sending mail. Please enter valid information...", status: 400 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Currently logged in user...
const viewLoggedUser = async (req, res) => {
    try {
        const id = req.headers.id
        const LoggedinUser = await User.findById(id)
        res.json({ msg: "Logged in...", data: LoggedinUser, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Display all doctors...
const viewDoctors = async (req, res) => {
    try {
        const Docs = await Doctor.find({})
        res.json({ msg: "View Doctors...", data: Docs, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Get Doctor's profile...
const viewDoctorsProfile = async (req, res) => {
    try {
        const id = req.params.id
        const DocData = await Doctor.findById(id)
        res.json({ msg: "View your Profile...", data: DocData, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Book an appointment...
const bookAppointment = async (req, res) => {
    try {
        const { userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate } = req.body
        const appointment = await Appointment({ userId, doctorId, patientName, patientAge, patientGender, patientSymptoms, appointmentDate })
        await appointment.save()
        res.json({ msg: "Appointment Booked successfully", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Booking failed", status: 400 })
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