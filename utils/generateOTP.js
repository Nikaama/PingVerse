// Utility to generate a random 6-digit OTP
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);  // 6-digit OTP
    return otp.toString();
};

module.exports = generateOTP;