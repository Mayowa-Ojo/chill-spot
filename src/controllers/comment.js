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
  const comment = res.locals.comment
  res.json(comment)
}

/** create a comment
 *  query parameters: 'spot, user'
*/
exports.createComment = (req, res) => {
  const { spot: spotId_fk, user: userId_fk } = req.query
  const { comment: content } = req.body
  const newComment = {
    content,
    spotId_fk,
    userId_fk: userId_fk == 'anonymous' ? null : userId_fk
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
  const comment = res.locals.comment

  comment.update({ content}, { fields: ['content']})
    .then(updatedComment => {
      res.redirect('back')
    })
    .catch(err => res.status(500).json({message: err.message}))
  // res.redirect('back')
}

/** delete comment */
exports.deleteComment = (req, res) => {
  const comment = res.locals.comment
  comment.destroy()
    .then(() => res.redirect('back'))
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