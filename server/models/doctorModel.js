const mongoose = require('mongoose')


const doctorSchema = new mongoose.Schema({
    docname: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    license: { type: String },
    qualification: { type: String },
    specialization: { type: String },
    profileImage: { type: String },
    schedule: [
        {
            dates: { type: String },
            availability: { type: String, default: "Uavailable" }
        }
    ],
    accountStatus: { type: String, default: "Active" },
    otp: { type: Number },
    otpExpiry: { type: Date }
}, { timestamps: true })

const Doctor = mongoose.model("Doctor_tbl", doctorSchema)

module.exports = Doctor