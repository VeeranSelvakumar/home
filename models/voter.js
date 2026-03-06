const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    fullName: String,
    mobile: String,
    email: String,
    tamilName: String,
    fatherName: String,
    address: String,
    dob: String,
    gender: String,
    identityProofFront: String,
    identityProofBack: String,
    photo: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('voter', voterSchema);