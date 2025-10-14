const express = require('express')


//chat controllers
const { createGroup, createOrGetMessage, addToGroup, removeFromGroup, renameGroup, getGroups, getGroupsByUser } = require('../controllers/ChatController')

// middle ware
const { verifyAccessToken } = require('../middleware/verifyToken')
const { upload } = require('../config/Upload')
const router = express.Router();


// all groups
router.get('/all', verifyAccessToken, getGroups)

// on logged in user can see groups if he is added in 
router.get('/allByUser', verifyAccessToken, getGroupsByUser)

// create groups
router.post('/create-group', upload.single("groupProfile"), verifyAccessToken, createGroup)

// create one-to-one chat messages
router.post('/messages', verifyAccessToken, createOrGetMessage)

// add member
router.post('/:chatId/add-member', verifyAccessToken, addToGroup)

// update group name
router.put('/:chatId/rename', verifyAccessToken, renameGroup)

// remove member
router.delete('/:chatId/remove/:memberId', verifyAccessToken, removeFromGroup)





module.exports = router