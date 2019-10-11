const moment = require('moment')
const Handlebars = require('handlebars')
/**
 *  @param {Object} base - object to be compared
 *  @param {Object} ref - reference for comparison
 *  @returns {Array} - array containing the properties that differ
 */

exports.compare = function (base, ref) {
  const diff = new Array
  
  for(prop in base) {
    if(prop == 'id') continue
    
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

exports.checkPlural = function(likes) {
  if(likes == 1) {
    return 'like'
  } else return 'likes'
}

exports.parseTimeFrame = function(timeFrame) {
  return moment(timeFrame, 'YYYYMMDD').fromNow()
}

exports.displayFlashMessage = function(message) {
  
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
    <div class="ui negative mini message">
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

module.exports = exports