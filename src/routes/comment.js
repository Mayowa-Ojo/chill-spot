const express = require('express')
// ******************************
const { getComments, createComment, editComment, deleteComment } = require('../controllers/comment')
const router = express.Router()

/** comment routes */
router.get('/', getComments)

router.post('/', createComment)

router.put('/:id/edit', editComment)

router.delete('/:id/delete', deleteComment)

module.exports = router