function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const crypto = require('crypto')

function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { generateCode, generateResetToken }