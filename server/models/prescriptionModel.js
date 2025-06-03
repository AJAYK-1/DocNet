const mongoose = require('mongoose')


const prescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user_tbl" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor_tbl" },
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