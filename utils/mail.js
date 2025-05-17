const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '200345305009@paruluniversity.ac.in',  // Your Gmail ID
        pass: 'vjsw mxoa weho kdhz'  // Your generated app password
    }
});

const sendOTP = (email, otp) => {
    const mailOptions = {
        from: '200345305009@paruluniversity.ac.in',
        to: email,
        subject: 'Your OTP for Signup',
        html: `
            <div style="font-family: 'Arial', sans-serif; color: #fff; position: relative; text-align: center; min-height: 100vh; overflow: hidden; background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045); animation: gradientBackground 10s ease infinite;">
                <style>
                    @keyframes gradientBackground {
                        0% { background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045); }
                        50% { background: linear-gradient(135deg, #FCB045, #FD1D1D, #833AB4); }
                        100% { background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045); }
                    }
                </style>
                <div style="position: relative; z-index: 1; background: rgba(0, 0, 0, 0.7); padding: 30px; border-radius: 15px; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); display: inline-block; margin-top: 20vh; max-width: 90%; width: 400px;">
                    <h2 style="color: #FCB045; font-size: 1.8em; margin-bottom: 10px;">Your OTP for Account Signup</h2>
                    <p style="font-size: 1em; line-height: 1.5; margin-bottom: 20px; color: #fff;">
                        Thank you for signing up! Use the OTP below to complete your account creation:
                    </p>
                    <div style="background: rgba(255, 255, 255, 0.1); border: 2px dashed #FCB045; padding: 15px; border-radius: 10px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center;">
                        <p style="font-size: 2em; font-weight: bold; color: #FCB045; margin: 0;">${otp}</p>
                    </div>
                    <p style="font-size: 0.9em; color: #ccc;">If you did not request this, please ignore this email.</p>
                    <br>
                    <p style="font-size: 1em; color: #fff;">Best regards,<br><strong>Team Ping-Verse</strong></p>
                    <div style="margin-top: 20px;">
                        <a href="https://www.facebook.com" style="margin: 0 10px; text-decoration: none;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style="width: 30px; height: 30px;">
                        </a>
                        <a href="https://www.twitter.com" style="margin: 0 10px; text-decoration: none;">
                            <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg" alt="Twitter" style="width: 30px; height: 30px;">
                        </a>
                        <a href="https://www.instagram.com" style="margin: 0 10px; text-decoration: none;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style="width: 30px; height: 30px;">
                        </a>
                    </div>
                </div>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
