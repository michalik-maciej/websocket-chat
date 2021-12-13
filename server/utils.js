exports.addUser = ({ name, id, users } ) => {
  users.push({ name, id })
  console.log(`Socket ${id} has joined \n` )
  return generateMessage({ name, action: `joined` })
}

exports.addMessage = ({ message, messages }) => {
  messages.push(message)
  console.log(`Message received from ${message.author} \n`)
}

exports.removeUser = ({ id, users }) => {
  const user = users.find(item => item.id === id)
  users = users.filter(item => item.id !== id)
  console.log('user:, ', user)
  console.log(`Socket ${id} has disconnected \n`)
  return generateMessage({ name: user.name, action: `left` })
}

const generateMessage = ({ name, action }) => (
  {
    message: {
      author: `Chat Bot`, 
      content: `${name} has ${action} the conversation` 
    }      
  }
)
