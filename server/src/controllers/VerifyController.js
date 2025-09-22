const UserModel = require('../models/UserModel')
const client = require('../config/redis');
const transporter = require('../utils/sendEmail')
const { generateResetToken, generateCode } = require('../utils/GenerateCode')
const redisKeys = require('../utils/redisKey');




// send verification code
const sendEmailVerificationCode = async (user) => {
    try {
        if (!user?._id || !user?.email) {
            throw new Error("User object must include id or email")
        }
        const code = generateCode(6);

        await client.setEx(redisKeys.emailVerify(user._id), 600, String(code));
        transporter.sendMail({
            from: `"Wuddy" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Verify Your Wuddy Account",
            html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <img src="" 
           alt="Wuddy Logo" 
           style="width: 80px; margin-bottom: 20px; border-radius: 50%;" />
      <h2>Welcome to Wuddy</h2>
      <p>Your verification code is:</p>
      <div style="font-size: 24px; font-weight: bold; background: #206059; color: white; padding: 12px 20px; display: inline-block; border-radius: 8px;">
        ${code}
      </div>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `

        });
    } catch (error) {
        console.error("Server Error", error);

    }
}


// verify email 
const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.params.id; // from URL

        const storedCode = await client.get(redisKeys.emailVerify(userId));
        if (!storedCode || storedCode !== code) {
            return res.status(400).json({ error: "Invalid or Expired Code" });
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { isEmailVerified: true },
            { new: true } // return updated user
        );

        await client.del(redisKeys.emailVerify(userId));

        res.json({
            message: "Email verified successfully ✅",
            user: {
                _id: user._id,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// send verification code for phoneNo
const sendPhoneVerification = async (req, res) => {
    try {
        const userId = req.user?._id;
        const code = generateCode(6);

        await client.setEx(redisKeys.phoneNoVerify(userId), 600, code);
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

        const storedCode = await client.get(redisKeys.phoneNoVerify(userId));
        if (!storedCode || storedCode !== code) {
            return res.status(400).json({ error: "Invalid or expire Code" })
        }
        await UserModel.findByIdAndUpdate(userId,
            {
                isPhoneVerified: true
            }
        )
        await client.del(redisKeys.phoneNoVerify(userId))
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