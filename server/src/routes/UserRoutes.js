const express = require('express')

// all controllers
const { createUser, loginUser,updateUser } = require('../controllers/UserController')
const { verifyEmail } = require('../controllers/VerifyController')
const { verifyAccessToken } = require('../middleware/verifyToken')

const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.put('/:id/verify-email', verifyEmail)
router.put('/:id/', verifyAccessToken, updateUser)



module.exports = router