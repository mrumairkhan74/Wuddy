const { verifyAccessToken } = require('../middleware/verifyToken');
const { createLike, unlikePost, getLikesByPost } = require('../controllers/LikeController');

const express = require('express');
const router = express.Router();

// Route to like a post
router.post('/:postId', verifyAccessToken, createLike);

// Route to unlike a post
router.post('/unlike/:postId', verifyAccessToken, unlikePost);

// Route to get likes for a specific post
router.get('/post/:postId/likes', getLikesByPost);

module.exports = router;    