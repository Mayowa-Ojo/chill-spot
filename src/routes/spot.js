const express = require('express')
// --------------------------------
const controllers = require('../controllers/spot')
const { authorizeRoute, authorizeUser } = require('../middlewares/auth')
const { getSpot: getSpotMiddleware } = require('../middlewares/spot')

const { getSpots, getSpot, newSpot, createSpot, editSpotForm, editSpot, deleteSpot, likeSpot } = controllers

/** Spot routes */
const router = express.Router()

// get all spots
router.get('/', getSpots)

// render new spot form 
router.get('/new', authorizeRoute, newSpot)

// create new spot
router.post('/', authorizeRoute, createSpot)

// get single spot by id
router.get('/:id', getSpot)

// render edit spot form
router.get('/:id/edit', getSpotMiddleware, authorizeUser, editSpotForm)

// save edited spot
router.put('/:id/edit', getSpotMiddleware, authorizeUser, editSpot)

// delete a spot from database
router.get('/:id/delete', getSpotMiddleware, authorizeUser, deleteSpot)

// like a spot
router.get('/:id/like', getSpotMiddleware, likeSpot)


module.exports = router