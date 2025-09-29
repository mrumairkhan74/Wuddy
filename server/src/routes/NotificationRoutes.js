const express = require('express')
const { getNotification, readNotification } = require('../controllers/NotificationModel')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { notifyUser } = require('../utils/NotificationService')

const router = express.Router()

router.get('/all', verifyAccessToken, getNotification)
router.put('/:id/read', verifyAccessToken, readNotification)
router.post("/test", verifyAccessToken, async (req, res) => {
    try {
        const { receiver, message, type } = req.body;
        const sender = req.user._id; // logged-in user as sender
        const notification = await notifyUser(sender, receiver, type, message);

        res.json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router