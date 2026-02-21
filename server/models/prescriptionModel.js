const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointments", required: true },
    prescription: [
        {
            medicine: { type: String, required: true, trim: true },
            quantity: { type: String, required: true, trim: true },
            dosage: { type: String, required: true, trim: true },
        }
    ],
    mention: { type: String, trim: true }
}, { timestamps: true })

prescriptionSchema.index({ appointmentId: 1 }, { unique: true })

const Prescription = mongoose.model("Prescriptions", prescriptionSchema)

module.exports = Prescription