const express = require('express')
const { getNotification, readNotification, readAllNotification } = require('../controllers/NotificationController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { notifyUser } = require('../utils/NotificationService')

const router = express.Router()

router.get('/all', verifyAccessToken, getNotification)
router.put('/:id/read', verifyAccessToken, readNotification)
router.patch('/read-all', verifyAccessToken, readAllNotification)

module.exports = router