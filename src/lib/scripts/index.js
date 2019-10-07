/* ********************************************************************************************
    Hanlde comment editing - Including swapping the comment element with text input form
******************************************************************************************** */
const editButtons = $('.actions .edit.outline.icon')
const buttons = [...editButtons]

const handleClick = (e) => {
  // select target element with class identifier
  const identifier = e.target.parentElement.parentElement.parentElement.children[2].classList[1]
  const content = e.target.parentElement.parentElement.parentElement.children[2].textContent
  const commentId = [...$('.content input[type=\'hidden\']')][identifier].value
  // replacement element
  const elem = `
  <form action="/comments/${commentId}/edit?_method=PUT" method="POST">
    <div class="ui mini fluid icon action input">
      <input type="text" name="comment" value="${content}">
      <button type="submit" class="ui icon mini button">
        <i class="check circle icon"></i>
      </button>
    </div>
  </form>
  `
  // replace comment with text input
  $(elem).replaceAll(`.text.${identifier}`)

  /*
  add event listener to submit button
  const submitButton = [...$('.ui.icon.input .ui.icon.button')][0]
  submitButton.addEventListener('click', (e) => {
    let inputValue
    
    if([...e.target.classList].includes('check')) {
      inputValue = e.target.parentElement.parentElement.children[0].value
    } else {
      inputValue = e.target.parentElement.children[0].value
    }
    
    // assign replacement element with text content set to input value
    const replacement = `<div class="text ${identifier}">${inputValue}</div>`
    $(replacement).replaceAll('.ui.fluid.icon.input')
  })
  */
}

// add event listner to all edit buttons
buttons.forEach(button => {
  button.addEventListener('click', handleClick)
})
