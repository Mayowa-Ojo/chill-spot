const express = require('express')
// *******************************
const { parser } = require('../config/cloudinary/cloudinary')
const { uploadMedia } = require('../controllers/media')
const router = express.Router()

/**
 * Create media route
 */
router.post('/', parser.single('image'), uploadMedia)

module.exports = router