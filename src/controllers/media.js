const { Media } = require('../config/sequelize/associations')
const { checkUser } = require('../helpers')
/**
 * Upload media controller
 */
exports.uploadMedia = (req, res) => {
  const css = "/styles/spots/new.css"
  const script_one = '/scripts/new.js'
  const { url, public_id } = req.file || { url: 'empty', public_id: 'empty'}
  const { spot: spotId_fk } = req.query

  if(url == 'empty') {
    return res.redirect('/spots/new')
  }

  const newMedia = {
    url,
    publicId: public_id,
    spotId_fk
  }

  Media.create(newMedia)
    .then(media => {
      // res.status(201).json(media)
      res.render('./spots/new', {
        media,
        static: { css, script_one },
        helpers: {
          checkUser
        },
        userId: req.user.id
      })
    })
    .catch(err => res.status(500).json({message: err.message}))
}

module.exports = exports