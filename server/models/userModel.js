const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    userStatus: { type: String, default: "Active" }
}, { timestamps: true })

const User = mongoose.model("user_tbl", userSchema)

module.exports = User