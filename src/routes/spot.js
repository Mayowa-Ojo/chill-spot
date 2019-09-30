const express = require('express')
// --------------------------------
const { getSpots, getSpot, newSpot } = require('../controllers/spot')

/** Spot routes */
const router = express.Router()

// get all spots
router.get('/', getSpots)

// render new spot form 
router.get('/new', newSpot)

// get single spot by id
router.get('/:id', getSpot)



module.exports = router