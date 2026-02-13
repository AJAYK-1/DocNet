const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient', index: true },

    accountStatus: { type: String, enum: ['Active', 'Deactivated'], default: "Active" },
    otp: { type: Number },
    otpExpiry: { type: Date },

    address: {
        type: String,
        trim: true,
        required: function () {
            return this.role === 'doctor'
        }
    },
    license: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 30,
        required: function () {
            return this.role === 'doctor'
        }
    },
    qualification: {
        type: String,
        trim: true,
        required: function () {
            return this.role === 'doctor'
        }
    },
    specialization: {
        type: String,
        trim: true,
        required: function () {
            return this.role === 'doctor'
        }
    },
    profileImage: {
        type: String,
        required: function () {
            return this.role === 'doctor'
        }
    },
}, { timestamps: true })

newUser.index({ email: 1 }, { unique: true })

const UserModel = mongoose.model('Users', newUser)

module.exports = UserModel