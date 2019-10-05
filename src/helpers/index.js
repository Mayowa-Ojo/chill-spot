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

module.exports = exports