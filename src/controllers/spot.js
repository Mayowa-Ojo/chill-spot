const Spot = require('../models/spot')

exports.getSpots = (req, res) => {
  const css = "/styles/spots/index.css"
  Spot.findAll()
    .then(spots => {
      // console.log(spots)
      res.render('./spots/index', {spots, css})
    })
    .catch(err => res.status(404).json({message: err.message}))
}

exports.getSpot = (req, res) => {
   const css = "/styles/spots/show.css"
   const { id } = req.params
   let error
   Spot.findByPk(id)
    .then(spot => {
      // console.log(spot.name)
      error = spot == null ? false : true
      res.render('./spots/show', {spot, css, error})
    })
    .catch(err => res.status(404).json({message: err.message}))
}

exports.newSpot = (req, res) => {
  const css = "/styles/spots/new.css"
  res.render('./spots/new', {css})
}

exports.createSpot = (req, res) => {
  Spot.create()
}

/*exports.viewSpots = (req, res) => {
  const { id } = req.params
  res.json(req.query)
  Spot.findAll({
    attributes: ['id', 'name', 'price_range'],
    where: { id }
  })
    .then(spots => res.json(spots))
    .catch(err => console.log(err.message))
}*/

module.exports = exports