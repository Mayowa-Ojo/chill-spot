const express = require('express')
// ******************************
const { getComments, getComment, createComment, editComment, deleteComment, likeComment } = require('../controllers/comment')
const router = express.Router()

/** comment routes */
router.get('/', getComments)

router.get('/:id', getComment)

router.post('/', createComment)

router.put('/:id/edit', editComment)

router.get('/:id/delete', deleteComment)

router.get('/:id/like', likeComment)

module.exports = router