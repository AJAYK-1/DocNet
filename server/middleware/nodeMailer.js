const nodemailer = require("nodemailer");
require('dotenv').config()


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_KEY,
    },
});

// Wrap in an async IIFE so we can use await.
async function sendaMail(to, subject, text, html) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
        html,
    });
    console.log("Message sent:", info.messageId);
}


module.exports = { sendaMail }