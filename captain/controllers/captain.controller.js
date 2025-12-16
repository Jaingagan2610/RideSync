const captainModel = require('../models/captain.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklisttokenModel = require('../models/blacklisttoken.model')
const { subscribeToQueue } = require('../services/rabbit')

const pendingRequests = []

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const captain = await captainModel.findOne({ email })
    if (captain) {
      return res.status(400).json({ msg: 'captain already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newcaptain = new captainModel({
      name,
      email,
      password: hashedPassword
    })
    await newcaptain.save()

    const accessToken = jwt.sign(
      { captainId: newcaptain._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )
    delete newcaptain._doc.password
    res.cookie('accessToken', accessToken)
    res.send({
      accessToken,
      newcaptain,
      message: 'captain register successfully'
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const captain = await captainModel.findOne({ email }).select('+password')

    if (!captain) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, captain.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    delete captain._doc.password

    res.cookie('token', token)

    res.send({ token, captain })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token
    await blacklisttokenModel.create({ token })
    res.clearCookie('token')
    res.send({ message: 'captain logged out successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.profile = async (req, res) => {
  try {
    res.send(req.captain)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.toggleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id)
    captain.isAvailable = !captain.isAvailable
    await captain.save()
    res.send(captain)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.waitForNewRide = async (req, res) => {
  req.setTimeout(30000, () => {
    res.status(204).end()
  })

  pendingRequests.push(res)
}

subscribeToQueue('new-ride', async data => {
  const rideData = JSON.parse(data)
  pendingRequests.forEach(res => {
    res.json({ data: rideData })
  })
  pendingRequests.length = 0
})
