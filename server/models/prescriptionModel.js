const mongoose = require('mongoose')


const prescriptionSchema = new mongoose.Schema({
    appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointment_tbl"},
    prescription: [
        {
            medicine: { type: String },
            quantity: { type: String },
            dosage: { type: String }
        }
    ]
}, { timestamps: true })

const Prescription = mongoose.model("Prescription_tbl", prescriptionSchema)

module.exports = Prescription