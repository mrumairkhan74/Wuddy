const express = require('express')

// all controllers
const { createUser, loginUser, updateUser, getMe, logout, getUserById, getAll, newAccessToken } = require('../controllers/UserController')
const { verifyEmail } = require('../controllers/VerifyController')
const { verifyAccessToken, verifyRefreshToken } = require('../middleware/verifyToken')
const { uploadUserImages } = require('../config/Upload')



const router = express.Router();




router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/logout', verifyAccessToken, logout)
router.get('/me', verifyAccessToken, getMe)
router.get('/all', verifyAccessToken, getAll)
router.put('/:id/verify-email', verifyEmail)
router.put('/:id', uploadUserImages, verifyAccessToken, updateUser)

router.post('/refresh', verifyRefreshToken, newAccessToken)

router.get('/:id', verifyAccessToken, getUserById)

module.exports = router