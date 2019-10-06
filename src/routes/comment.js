const express = require('express')
// ******************************
const { getComments, getComment, createComment, editComment, deleteComment } = require('../controllers/comment')
const router = express.Router()

/** comment routes */
router.get('/', getComments)

router.get('/:id', getComment)

router.post('/', createComment)

router.put('/:id/edit', editComment)

router.delete('/:id/delete', deleteComment)

module.exports = router