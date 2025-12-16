const mongoose = require('mongoose')

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('User DB connected')
    })
    .catch(error => {
      console.log('User DB connection failed')
      console.log(error)
    })
}
module.exports = connect
