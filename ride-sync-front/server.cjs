// const express = require('express')
// const http = require('http')
// const path = require('path')
// const socketIo = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketIo(server)

// // Set EJS as the view engine
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

// // Serve static files (e.g., JS, CSS, images from /public folder)
// app.use(express.static(path.join(__dirname, 'public')))

// // Parse JSON and URL-encoded payloads if needed
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Socket.IO logic
// io.on('connection', socket => {
//   console.log('A user connected:', socket.id)

//   socket.on('send-location', data => {
//     console.log('Location received:', data)
//     io.emit('receive-location', { id: socket.id, ...data })
//   })

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id)
//     io.emit('user-disconnected', { id: socket.id })
//   })
// })

// // Route to render MapComponent.ejs (should exist in /views folder)
// app.get('/', (req, res) => {
//   res.render('MapComponent') // This should be 'MapComponent.ejs' inside /views
// })

// // Start the server
// const PORT = 3004
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// })
// server.cjs
const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(cors()) // Required for socket connection from different ports

const io = new Server(server, {
  cors: {
    origin: '*', // Allow your React app to connect
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log('Client connected:', socket.id)

  socket.on('send-location', data => {
    console.log('Location from', socket.id, ':', data)
    io.emit('receive-location', { id: socket.id, ...data })
  })

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id)
    io.emit('user-disconnected', { id: socket.id })
  })
})

const PORT = 3004
server.listen(PORT, () => {
  console.log(`🚀 Socket server running on http://localhost:${PORT}`)
})
