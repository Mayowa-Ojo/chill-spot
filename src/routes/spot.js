const express = require('express')
// --------------------------------
const controllers = require('../controllers/spot')

const { getSpots, getSpot, newSpot, createSpot, editSpotForm, editSpot, deleteSpot } = controllers

/** Spot routes */
const router = express.Router()

// get all spots
router.get('/', getSpots)

// render new spot form 
router.get('/new', newSpot)

// create new spot
router.post('/', createSpot)

// get single spot by id
router.get('/:id', getSpot)

// render edit spot form
router.get('/:id/edit', editSpotForm)

// save edited spot
router.put('/:id/edit', editSpot)

// delete a spot from database
router.get('/:id/delete', deleteSpot)


module.exports = router