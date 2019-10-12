const { Spot, User } = require('../config/sequelize/associations')

exports.getSpot = function(req, res, next) {
  const { id } = req.params
  Spot.findByPk(id, {
    include: [{ model: User, attributes: ['id']}]
  })
  .then(spot => {
    if(!spot) {
      req.flash('error', 'spot not found')
      res.redirect('back')
    }
    // store found spot on response object and pass to callback
    res.locals.spot = spot
    next()
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
}

module.exports = exports