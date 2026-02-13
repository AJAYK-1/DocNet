const mongoose = require("mongoose");
require('dotenv').config()

// OLD MODELS
const OldUser = require("./models/userModel");      // user_tbl
const OldDoctor = require("./models/doctorModel");  // Doctor_tbl

// NEW MODEL
const User = require("./models/usersModel"); // Users

async function migrateUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // 🔹 1. Migrate Patients
    const oldUsers = await OldUser.find();

    for (let user of oldUsers) {
      await User.create({
        name: user.username,
        email: user.email,
        password: user.password,
        role: "patient",
        accountStatus: user.accountStatus,
        otp: user.otp,
        otpExpiry: user.otpExpiry
      });
    }

    console.log("Patients migrated");

    // 🔹 2. Migrate Doctors
    const oldDoctors = await OldDoctor.find();

    for (let doc of oldDoctors) {
      await User.create({
        name: doc.docname,
        email: doc.email,
        password: doc.password,
        role: "doctor",
        accountStatus: doc.accountStatus,
        otp: doc.otp,
        otpExpiry: doc.otpExpiry,
        address: doc.address,
        license: doc.license,
        qualification: doc.qualification,
        specialization: doc.specialization,
        profileImage: doc.profileImage
      });
    }

    console.log("Doctors migrated");

    console.log("User migration completed ✅");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateUsers();
