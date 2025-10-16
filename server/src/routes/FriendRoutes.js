const express = require('express')
const router = express.Router()
const { sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriendsList,
    getFriendRequests } = require('../controllers/FriendsController')
const { verifyAccessToken } = require('../middleware/verifyToken')


router.post('/send-request/:id', verifyAccessToken, sendFriendRequest)
router.post('/accept-request/:id', verifyAccessToken, acceptFriendRequest)
router.delete('/remove-friend/:id', verifyAccessToken, removeFriend)
router.delete('/reject-request/:id', verifyAccessToken, rejectFriendRequest)
router.get('/', verifyAccessToken, getFriendsList)

router.get('/friend-requests', verifyAccessToken, getFriendRequests);


module.exports = router