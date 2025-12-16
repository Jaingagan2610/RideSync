const express = require('express')
const router = express.Router()
const rideController = require('../controller/ride.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)
router.patch('/acceptRide', rideController.acceptRide)
router.get('/wait-for-new-ride', rideController.getAcceptedRides)

module.exports = router
