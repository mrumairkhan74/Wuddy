const express = require('express')
// all routes files
const userRoutes = require('./UserRoutes')




const router = express.Router()


router.use('/user', userRoutes)


module.exports = router