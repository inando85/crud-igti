window.addEventListener('load', start)

let globalNames = ['Arthur', 'Miguel', 'Pedro', 'Diogo']
let inputName = null
let isEditing = false
let currentIndex = null

function start() {
  inputName = document.querySelector('#inputName')
  preventFormSubmit()
  activateInput()
  render()
}

function preventFormSubmit() {
  const form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
  
  function handleFormSubmit(event) {
    event.preventDefault();
  }
}

function activateInput() {
  inputName.focus()
  inputName.addEventListener('keyup', handleTyping)

  function insertName(newName) {
    globalNames.push(newName)
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName
  }
  
  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value !== '') {
      if (isEditing) {
        updateName(event.target.value.trim())
      } else {
        insertName(event.target.value.trim())
      }

      render()   
      isEditing = false
      clearInput()
    }
  }
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1)
      render()
    }
    let button = document.createElement('button')
    button.classList.add('deleteButton')
    button.textContent = 'x'
    button.addEventListener('click', deleteName)
    return button
  }
  function createSpan(name, index) {
    function editItem() {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = index
    }
    let span = document.createElement('span')
    span.classList.add('clickable')
    span.textContent = name
    span.addEventListener('click', editItem)
    return span
  }

  let divNames = document.querySelector('#names')
  divNames.innerHTML = ''
  
  let ul = document.createElement('ul')
  
  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i]
    
    let li = document.createElement('li')
    let button = createDeleteButton(i)
    let span = createSpan(currentName, i)

    li.appendChild(button)
    li.appendChild(span)
    ul.appendChild(li)
    
  }
  divNames.appendChild(ul)
  clearInput()
}

function clearInput() {
  inputName.value = ''
  inputName.focus()
}
