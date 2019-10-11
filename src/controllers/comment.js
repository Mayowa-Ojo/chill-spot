const { Comment, Spot, User } = require('../config/sequelize/associations')

/** get all comments */
exports.getComments = (req, res) => {
  Comment.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'username', 'avatar']},
      { model: Spot, attributes: ['id', 'name']}
    ]
  })
  .then(comments => {
    res.status(201).json(comments)
  })
  .catch(err => res.status(500).json({message: err.message}))
}

/** get single comment */
// ***** unavailable ****
exports.getComment = (req, res) => {
  Comment.findByPk(req.params.id, { include: [Spot, User] })
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({message: err.message}))
}

/** create a comment
 *  query parameter: 'key'
*/
exports.createComment = (req, res) => {
  const { spot: spotId_fk, user: userId_fk } = req.query
  const { comment: content } = req.body
  const newComment = {
    content,
    spotId_fk,
    userId_fk
  }
  Comment.create(newComment)
    .then(comment => {
      // res.status(201).json({ comment })
      res.redirect(`/spots/${spotId_fk}`)
    })
    .catch(err => res.status(500).json({message: err.message}))
}

/** edit comment */
exports.editComment = (req, res) => {
  const { comment: content } = req.body
  const { id } = req.params
  Comment.findByPk(id)
    .then(comment => {
      comment.update({ content}, { fields: ['content']})
        .then(updatedComment => {
          res.redirect('back')
        })
        .catch(err => res.status(500).json({message: err.message}))
    })
    .catch(err => res.status(404).json({message: err.message}))
  // res.redirect('back')
}

/** delete comment */
exports.deleteComment = (req, res) => {
  const { id } = req.params
  Comment.findByPk(id)
    .then(comment => {
      comment.destroy()
      res.redirect('back')
    })
    .catch(err => res.status(500).json({message: err.message}))
}

/** like comment */
exports.likeComment = (req, res) => {
  const { id } = req.params
  Comment.findByPk(id)
    .then(comment => {
      comment.increment('likes', { by: 1})
      res.redirect('back')
    })
    .catch(err => res.status(500).json({message: err.message}))
}