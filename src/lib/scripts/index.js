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

// console.log(links)