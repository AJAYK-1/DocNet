const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    patientAge: {
        type: Number,
        min: 0
    },
    patientGender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    patientSymptoms: {
        type: String,
        trim: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    appointmentStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    }
}, { timestamps: true })

appointmentSchema.index({ doctorId: 1, appointmentDate: 1, appointmentTime: 1 }, { unique: true })

module.exports = mongoose.model("Appointments", appointmentSchema)