const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')


const DoctorRegister = async (req, res) => {
    try {
        const { docname, email, password } = req.body
        const ExistingDoctor = await Doctor.findOne({ email })
        if (ExistingDoctor) {
            res.json({ msg: "Account already exists...", status: 400 })
        } else {
            const DoctorData = await Doctor({
                docname, email, password
            })
            await DoctorData.save()
            res.json({ msg: "Registration Successfull...", status: 200 })
        }
    } catch (err) {
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


module.exports = { DoctorRegister, fetchAppointments }