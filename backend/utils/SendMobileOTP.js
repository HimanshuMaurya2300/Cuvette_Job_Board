const fast2sms = require('fast-two-sms');
require('dotenv').config();

// Function to send OTP
const sendMobileOtp = async (phoneNo, mobileOtp) => {
    console.log('sending otp...');
    try {
        const response = await fast2sms.sendMessage({
            authorization: process.env.FAST2SMS_API_KEY,
            message: `Your OTP code is: ${mobileOtp}`,
            numbers: [phoneNo],
        });
        console.log(response);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

module.exports = sendMobileOtp;
