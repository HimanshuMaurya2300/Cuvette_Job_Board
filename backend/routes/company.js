const express = require('express');
const Company = require('../models/Company');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/checkVerification', auth, async (req, res) => {
    const companyId = req.companyId;
    try {
        const company = await Company.find({ _id: companyId });
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/:companyEmail', async (req, res) => {
    const { companyEmail } = req.params;
    const company = await Company.findOne({ companyEmail });
    res.json(company);
});


module.exports = router;