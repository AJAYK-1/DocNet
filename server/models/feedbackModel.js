const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_tbl' },
    feedback: { type: String, required: true },
    rating: { type: Number, default: 0 }
}, { timestamps: true });


const Feedback = mongoose.model('feedback_tbl', feedbackSchema);


module.exports = Feedback;