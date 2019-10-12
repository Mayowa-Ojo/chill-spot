/**
 *  authorization middleare functions
 */

// check logged in user
exports.authorizeRoute = function(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  } else {
    req.flash('error', 'You need to be logged in')
    res.redirect('back')
  }
}

// check logged in user and author privileges
exports.authorizeUser = function(req, res, next) {
  // check if user is logged in
  if(req.isAuthenticated()) {
    // check if current user is the author
    if(req.user.id == res.locals.spot.user.id) {
      next()
    } else {
      req.flash('error', 'You\'re not authorized to do that')
      res.redirect('back')
    }
  } else {
    req.flash('error', 'You need to be logged in')
    res.redirect('back')
  }
}

module.exports = exports