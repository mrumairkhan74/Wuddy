const express = require('express')

const { sendMessage, getMessage } = require('../controllers/MessageController')

const { verifyAccessToken } = require('../middleware/verifyToken')

const router = express.Router();


router.post('/send', verifyAccessToken, sendMessage)
router.get('/:chatId', verifyAccessToken, getMessage)

module.exports = router