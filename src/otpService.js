const nodemailer = require('nodemailer');
const crypto = require('crypto');

// OTP generation logic
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  return otp;
};

// Email sending logic
const sendOTPEmail = (recipientEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

// Expose functions
module.exports = {
  generateOTP,
  sendOTPEmail,
};