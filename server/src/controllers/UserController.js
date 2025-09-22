const UserModel = require('../models/UserModel')
const generateUsername = require('../utils/GenerateUsername')
const hashedPassword = require('../utils/HashedPassword')
const { sendEmailVerificationCode } = require('./VerifyController')
const {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    ConflictError,
} = require('../middleware/error/httpErrors');


const createUser = async (req, res, next) => {
    try {
        const { name, email, password, dateOfBirth, gender } = req.body;

        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) throw new ConflictError("Email Conflict")

        if (!password || password.length < 8) {
            throw new BadRequestError("Invalid Password, Password must be at least 8 character, must have one uppercase letter one number and one special character")
        }
        const securePassword = await hashedPassword(password)
    }
    catch (error) {
        next(error)
    }
}