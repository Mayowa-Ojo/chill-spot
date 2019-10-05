const Comment = require('../models/comment')

/** get all comments */
exports.getComments = (req, res) => {
  Comment.findAll()
    .then(comments => {
      res.status(201).json(comments)
    })
    .catch(err => res.status(500).json({message: err.message}))
}

/** get single comment */
// ***** unavailable ****

/** create a comment */
exports.createComment = (req, res) => {
  const { comment: content } = req.body
  const newComment = {
    content
  }
  Comment.create(newComment)
    .then(comment => {
      res.status(201).json({ comment })
    })
    .catch(err => res.status(500).json({message: err.message}))
}

/** edit comment */
exports.editComment = (req, res) => {

}

/** delete comment */
exports.deleteComment = (req, res) => {

}