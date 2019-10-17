/**********************************
  script for the index page
  make the vertical menu interactive
**********************************/

// select links in the vertical menu 
const links = [...$('.ui.vertical.menu a')]

// add listener(click) to each link
links.forEach(link => {
  link.addEventListener('click', toggleActiveLink)
})

function toggleActiveLink(e) {
  // remove the current active class
  links.forEach(link => {
    if(link.classList.contains('active')) {
      link.classList.remove('active', 'teal')
    }
  })
  // add active class to target link
  e.target.classList.add('active', 'teal')
}

/*********************************
  search functionality
 ********************************
const searchInput = [...$('.ui.icon.search.input input')][0]

// add event listener to the search icon
const searchIcon = [...$('.ui.icon.search.input i')][0]
searchIcon.addEventListener('click', handleSearch)

function handleSearch(e) {
  const query = searchInput.value
  const url = `http://localhost:8000/spots/search?search=name&q=${query}`
  // console.log(data)
  $.get(url)
    .done(res => {
      console.log(res)
    })
    .fail(err => {
      console.error(err)
  })
  // clean up search field
  searchInput.value = ''
} */