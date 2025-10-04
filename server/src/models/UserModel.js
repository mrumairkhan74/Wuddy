const mongoose = require('mongoose')
const db = require('../config/db')




const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    username: {
        type: String,
        minlength: 8,
        maxlength: 20,
        trim: true,
        lowercase: true,
        match: /^[a-z0-9_@\-.*&#@$!]+$/i,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.-^&*]).{8,}$/
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male',
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    phoneNo: {
        type: Number,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry: {
        type: Date
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String
    },
    profileImg: {
        url: String,
        public_id: String
    },
    coverImg: {
        url: String,
        public_id: String
    },
    intro:{
        type:String
    },
    education:{
        type:String
    },
    status:{
        type:String,
        enum:['single','married','engaged'],
        default:'single'
    },
    
    // all this user created Details
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ]

}, { timestamps: true })

userSchema.index({ email: 1, username: 1 })


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel