const jwt = require('jsonwebtoken')

const accessSecret = process.env.JWT_ACCESS_TOKEN
const refreshSecret = process.env.JWT_REFRESH_TOKEN

const verifyAccessToken = (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ error: "No Token Provided" })
        }
        const decoded = jwt.verify(token, accessSecret)
        req.user = {
            _id: decoded._id,
            name: decoded.name,
            username: decoded.username,
            email: decoded.email,
            profileImg: decoded.profileImg
        }
        next()
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Expired Token" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid Token" })
        }
        console.error("Jwt verification error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
const verifyRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) {
            return res.status(401).json({ error: "Invalid Token" })
        }
        const decoded = jwt.verify(token, refreshSecret)
        req.user = {
            _id: decoded._id,
            name: decoded.name,
            username: decoded.username,
            email: decoded.email,
            profileImg: decoded.profileImg
        }
        next()
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Expired Token" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid Token" })
        }
        console.error("Jwt verification error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken }