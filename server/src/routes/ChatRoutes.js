const express = require('express')


//chat controllers
const { createGroup, createOrGetMessage, addToGroup, removeFromGroup, renameGroup, getGroups, getChatsOfUser, getChatById } = require('../controllers/ChatController')

// messages

const { sendMessage, getMessage } = require('../controllers/MessageController')


// middle ware
const { verifyAccessToken } = require('../middleware/verifyToken')
const { upload } = require('../config/Upload')
const router = express.Router();


// all groups
router.get('/all', verifyAccessToken, getGroups)
router.get('/allChats', verifyAccessToken, getChatsOfUser)

// on logged in user can see groups if he is added in 
router.get('/:chatId', verifyAccessToken, getChatById)


// create groups
router.post('/create-group', upload.single("groupProfile"), verifyAccessToken, createGroup)

// create one-to-one chat messages
router.post('/messages', verifyAccessToken, createOrGetMessage)

// add member
router.put('/:chatId/add-member', verifyAccessToken, addToGroup)

// update group name
router.put('/:chatId/rename-group', verifyAccessToken, renameGroup)

// remove member
router.delete('/:chatId/remove-member/:memberId', verifyAccessToken, removeFromGroup)


// all messages

router.post('/send/:chatId', verifyAccessToken, sendMessage)
router.get('/messages/:chatId', verifyAccessToken, getMessage)


module.exports = router