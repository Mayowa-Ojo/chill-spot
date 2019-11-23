/**
 * script for the new spot page
 * functionality: save the current state of the form to session storage
 *                retrieve current state from SS in case of page refresh(i.e when user clicks upload)
 */

// select form fields
function selectElements() {
  const nameInput = document.querySelector("[data-input='name']")
  const locationInput = document.querySelector("[data-input='location']")
  const priceInput = document.querySelector("[data-input='price_range']")
  const descriptionInput = document.querySelector("[data-input='description']")
  const amountDisplay = document.querySelector("[data-label] span")
  const imageTags = document.querySelector('.image-tags')

  return {
    nameInput,
    locationInput,
    priceInput,
    descriptionInput,
    amountDisplay,
    imageTags
  }
}

function getSessionStorage() {
  // DOM elements
  const { nameInput, locationInput, priceInput, descriptionInput, amountDisplay, imageTags } = selectElements()
  // get data from session storage
  const formData = JSON.parse(window.sessionStorage.getItem('form-data'))
  const currentAmount = window.sessionStorage.getItem('image-amount')
  const files = JSON.parse(window.sessionStorage.getItem('files'))
  
  // handle form data
  if(formData) {
    const { name, location, price, description } = formData
    // set the value of input elements
    nameInput.value = name
    locationInput.value = location
    priceInput.value = price
    descriptionInput.value = description
  }
  
  // handle image amount
  if(currentAmount) {
    // set the label to the current amount
    amountDisplay.innerText = currentAmount
    console.log(currentAmount)
  }

  // handle files display
  if(files) {
    files.forEach(file => {
      createTag(file.filename, imageTags)
    });
  }

}

function createTag(content, imageTags) {
  const label = document.createElement('div')
  const image = document.createElement('img')
  const icon = document.createElement('i')
  label.classList.add('ui', 'image', 'label')
  image.setAttribute('src', '/assets/images/image-placeholder-350x350.png')
  image.setAttribute('alt', 'label image')
  icon.classList.add('delete', 'icon')
  label.append(image, content, icon)
  // console.log(label)
  icon.addEventListener('click', removeTag)
  imageTags.append(label)
}

function removeTag(e) {
  const files = JSON.parse(window.sessionStorage.getItem('files'))
  const currentFilename = e.target.parentElement.textContent
  e.target.parentElement.remove()
  const updatedFiles = files.filter(file => file.filename !== currentFilename)
  window.sessionStorage.setItem('files', JSON.stringify(updatedFiles))
}

function setSessionStorage() {
  const { nameInput, locationInput, priceInput, descriptionInput } = selectElements()
  const formData = {
    name: nameInput.value,
    location: locationInput.value,
    price: priceInput.value,
    description: descriptionInput.value
  }

  // store data in session
  window.sessionStorage.setItem('form-data', JSON.stringify(formData))
}

function trackImageNumber() {
  const fileInput = document.querySelector("input[type='file']")

  if(fileInput.files.length > 0) {
    const files = JSON.parse(window.sessionStorage.getItem('files'))
    const filename = fileInput.files[0].name

    if(files) {
      const exists = files.filter(file => file.filename == filename)
      if(exists.length === 0) {
        window.sessionStorage.setItem('image-amount', JSON.stringify(files.length + 1))
      }
    } else {
      window.sessionStorage.setItem('image-amount', '1')
    }
    // console.log(files)
  }
}

function getFileDetails(e) {
  const fileInput = document.querySelector("input[type='file']")
  const message = document.querySelector('div.ui.message')
  const modalContent = document.querySelector('.ui.modal div.content')

  if(fileInput.files.length > 0) {
    const filename = fileInput.files.item(0).name
    const filesize = `${Math.round(fileInput.files.item(0).size / 1024 / 1024 * 100) / 100}mb`

    // check if file already exists
    const files = JSON.parse(window.sessionStorage.getItem('files'))
    if(files) {
      // check ig the file has already been uploaded
      const exists = files.filter(file => file.filename == filename)
      if(exists.length === 0) {
        files.push({ filename, filesize })
      } else {
        e.preventDefault()
        if(!message) {
          const messageBox = displayError()
          modalContent.prepend(messageBox)
        }
      }
      // store files in session storage
      window.sessionStorage.setItem('files', JSON.stringify(files))
    } else {
      window.sessionStorage.setItem('files', JSON.stringify([{ filename, filesize }]))
    }
  }
}

function displayError() {
  const message = document.createElement('div')
  const icon = document.createElement('i')
  message.classList.add('ui', 'mini', 'negative', 'message')
  icon.classList.add('close', 'icon')
  message.append(icon, 'File alraedy exists')
  return message
}

function triggerSession() {
  // select modal and upload button
  const modalButton = document.querySelector("[data-button='show_modal']")
  const uploadButton = document.querySelector("[data-button='upload']")
  // add click listener
  modalButton.addEventListener('click', () => {
    setSessionStorage()
    // console.log('setting session storage...')
  })
  uploadButton.addEventListener('click', () => {
    trackImageNumber()
  })
  uploadButton.addEventListener('click', getFileDetails)
}

function storeImageIds() {
  const hiddenInput = document.querySelectorAll("input[type='hidden']")[1]
  const currentId = document.querySelectorAll("input[type='hidden']")[1].getAttribute('data-id')

  if(currentId != '') {
    // console.log(hiddenInput.value)
    const image_ids = JSON.parse(window.sessionStorage.getItem('image-ids'))

    if(image_ids) {
      image_ids.push(currentId)
      window.sessionStorage.setItem('image-ids', JSON.stringify(image_ids))
      hiddenInput.value = JSON.stringify(image_ids)
    } else {
      window.sessionStorage.setItem('image-ids', JSON.stringify([currentId]))
      hiddenInput.value = JSON.stringify([currentId])
    }
  }
}

function cleanUp() {
  const backButton = document.querySelector("[data-button='back']")
  const submitButton = document.querySelector("[data-button='submit']")

  backButton.addEventListener('click', () => {
    window.sessionStorage.removeItem('form-data')
    window.sessionStorage.removeItem('image-amount')
    window.sessionStorage.removeItem('files')
    window.sessionStorage.removeItem('image-ids')
  })

  submitButton.addEventListener('click', () => {
    window.sessionStorage.removeItem('form-data')
    window.sessionStorage.removeItem('image-amount')
    window.sessionStorage.removeItem('files')
    window.sessionStorage.removeItem('image-ids')
  })
}

getSessionStorage()
triggerSession()
storeImageIds()
cleanUp()