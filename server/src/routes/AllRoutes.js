const express = require('express')
// all routes files
const userRoutes = require('./UserRoutes')
const taskRoutes = require('./TaskRoutes')
const NotificationRoutes = require('./NotificationRoutes')
const PostRoutes = require('./PostRoutes')
const ChatRoutes = require('./ChatRoutes')





const router = express.Router()


router.use('/user', userRoutes)
router.use('/task', taskRoutes)
router.use('/notification', NotificationRoutes)
router.use('/post', PostRoutes)
router.use('/chat', ChatRoutes)



module.exports = router