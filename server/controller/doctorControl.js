const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const path = require('path')


const DoctorRegister = async (req, res) => {
    try {
        const { docname, email, password, address, license, qualification, specialization } = req.body
        console.log(req.file)
        console.log(req.body)
        const profileImage = req.file.filename
        const ExistingDoctor = await Doctor.findOne({ email })
        if (ExistingDoctor) {
            res.json({ msg: "Account already exists...", status: 400 })
        } else {
            const DoctorData = await Doctor({
                docname,
                email,
                password,
                address,
                license,
                qualification,
                specialization,
                profileImage
            })
            await DoctorData.save()
            res.json({ msg: "Registration Successfull...", status: 200 })
        }
    } catch (err) {
        console.log(err)
    }
}


const viewLoggedDoctor = async (req, res) => {
    try {
        const id = req.headers.id
        const LoggedinDoctor = await Doctor.findById(id)
        console.log(LoggedinDoctor)
        res.json(LoggedinDoctor)
    } catch (err) {
        console.log(err)
    }
}


const changeAvalibility = async(req,res) => {
    try {
        const {id,statusChange} = req.body
        console.log(statusChange)
        const LoggedDoctor = await Doctor.findById(id)
        console.log(LoggedDoctor)
        LoggedDoctor.availability = statusChange
        await LoggedDoctor.save()
        res.json({msg: "Availability status changed", status : 200})
    } catch(err) {
        console.log(err)
    }
}


const fetchAppointments = async (req, res) => {
    try {
        const id = req.headers.id
        const appointments = await Appointment.find({ doctorId: id })
            .populate("userId")
            .populate("doctorId")
        console.log(appointments)
        res.json(appointments)
    } catch (err) {
        console.log(err)
    }
}


const addPrescription = async (req, res) => {
    try {
        console.log(req.body)
        const appointmentId = req.headers.id
        console.log(appointmentId)
        const prescriptionsData = req.body;

        if (!Array.isArray(prescriptionsData)) {
            return res.json({ msg: "Request body should be an array.", status: 400 });
        }

        const prescriptionDoc = new Prescription({
            appointmentId,
            prescription: prescriptionsData
        });

        await prescriptionDoc.save();
        res.json({ msg: "Prescription added Successfully...", status: 200 })
    } catch (err) {
        console.log(err)
    }
}


const viewPrescription = async (req, res) => {
    try {
        const doctorId = req.headers.id
        const prescriptions = await Prescription.find()
            .populate({ path: "appointmentId", populate: { path: "userId" } })

        const fetchedprescription = prescriptions.filter(check => check.appointmentId.doctorId == doctorId)
            .map(check => ({
                username: check.appointmentId.userId.username,
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
    DoctorRegister,
    viewLoggedDoctor,
    changeAvalibility,
    fetchAppointments,
    addPrescription,
    viewPrescription
}