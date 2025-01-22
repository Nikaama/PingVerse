const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '200345305009@paruluniversity.ac.in',  // Your Gmail ID
        pass: 'imsz xyhq dpva uusw'  // Your generated app password
    }
});

const sendOTP = (email, otp) => {
    const mailOptions = {
        from: '200345305009@paruluniversity.ac.in',
        to: email,
        subject: 'Your OTP for Signup',
        text: `Your OTP for account signup is: ${otp}`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;