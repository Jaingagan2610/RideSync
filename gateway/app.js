const express = require('express')
const cors = require('cors')
const expressProxy = require('express-http-proxy')
const app = express()

app.use(
  cors({
    origin: 'http://localhost:8080', // allow frontend origin
    credentials: true // allow cookies / auth headers
  })
)
app.use(express.json())

app.use('/user', expressProxy('http://localhost:3001'))
app.use('/captain', expressProxy('http://localhost:3002'))
app.use('/ride', expressProxy('http://localhost:3003'))
app.listen(3000, () => {
  console.log('Gateway server running on port 3000')
})
