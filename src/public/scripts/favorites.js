import { setStorageItem as updateItems } from './nav.js'

/**
 * Favorite spots page
 * Handle access to local storage
 */

if(window.location.pathname == '/spots/favorites') {
  console.log(window.location)
  // select the delete buttons
  const deleteButtons = document.querySelectorAll('.negative.ui.button')
  // add event listener to each button
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDelete)
  })

  function handleDelete(e) {
    // get id of selected spot
    const currentId = e.target.parentElement.firstElementChild.value
    // console.log(currentId)
    const favorites = JSON.parse(window.localStorage.getItem('fav-spots'))
    // remove current id from favorites
    const filteredFavs = favorites.ids.filter(id => id != currentId)
    // console.log(filteredFavs)
    favorites.ids = filteredFavs
    window.localStorage.setItem('fav-spots', JSON.stringify(favorites))

    // update the items in hidden input
    updateItems()
    // redirect
    window.location.href = `${window.location.origin}/spots`
  }
} else {  
  // select favorite button 
  const favButton = document.querySelector('.ui.feed .content .meta a:last-child')

  // console.log(favButton)
  favButton.addEventListener('click', addToFavorites)

  function addToFavorites(e) {
    // get favorite spots from local storage
    const favorites = JSON.parse(window.localStorage.getItem('fav-spots'))
    // get the id of the spot
    const urlString = window.location.href
    const idString = urlString.split('/')[4]
    
    if(favorites) {
      // check if item exists in favorites
      if(!favorites.ids.includes(idString)) {
        // add id to favorites array
        favorites.ids.push(idString)
        window.localStorage.setItem('fav-spots', JSON.stringify(favorites))
        console.log('added to favorites')
      }
    } else {
      // create new key-value pair
      const newFavorites = {}
      newFavorites['ids'] = []
      newFavorites.ids.push(idString)
      console.log(newFavorites)
      window.localStorage.setItem('fav-spots', JSON.stringify(newFavorites))
      console.log('added to favorites')
    }

    // update the items in hidden input
    updateItems()
  }
}
