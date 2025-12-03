const express = require('express')
// all routes files
const userRoutes = require('./UserRoutes')
const taskRoutes = require('./TaskRoutes')
const NotificationRoutes = require('./NotificationRoutes')
const PostRoutes = require('./PostRoutes')
const ChatRoutes = require('./ChatRoutes')

const FriendRoutes = require('./FriendRoutes')
const LikeRoutes = require('./LikeRoutes')




const router = express.Router()


router.use('/user', userRoutes)
router.use('/task', taskRoutes)
router.use('/notification', NotificationRoutes)
router.use('/post', PostRoutes)
router.use('/chat', ChatRoutes)

router.use('/friend', FriendRoutes)
router.use('/like', LikeRoutes)



module.exports = router