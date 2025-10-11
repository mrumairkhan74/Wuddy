const express = require('express')


//chat controllers
const { createGroup, createOrGetMessage, addToGroup, removeFromGroup, renameGroup } = require('../controllers/ChatController')

// middle ware
const { verifyAccessToken } = require('../middleware/verifyToken')

const router = express.Router();


router.post('/createGroup', verifyAccessToken, createGroup)
router.post('/messages', verifyAccessToken, createOrGetMessage)
router.post('/addToGroup', verifyAccessToken, addToGroup)
router.put('/:chatId', verifyAccessToken, renameGroup)
router.delete('/:chatId/member/:memberId', verifyAccessToken, removeFromGroup)





module.exports = router