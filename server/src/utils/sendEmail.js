
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
        user: process.env.SENDGRID_API_USER,
        pass: process.env.SENDGRID_API_SECRET
    },
    logger: true,
    debug: true
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('Email config error', error);
    } else {
        console.log("Email Server Ready to take Message",success);
    }
});

console.log({
    user: process.env.SENDGRID_API_USER,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
})

module.exports = transporter