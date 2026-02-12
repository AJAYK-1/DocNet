const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')
const Prescription = require('../models/prescriptionModel')
const path = require('path')
const fs = require('fs')
const argon2 = require('argon2')
const { sendaMail } = require('../config/nodeMailer')
const { WelcomeMailDoctor } = require('../emails/welcomeDoctor')


// Registration for doctors...
const DoctorRegister = async (req, res) => {
    try {
        const { docname, email, password, address, license, qualification, specialization } = req.body
        const profileImage = req.file.filename
        const ExistingDoctor = await Doctor.findOne({ email })
        if (ExistingDoctor) {
            res.json({ msg: "Account already exists...", status: 400 })
        } else {
            const hashedPassword = await argon2.hash(password)
            const DoctorData = await Doctor({
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
            res.json({ msg: "Registration Successfull...", status: 200 })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Registration Error...", status: 404 })
    }
}


// Currently Logged in doctor...
const viewLoggedDoctor = async (req, res) => {
    try {
        const id = req.headers.id
        const LoggedinDoctor = await Doctor.findById(id)
        res.json({ msg: "Logged doctor...", data: LoggedinDoctor, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Error user not found...", status: 404 })
    }
}


// Changing the doctors schedule...
const changeAvalibility = async (req, res) => {
    try {
        const { id, schedule } = req.body
        const LoggedDoctor = await Doctor.findById(id)
        schedule.forEach(entry => {
            const existingEntryIndex = LoggedDoctor.schedule.findIndex(
                s => s.dates === entry.dates
            );
            if (existingEntryIndex !== -1) {
                // Entry exists — toggle the availability
                const currentAvailability = LoggedDoctor.schedule[existingEntryIndex].availability;
                LoggedDoctor.schedule[existingEntryIndex].availability =
                    currentAvailability === "Available" ? "Unavailable" : "Available";
            } else {
                // Entry doesn't exist — add it as new
                LoggedDoctor.schedule.push({
                    dates: entry.dates,
                    availability: "Unavailable"
                });
            }
        });
        await LoggedDoctor.save()
        res.json({ msg: "Availability status changed", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Error...", status: 404 })
    }
}


// Editing Doctor's Profile...
const doctorProfileEdit = async (req, res) => {
    try {
        const id = req.headers.id
        const { docname, license, qualification, specialization, address } = req.body
        const profileImage = req.file.filename
        const doctorsProfile = await Doctor.findById(id)
        doctorsProfile.docname = docname
        doctorsProfile.license = license
        doctorsProfile.qualification = qualification
        doctorsProfile.specialization = specialization
        doctorsProfile.address = address
        if (doctorsProfile.profileImage) {
            const oldPicPath = path.join(__dirname, '..', 'uploads', doctorsProfile.profileImage)
            fs.unlink(oldPicPath, (err) => {
                if (err) {
                    console.log("Error deleting old Profile Picture.")
                } else {
                    console.log("Old Profile Picture deleted successfully...")
                }
            })
        }
        doctorsProfile.profileImage = profileImage
        await doctorsProfile.save()
        res.json({ msg: "Profile edited successfully", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Error...", status: 404 })
    }
}


// Fetch the appointments...
const fetchAppointments = async (req, res) => {
    try {
        const id = req.headers.id
        const appointments = await Appointment.find({ doctorId: id })
            .populate("userId")
            .populate("doctorId")
        res.json({ msg: "Fetched Appointments successfully...", data: appointments, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// Give Prescriptions...
const addPrescription = async (req, res) => {
    try {
        const appointmentId = req.headers.id
        const { prescriptionsData, mention } = req.body;

        if (!Array.isArray(prescriptionsData)) {
            return res.json({ msg: "Request body should be an array.", status: 400 });
        }

        const prescriptionDoc = new Prescription({
            appointmentId,
            prescription: prescriptionsData,
            mention: mention
        });

        await Appointment.findByIdAndUpdate(appointmentId, {
            appointmentStatus: "Complete"
        });

        await prescriptionDoc.save();
        res.json({ msg: "Prescription added Successfully...", status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


// View Prescriptions...
const viewPrescription = async (req, res) => {
    try {
        const doctorId = req.headers.id
        const prescriptions = await Prescription.find()
            .populate({ path: "appointmentId", populate: { path: "userId" } })

        const fetchedprescription = prescriptions.filter(check => check.appointmentId?.doctorId == doctorId)
            .map(check => ({
                username: check.appointmentId.userId.username,
                patientName: check.appointmentId.patientName,
                prescription: check.prescription,
                mention: check.mention
            }))
        res.json({ msg: "Prescriptions fetched successfully...", data: fetchedprescription, status: 200 })
    } catch (err) {
        console.log(err)
        res.json({ msg: "An Error Occured...", status: 404 })
    }
}


module.exports = {
    DoctorRegister,
    viewLoggedDoctor,
    changeAvalibility,
    doctorProfileEdit,
    fetchAppointments,
    addPrescription,
    viewPrescription
}