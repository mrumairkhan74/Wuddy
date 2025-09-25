const express = require('express')

// all controllers
const { createUser, loginUser, updateUser, getMe, logout } = require('../controllers/UserController')
const { verifyEmail } = require('../controllers/VerifyController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const uploadUserImages = require('../config/Upload')



const router = express.Router();




router.get('/me', verifyAccessToken, getMe)
router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/logout', verifyAccessToken, logout)
router.put('/:id/verify-email', verifyEmail)
router.put('/:id', uploadUserImages, verifyAccessToken, updateUser)



module.exports = router