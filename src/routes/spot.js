const router = require(express).Router
const Spot = require('../models/spot')

/** Spot routes */

// get all spots
router.get('/', getSpots)

module.exports = router