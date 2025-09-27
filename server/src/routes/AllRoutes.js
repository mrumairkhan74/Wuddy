const express = require('express')
// all routes files
const userRoutes = require('./UserRoutes')
const taskRoutes = require('./TaskRoutes')




const router = express.Router()


router.use('/user', userRoutes)
router.use('/task', taskRoutes)


module.exports = router