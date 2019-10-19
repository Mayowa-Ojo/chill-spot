/**
 * Navigation functionality script
 * 
 */

// select nav links
const navLinks = [...$('.ui.pointing.menu .item')]

// add event listener to nav links on load
callbackFn(navLinks, function() {
  this.addEventListener('click', toggleActiveItem)
})

/**
 * handle the toggling of the current active nav link
 * @param {Object} e event object
 */
function toggleActiveItem(e) {
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

/**
 * get the hidden input and set its value to the current local storage content
 */
export function setStorageItem() {
  const favoritesInput = document.querySelector(".right.menu .item:nth-child(2) input[type='hidden']")

  // get favorites from local storage
  const favorites = window.localStorage.getItem('fav-spots')
  // set the input value
  favoritesInput.value = favorites
}

setStorageItem()
