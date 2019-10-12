const { Comment, User, Spot } = require('../config/sequelize/associations')

exports.getComment = function(req, res, next) {
  const { id } = req.params

  Comment.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'name', 'username', 'avatar']},
      { model: Spot, attributes: ['id', 'name']}
    ]
  })
  .then(comment => {
    if(!comment) {
      req.flash('error', 'comment not found')
      res.redirect('back')
    }
    // store found spot on response object and pass to callback
    res.locals.comment = comment
    // set req origin
    res.locals.origin = 'comment'
    next()
  })
  .catch(err => res.status(500).json({message: err.message}))
}

module.exports = exports