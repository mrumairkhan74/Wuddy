const express = require('express')

const { createPost, getPosts, deletePost } = require('../controllers/PostController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { uploadPostMedia } = require('../config/Upload')

const router = express.Router()

router.get('/all', verifyAccessToken, getPosts)
router.post('/create', uploadPostMedia, verifyAccessToken, createPost)
router.delete('/:id', verifyAccessToken, deletePost)



module.exports = router