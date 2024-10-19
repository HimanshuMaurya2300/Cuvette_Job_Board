const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    companyName: { type: String, required: true, unique: true },
    companyEmail: { type: String, required: true, unique: true },
    employeeSize: { type: String, required: true },
    emailOtp: { type: String },
    mobileOtp: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('Company', CompanySchema);
