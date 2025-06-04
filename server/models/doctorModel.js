const mongoose = require('mongoose')


const doctorSchema = new mongoose.Schema({
    docname: { type: String },
    email: { type: String },
    password: { type: String },
    profileImage: { type:String}
}, { timestamps: true })

const Doctor = mongoose.model("Doctor_tbl", doctorSchema)

module.exports = Doctor