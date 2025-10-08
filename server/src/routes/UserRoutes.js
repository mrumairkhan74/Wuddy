const express = require('express')

// all controllers
const { createUser, loginUser, updateUser, getMe, logout, getUserById, getAll } = require('../controllers/UserController')
const { verifyEmail } = require('../controllers/VerifyController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { uploadUserImages } = require('../config/Upload')



const router = express.Router();




router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/logout', verifyAccessToken, logout)
router.get('/me', verifyAccessToken, getMe)
router.get('/all', verifyAccessToken, getAll)
router.put('/:id/verify-email', verifyEmail)
router.put('/:id', uploadUserImages, verifyAccessToken, updateUser)


router.get('/:id', verifyAccessToken, getUserById)

module.exports = router