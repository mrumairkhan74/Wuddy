
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('Email config error', error);
    } else {
        console.log("Email Server Ready to take Message",success);
    }
});

module.exports = transporter