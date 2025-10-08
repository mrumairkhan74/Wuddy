const express = require('express')

const { createPost, getPosts, deletePost, updatePost, myPosts, getPostByUserId } = require('../controllers/PostController')
const { verifyAccessToken } = require('../middleware/verifyToken')
const { uploadPostMedia } = require('../config/Upload')

const router = express.Router()

router.get('/all', verifyAccessToken, getPosts)
router.get('/myPosts', verifyAccessToken, myPosts)
router.get('/user/:id', verifyAccessToken, getPostByUserId)
router.post('/create', uploadPostMedia, verifyAccessToken, createPost)
router.delete('/:id', verifyAccessToken, deletePost)
router.put('/:id', verifyAccessToken, updatePost)



module.exports = router