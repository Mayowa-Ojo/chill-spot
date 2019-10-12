const express = require('express')
// ******************************
const { getComments, getComment, createComment, editComment, deleteComment, likeComment } = require('../controllers/comment')
const { getComment: getCommentMiddleware } = require('../middlewares/comment')
const { authorizeUser } = require('../middlewares/auth')

const router = express.Router()

/** comment routes */
router.get('/', getComments)

router.get('/:id', getCommentMiddleware, getComment)

router.post('/', createComment)

router.put('/:id/edit', getCommentMiddleware, authorizeUser, editComment)

router.get('/:id/delete', getCommentMiddleware, authorizeUser, deleteComment)

router.get('/:id/like', likeComment)

module.exports = router