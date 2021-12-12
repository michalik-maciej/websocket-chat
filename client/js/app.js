let userName;

const elements = {
  loginForm: document.getElementById('welcome-form'),
  messagesSection: document.getElementById('messages-section'),
  messagesList: document.getElementById('messages-list'),
  addMessageForm: document.getElementById('add-messages-form'),
  userNameInput: document.getElementById('username'),
  messageContentInput: document.getElementById('message-content'),
};

function login(event) {
  event.preventDefault();
  console.log(event.target);

  if (elements.userNameInput.value === '') {
    alert('Provide user name')
  }
  else {
    userName = elements.userNameInput.value
    elements.loginForm.classList.remove('show')
    elements.messagesSection.classList.add('show')
  }

}

function sendMessage(event) {
  event.preventDefault()
  if (elements.messageContentInput.value !== '') {
    addMessage({ author: userName, content: elements.messageContentInput.value })
    elements.messageContentInput.value = ''
  }
  else alert('message is an empty string')
}

function addMessage({ author, content }) {
  const message = document.createElement('li')
  message.classList.add('message', 'message--received')

  if (author === userName) {
    message.classList.add('message--self')
    author = `You`
  }

  message.innerHTML = 
    `<h3 class='message__author'>
      ${author}
    </h3>
    <div class='message__content'>
      ${content}
    </div>`

  elements.messagesList.appendChild(message)
}

function removeAutocomplete (arr) {
  arr.forEach(item => {
    item.setAttribute('autocomplete', 'off')
  })
}

elements.loginForm.addEventListener('submit', login);
elements.addMessageForm.addEventListener('submit', sendMessage);
removeAutocomplete([ elements.userNameInput, elements.messageContentInput ])