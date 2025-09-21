const jwt = require('jsonwebtoken');

const accessSecret = process.env.JWT_ACCESS_TOKEN
const accessExpiry = process.env.JWT_ACCESS_EXPIRY


const refreshSecret = process.env.JWT_REFRESH_TOKEN
const refreshExpiry = process.env.JWT_REFRESH_EXPIRY

const GenerateToken = ({ _id, name, username, email, profileImg }) => {
    if (!_id || !email || !username) {
        throw new Error("Missing Field Required")
    }

    const payload = {
        _id,
        name,
        username,
        email,
        profileImg: {
            public_id: profileImg?.public_id || "",
            url: profileImg?.url
        }
    }

    const AccessToken = jwt.sign(payload, accessSecret, { expiresIn: accessExpiry })

    const refreshPayload = {
        _id,
        username,
        email,
    }

    const RefreshToken = jwt.sign(refreshPayload, refreshSecret, { expiresIn: refreshExpiry })


    return { RefreshToken, AccessToken }
}

module.exports = GenerateToken 