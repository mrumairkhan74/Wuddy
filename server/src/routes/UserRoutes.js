const express = require('express')

// all controllers
const { createUser } = require('../controllers/UserController')
const { verifyEmail } = require('../controllers/VerifyController')
const { verifyAccessToken } = require('../middleware/verifyToken')

const router = express.Router()

router.post('/create', createUser)
router.put('/:id/verify-email', verifyEmail)



module.exports = router