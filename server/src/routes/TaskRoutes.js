const express = require('express')
// MiddleWare
const { verifyAccessToken } = require('../middleware/verifyToken')

// Controller

const { createTask,getTask } = require('../controllers/TaskController')

const router = express.Router()


router.post('/create', verifyAccessToken, createTask)
router.get('/', verifyAccessToken, getTask)



module.exports = router