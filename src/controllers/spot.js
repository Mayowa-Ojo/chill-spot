const { Spot, Comment, User } = require('../config/sequelize/associations')
const helpers = require('../helpers')

const { compare, commentsLength, checkPlural, parseTimeFrame, displayFlashMessage, checkUser, displayUsername } = helpers

exports.getSpots = (req, res) => {
  const css = "/styles/spots/index.css"
  Spot.findAll({
    include: [
      { model: User, attributes: ['id', 'username', 'name', 'avatar']}
    ]
  })
  .then(spots => {
    // res.json(spots)
    res.render('./spots/index', { 
      spots,
      static: { css },
      helpers: {
        displayFlashMessage,
        checkUser
      }
    })
  })
  .catch(err => res.status(404).json({message: err.message}))
}

exports.getSpot = (req, res) => {
  const css = "/styles/spots/show.css"
  const script = "/scripts/index.js"
  const { id } = req.params
  let error

  Spot.findByPk(id, 
    { 
      include: [
        { 
          model: Comment,
          include: [ { model: User, attributes: ['id', 'username', 'name', 'avatar']}]
        },
        { model: User, attributes: ['id', 'username', 'name', 'avatar']}
      ]    
    })
    .then(spot => {
      error = spot == null ? false : true
      // res.json(spot)
      res.render('./spots/show', { 
        spot, 
        static: { css, script }, 
        error,
        helpers: {
          length: commentsLength,
          isPlural: checkPlural,
          parseTimeFrame,
          checkUser,
          displayUsername
        },
        currentUser: req.isAuthenticated() ? req.user.id : 'anonymous'
      })
    })
    .catch(err => res.status(404).json({message: err.message}))
}

exports.newSpot = (req, res) => {
  const css = "/styles/spots/new.css"
  res.render('./spots/new', { 
    static: { css },
    helpers: {
      checkUser
    },
    userId: req.user.id
  })
}

exports.createSpot = (req, res) => {
  const { name, location, description, price, image, category } = req.body
  const { user: userId_fk } = req.query
  const newSpot = {
    name,
    location,
    description,
    price_range: price,
    image,
    category,
    userId_fk
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
  const spot = res.locals.spot

  res.render('./spots/edit', { 
    spot, 
    static: { css },
    checkUser
  })    
}

exports.editSpot = (req, res) => {
  const { name, location, description, price, image, category } = req.body
  const updatedSpot = {
    name,
    location,
    description,
    price_range: price,
    image,
    category
  }
  const spot = res.locals.spot
  // check which fields have chnaged using the compare helper fn
  const changes = compare(spot.dataValues, updatedSpot)
  // res.json({changes, spot, updatedSpot})
  spot.update(updatedSpot, { fields: changes })
    .then(updatedSpot => {
      res.redirect('/spots')
    })
    .catch(err => res.status(500).json({message: err.message}))
    
}

exports.deleteSpot = (req, res) => {
  const spot = res.locals.spot
  // delete spot from database
  spot.destroy()
    .then(() => {
      res.redirect('/spots')
    })
    .catch(err => res.status(500).json({message: err.message}))
}

exports.likeSpot = (req, res) => {
  const spot = res.locals.spot 
  // increment the likes field
  spot.increment('likes', { by: 1})
  res.redirect('back')
}

module.exports = exports