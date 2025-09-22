const UserModel = require('../models/UserModel')
const generateUsername = require('../utils/GenerateUsername')
const hashedPassword = require('../utils/HashedPassword')
const bcrypt = require('bcrypt')
const { sendEmailVerificationCode } = require('./VerifyController')
const {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    ConflictError,
} = require('../middleware/errors/httpErrors');

const GenerateToken = require('../utils/GenerateToken');

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;

        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) throw new ConflictError("Email Conflict")

        if (!password || password.length < 8) {
            throw new BadRequestError("Invalid Password, Password must be at least 8 character, must have one uppercase letter one number and one special character")
        }
        const securePassword = await hashedPassword(password);
        const username = generateUsername(firstName);

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            dateOfBirth,
            username,
            gender,
            password: securePassword,
            isEmailVerified: false
        });

        const { AccessToken, RefreshToken } = GenerateToken({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`, // or just user.firstName if you prefer
            username: user.username,
            email: user.email,
            profileImg: user.profileImg // if you’re storing it
        });
        await sendEmailVerificationCode(user)

        user.refreshToken = RefreshToken
        await user.save();

        res.cookie('token', AccessToken)
        res.cookie('refreshToken', RefreshToken);

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                username: user.username,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
                message: `Verification code is sent to your ${user.email}`

            }
        })

    }
    catch (error) {
        next(error)
    }
}


// login user 
const loginUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ email }, { username }] })
        if (!user) throw new NotFoundError("Invalid User email or username")

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) throw new BadRequestError("Invalid Password")
        if (user.isEmailVerified === true) {
            const { AccessToken, RefreshToken } = GenerateToken({
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                profileImg: user.profileImg?.url,
                role: user.role,
                username: user.username
            })

            user.refreshToken = RefreshToken;
            await user.save();

            res.cookie('token', AccessToken);
            res.cookie('refreshToken', RefreshToken)

            return res.status(200).json({
                success: true,
                token: AccessToken,
                user: {
                    _id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    profileImg: user.profileImg?.url,
                    role: user.role,
                    username: user.username
                }
            })
        }

    }
    catch (error) {
        next(error)
    }
}



// const updateUSer

const updateUser = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const updateUser = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateUser, { new: true }).select('-password')
        if (!updatedUser) throw new NotFoundError("Invalid User")

        return res.status(200).json({
            success: true,
            updatedUser
        })
    } catch (error) {
        next(error)
    }

}

const user = async (req, res, next) => {
    try {

    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}