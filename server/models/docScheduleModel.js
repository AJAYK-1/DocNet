const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slots: [
        {
            time: { type: String, required: true },
            isBooked: { type: Boolean, default: false }
        }
    ]
}, { timestamps: true });

doctorScheduleSchema.index({ doctorId: 1, date: 1 }, { unique: true })
module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);