
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('Email config error', error);
    } else {
        console.log("Email Server Ready to take Message");
    }
});

module.exports = transporter