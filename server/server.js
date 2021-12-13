const 
  express = require('express'),
  socket = require('socket.io'),
  path = require('path'),
  { addUser, removeUser, addMessage } = require('./utils')

const 
  app = express(),
  messages = [],
  users = []

app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
} )

const server = app.listen(8000, () => {
  console.log('server is listening on port 8000')
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log(`New client id: ${socket.id} \n`)

  socket.on('userLoggedIn', (name) => {
    addUser({ name, id: socket.id, users })
    socket.broadcast.emit(
      'message', 
      addUser({ name, id: socket.id, users }).message
    )
  })

  socket.on('message', (message) => { 
    addMessage({ message, messages })
    socket.broadcast.emit('message', message)
  })

  socket.on('disconnect', () => { 
    socket.broadcast.emit(
      'message', 
      removeUser({ id: socket.id, users }).message
    )
  })
})
