const express = require('express')
// --------------------------------
const { getSpots, getSpot, newSpot } = require('../controllers/spot')

/** Spot routes */
const router = express.Router()

// get all spots
router.get('/', getSpots)

// get single spot by id
router.get('/:id', getSpot)

// render new spot form 
router.get('/new', newSpot)


module.exports = router