const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Interview');
const nodemailer = require('nodemailer');
const router = express.Router();

// Post a Job
router.post('/', auth, async (req, res) => {

    const { title, description, experienceLevel, endDate, candidates } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            experienceLevel,
            endDate,
            candidates,
            postedBy: req.companyId
        });

        await newJob.save();

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
            to: candidates,
            subject: 'Interview Invitation',
            text: `Hello, you have been invited to an interview on ${title}.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });

        res.status(201).json(newJob);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.companyId });
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Job deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
