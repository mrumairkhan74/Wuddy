const express = require('express')
// all routes files
const userRoutes = require('./UserRoutes')
const taskRoutes = require('./TaskRoutes')
const NotificationRoutes = require('./NotificationRoutes')
const { verifyAccessToken } = require('../middleware/verifyToken')




const router = express.Router()


router.use('/user', userRoutes)
router.use('/task', taskRoutes)
router.use('/notification', NotificationRoutes)



module.exports = router