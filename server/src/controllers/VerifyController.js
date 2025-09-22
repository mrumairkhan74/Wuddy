const UserModel = require('../models/UserModel')
const redis = require('../config/redis');
const transporter = require('../utils/sendEmail')
const { generateResetToken, generateCode } = require('../utils/GenerateCode')
const redisKeys = require('../utils/redisKey');




// send verification code
const sendEmailVerificationCode = async (req, res) => {
    try {
        const userId = req.user?._id;
        const code = generateCode();

        await redis.setEx(redisKeys.emailVerify(userId), 600, code);
        await transporter.sendMail({
            from: `"Wuddy" <${process.env.EMAIL_USER}>`,
            to: req.user?.email,
            subject: "Verify Your Wuddy Account",
            text: `Your verification code is: ${code}`
        });
        res.json({ message: "Email verification code sent Successfully" })
    } catch (error) {
        console.error(err);

    }
}


// verify email 
const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user?._id
        const storedCode = await redis.get(redisKeys.emailVerify(userId));
        if (!storedCode || storedCode !== code) {
            return res.status(400).json({ error: "Invalid or Expired Token" })
        }
        await UserModel.findByIdAndUpdate(userId,
            { isEmailVerified: true }
        );
        await redis.del(redisKeys.emailVerify(userId));

        res.json({ message: 'Email verified Successfully' });


    } catch (err) {
        console.error(err);

    }
}


// send verification code for phoneNo
const sendPhoneVerification = async (req, res) => {
    try {
        const userId = req.user?._id;
        const code = generateCode();

        await redis.setEx(redisKeys.phoneNoVerify(userId), 600, code);
        console.log(`send SMS to ${req.user.phoneNo}:Your code is ${code}`)
        res.json({ message: "Phone verification code sent successfully" })
    }
    catch (error) {
        console.error(error);

    }
}

// verify phone number

const verifyPhoneNo = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user?._id;

        const storedCode = await redis.get(redisKeys.phoneNoVerify(userId));
        if (!storedCode || storedCode !== code) {
            return res.status(400).json({ error: "Invalid or expire Code" })
        }
        await UserModel.findByIdAndUpdate(userId,
            {
                isPhoneVerified: true
            }
        )
        await redis.del(redisKeys.phoneNoVerify(userId))
        res.json({ mesage: "Phone Verified Successfully" })
    }
    catch (error) {
        console.error(error);

    }
}


module.exports = {
    sendEmailVerificationCode,
    verifyEmail,
    sendPhoneVerification,
    verifyPhoneNo,
}