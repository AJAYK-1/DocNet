const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_tbl' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor_tbl' },
    patientName: { type: String },
    patientAge: { type: String },
    patientGender: { type: String },
    patientSymptoms: { type: String },
    appointmentDate: {type: String }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment_tbl", appointmentSchema)

module.exports = Appointment