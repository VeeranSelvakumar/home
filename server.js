const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const Voter = require("./models/voter");

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// File Storage Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST API
app.post("/submit-voter",
upload.fields([
    { name: "identityProofFront" },
    { name: "identityProofBack" },
    { name: "photo" }
]),
async (req, res) => {
    try {
        const newVoter = new Voter({
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            email: req.body.email,
            tamilName: req.body.tamilName,
            fatherName: req.body.fatherName,
            address: req.body.address,
            dob: req.body.dob,
            gender: req.body.gender,
            identityProofFront: req.files["identityProofFront"]?.[0]?.filename,
            identityProofBack: req.files["identityProofBack"]?.[0]?.filename,
            photo: req.files["photo"]?.[0]?.filename
        });

        await newVoter.save();
        res.status(200).json({ message: "Data Saved Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(5000, ()=> console.log("Server running on port 5000"));