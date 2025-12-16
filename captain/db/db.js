const mongoose = require('mongoose')

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('captain DB connected')
    })
    .catch(error => {
      console.log('captain DB connection failed')
      console.log(error)
    })
}
module.exports = connect
