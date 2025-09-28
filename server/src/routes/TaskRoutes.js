const express = require('express')
// MiddleWare
const { verifyAccessToken } = require('../middleware/verifyToken')

// Controller
const { createTask, getTask, deleteTask } = require('../controllers/TaskController')

const router = express.Router()


router.post('/create', verifyAccessToken, createTask)
router.get('/myTask', verifyAccessToken, getTask)
router.delete('/:id', verifyAccessToken, deleteTask)



module.exports = router