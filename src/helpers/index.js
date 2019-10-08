const moment = require('moment')

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

exports.getTimeframe = function(time) {
  let format
  // format = new Date(time).toLocaleDateString().split('/').reverse();
  // [format[1], format[2]] = [format[2], format[1]]
  // format = format.join('');
  format = moment(time, 'YYYYMMDD').fromNow();
  return format
}

// ************************************
// handlebars helpers
exports.commentsLength = function(comments) {
  return comments.length
}

module.exports = exports