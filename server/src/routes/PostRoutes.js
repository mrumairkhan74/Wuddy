const express = require('express')

const { createPost, getPosts, deletePost, updatePost, myPosts } = require('../controllers/PostController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { uploadPostMedia } = require('../config/Upload')

const router = express.Router()

router.get('/all', verifyAccessToken, getPosts)
router.get('/myPosts', verifyAccessToken, myPosts)
router.post('/create', uploadPostMedia, verifyAccessToken, createPost)
router.delete('/:id', verifyAccessToken, deletePost)
router.put('/:id', verifyAccessToken, updatePost)



module.exports = router