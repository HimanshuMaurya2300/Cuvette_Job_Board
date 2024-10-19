const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Company = require('../models/Company');
const router = express.Router();
const otpGenerator = require('otp-generator');
const sendMobileOtp = require('../utils/SendMobileOtp');
const auth = require('../middleware/auth');

// Registration Route
router.post('/register', async (req, res) => {

    const { name, phoneNo, companyName, companyEmail, employeeSize } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });

        if (company) {
            return res.status(400).json({ msg: 'Company already exists' });
        }

        const emailOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const mobileOtp = emailOtp;

        let newCompany = new Company({
            name,
            phoneNo,
            companyName,
            companyEmail,
            employeeSize,
            emailOtp,
            mobileOtp
        });

        await newCompany.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: companyEmail,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is ${emailOtp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });

        // send mobile otp
        await sendMobileOtp(phoneNo, mobileOtp);

        const payload = {
            companyId: newCompany.id,
            name: name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {

    const { name, companyName, companyEmail } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });

        if (!company) {
            return res.status(400).json({ msg: 'Company does not exist' });
        }

        if (companyName !== company.companyName) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            companyId: company.id,
            name: name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/verify-email', async (req, res) => {

    const { companyEmail, emailOTP } = req.body;

    try {
        const company = await Company.findOne({ companyEmail });

        if (!company) {
            return res.status(400).json({ msg: 'Company does not exist' });
        }

        if (emailOTP !== company.emailOtp) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        company.isEmailVerified = true;
        company.emailOtp = null;

        await company.save();

        return res.status(200).json({ msg: 'Email verified successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/verify-mobile', async (req, res) => {

    const { phoneNo, mobileOTP } = req.body;

    try {
        const company = await Company.findOne({ phoneNo });

        if (!company) {
            return res.status(400).json({ msg: 'Company does not exist' });
        }

        if (company.mobileOtp !== mobileOTP) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        company.isMobileVerified = true;
        company.mobileOtp = null;

        await company.save();

        res.status(200).json({ msg: 'Mobile verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
