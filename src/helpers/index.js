const moment = require('moment')
const Handlebars = require('handlebars')
/**
 *  @param {Object} base - object to be compared
 *  @param {Object} ref - reference for comparison
 *  @returns {Array} - array containing the properties that differ
 */

const toUppercase = function(str) {
  const first = str.slice(0, 1)
  const rest = str.slice(1, str.length)
  
  return `${first.toUpperCase()}${rest}`
}

exports.compare = function (base, ref) {
  const diff = new Array
  const exceptions = ['id', 'user', 'userId_fk', 'spotId_fk', 'likes', 'createdAt', 'updatedAt']
  
  for(prop in base) {
    if(exceptions.includes(prop)) continue
    
    if(base[prop] !== ref[prop]) {
      diff.push(prop)
    }
  }
  return diff
}

// ************************************
// handlebars helpers
exports.commentsLength = function(comments) {
  return comments.length
}

exports.checkPlural = function(arg) {
  if(typeof arg !== 'number') {
    if(arg.length == 1) {
      return 'comment'
    } else return 'comments'
  } else {
    if(arg == 1) {
      return 'like'
    } else return 'likes'
  }
}

exports.parseTimeFrame = function(timeFrame) {
  return moment(timeFrame, 'YYYYMMDD').fromNow()
}

exports.displayFlashMessage = function(message, type) {
  let classType

  if(type == 'success') {
    classType = 'success'
  } else if(type == 'error') {
    classType = 'negative'
  }

  if(message != '') {
    let primaryMessage
    let secondaryMessage

    if(typeof message == 'object') {
      primaryMessage = message[0]
      secondaryMessage = message[1]
    } else {
      primaryMessage = message
      secondaryMessage = null
    }

    const html = `
    <div class="ui ${classType} mini message">
      <i class="close icon"></i>
      <div class="header">
        ${primaryMessage}
      </div>
      ${secondaryMessage ? `<p>${secondaryMessage}</p>` : ''}
    </div>
    `
    return new Handlebars.SafeString(html)
  } else return ''
}

exports.checkUser = function(currentUser) {
  let route

  if(currentUser != undefined) {
    route = 'logout'
  } else {
    route = 'login'
  }

  const html = `<a href="/users/${route}" class="item">${toUppercase(route)}</a>`
  return new Handlebars.SafeString(html)
}

module.exports = exports