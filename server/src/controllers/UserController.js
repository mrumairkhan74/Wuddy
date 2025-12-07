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

const { uploadProfileImgToCloudinary, uploadCoverImgToCloudinary } = require('../utils/CloudinaryUpload')


const GenerateToken = require('../utils/GenerateToken');


// for clean user
const sanitizeUser = (user) => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profileImg: user.profileImg,
    };
};






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

        res.cookie("token", AccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true if on https
            sameSite: "None", // important for frontend <-> backend on different domains
            maxAge: 24 * 60 * 1000, // 24 minutes (or whatever your access token expiry is)
        });

        res.cookie("refreshToken", RefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success: true,
            token: AccessToken,
            user: sanitizeUser(user)
        })

    }
    catch (error) {
        next(error)
    }
}


// login user 
const loginUser = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ email: identifier }, { username: identifier }] })
        if (!user) throw new NotFoundError("Invalid User email or username")

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) throw new BadRequestError("Invalid Password")

        if (!user.isEmailVerified) {
            throw new BadRequestError("Email is not verified. Please verify your email first.");
        }

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

        res.cookie("token", AccessToken, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production", // true if on https
            sameSite: "lax", // important for frontend <-> backend on different domains
            //sameSite: "None", // important for frontend <-> backend on different domains

            maxAge: 24 * 60 * 1000, // 15 minutes (or whatever your access token expiry is)
        });

        res.cookie("refreshToken", RefreshToken, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            //sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success: true,
            token: AccessToken,
            user: sanitizeUser(user)
        })

    }
    catch (error) {
        next(error)
    }
}



// const updateUSer

const updateUser = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const update = { ...req.body };



        if (update.password) {
            update.password = await hashedPassword(update.password)
        }
        // Ensure files exist
        // if (!req.files || (!req.files.profileImg && !req.files.coverImg)) {
        //     throw new NotFoundError("Files not uploaded");
        // }

        // Upload profile image if provided
        if (req.files?.profileImg) {
            const cloudinaryResult = await uploadProfileImgToCloudinary(
                req.files.profileImg[0].buffer
            );
            update.profileImg = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id,
            };
        }

        // Upload cover image if provided
        if (req.files?.coverImg) {
            const cloudinaryResult1 = await uploadCoverImgToCloudinary(
                req.files.coverImg[0].buffer
            );
            update.coverImg = {
                url: cloudinaryResult1.secure_url,
                public_id: cloudinaryResult1.public_id,
            };
        }


        // update email
        if (update.email) {
            await sendEmailVerificationCode({ _id: userId, email: update.email })
            update.isEmailVerified = false
        }

        // Update user
        const user = await UserModel.findByIdAndUpdate(userId, update, {
            new: true,
        }).select("-password");

        if (!user) throw new NotFoundError("Invalid User");

        return res.status(200).json({
            success: true,
            message: update.email ? `Verification code send ${update.email}` : `Updated Successfully`,
            message: update.password ? `Password Update Successfully` : `Update password Failed`,
            user,
        });
    } catch (error) {
        next(error);
    }
};


const getMe = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const user = await UserModel.findById(userId).select("-password -refreshToken")
        if (!user) throw new NotFoundError("User Not Found")
        return res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        next(error)
    }
}

// userLogout
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            //sameSite: "None",
            sameSite: "lax",
            //secure: process.env.NODE_ENV === "production",
            path: "/", // must match login
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            //sameSite: "None",
            sameSite: "lax",
            //secure: process.env.NODE_ENV === "production",
            path: "/", // must match login
        });

        return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "Logout failed" });
    }
};

// getUserById
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select("-password")
        if (!user) throw new NotFoundError("Invalid User")
        return res.status(200).json({
            success: true,
            users: user
        })
    }
    catch (error) {
        next(error)
    }
}

// getAll User

const getAll = async (req, res, next) => {
    try {
        const user = await UserModel.find()
        if (!user) throw new NotFoundError("No user available")
        return res.status(200).json({
            success: true,
            users: user
        })
    } catch (error) {
        next(error)
    }
}


// new access token
const newAccessToken = async (req, res, next) => {
    try {
        const { userId } = req.user?._id;

        if (!userId) throw new NotFoundError("Invalid user")


        const { AccessToken } = GenerateToken({ _id: userId })
        res.cookie('token', AccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true if on https
            //sameSite: "None", // important for frontend <-> backend on different domains
            sameSite: "lax", // important for frontend <-> backend on different domains
            maxAge: 15 * 60 * 1000, // 24 minutes (or whatever your access token expiry is)
        })
        return res.status(200).json({ success: true })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getMe,
    logout,
    getUserById,
    getAll,
    newAccessToken
}
