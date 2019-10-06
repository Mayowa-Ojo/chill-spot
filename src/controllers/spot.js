const { Spot, Comment } = require('../config/sequelize/associations')
const { compare, getTimeframe } = require('../helpers')

exports.getSpots = (req, res) => {
  const css = "/styles/spots/index.css"
  Spot.findAll()
    .then(spots => {
      // console.log(spots)
      res.render('./spots/index', { spots, css })
    })
    .catch(err => res.status(404).json({message: err.message}))
}

exports.getSpot = (req, res) => {
  const css = "/styles/spots/show.css"
  const { id } = req.params
  let error
  Spot.findByPk(id, { include: [Comment]})
    .then(spot => {
    const timeFrame = getTimeframe(spot.createdAt)
    // console.log(spot.name)
    error = spot == null ? false : true
    res.render('./spots/show', { spot, css, error, timeFrame })
    // res.json(spot)
  })
    .catch(err => res.status(404).json({message: err.message}))
}

exports.newSpot = (req, res) => {
  const css = "/styles/spots/new.css"
  res.render('./spots/new', { css })
}

exports.createSpot = (req, res) => {
  const { name, location, description, price, image, category, spotId_fk } = req.body
  const newSpot = {
    name,
    location,
    description,
    price_range: price,
    image,
    category,
    spotId_fk
  }

  Spot.create(newSpot)
    .then(spot => {
      res.redirect('/spots')
      // res.json(spot)
    })
    .catch(err => res.status(500).json({message: err.message}))
}

exports.editSpotForm = (req, res) => {
  const css = "/styles/spots/new.css"
  const { id } = req.params
  Spot.findByPk(id)
    .then(spot => {
      res.render('./spots/edit', { spot, css })
    })
    .catch(err => res.status(500).json({message: err.message}))
}

exports.editSpot = (req, res) => {
  const { id } = req.params
  const { name, location, description, price, image, category } = req.body
  const updatedSpot = {
    name,
    location,
    description,
    price_range: price,
    image,
    category
  }

  Spot.findByPk(id)
    .then(spot => {
      // check which fields have chnaged using the compare helper fn
      const changes = compare(spot.dataValues, updatedSpot)
      // res.json({changes, spot, updatedSpot})
      spot.update(updatedSpot, { fields: changes })
        .then(updatedSpot => {
          res.redirect('/spots')
        })
        .catch(err => res.status(500).json({message: err.message}))
    })
    .catch(err => res.status(500).json({message: err.message}))
}

exports.deleteSpot = (req, res) => {
  const { id } = req.params
  Spot.findByPk(id)
    .then(spot => {
      spot.destroy()
      res.redirect('/spots')
    })
    .catch(err => res.status(500).json({message: err.message}))
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