/**
 * Navigation functionality script
 * 
 */

// select nav links
const navLinks = [...$('.ui.pointing.menu .item')]

// add event listener to nav links on load
callbackFn(navLinks, function() {
  this.addEventListener('click', handleClick)
})

/**
 * handle the toggling of the current active nav link
 * @param {Object} e event object
 */
function handleClick(e) {
  callbackFn(navLinks, function() {
    // console.log(this.outerHTML)
    this.classList.remove('active')
  })

  e.target.classList.add('active')
}

/**
 * abstract the process of looping through the navLinks array to a function
 * @param {Array} arr array to loop over
 * @param {Function} callback callback function to be called on every iteration
 */
function callbackFn(arr, callback) {
  return arr.forEach(loop => {
    callback.apply(loop)
  })
}
