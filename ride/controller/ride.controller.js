const rideModel = require('../models/ride.model')

const { subscribeToQueue, publishToQueue } = require('../services/rabbit')

// module.exports.createRide = async (req, res) => {
//   try {
//     const { pickup, destination } = req.body

//     const newRide = new rideModel({
//       user: req.user._id,
//       pickup,
//       destination
//     })

//     await ride.save()

//     publishToQueue('new-ride', JSON.stringify(newRide))
//     res.send({ newRide, message: 'Ride created successfully' })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// }
module.exports.createRide = async (req, res, next) => {
  const { pickup, destination } = req.body

  const newRide = new rideModel({
    user: req.user._id,
    pickup,
    destination
  })
  console.log('Creating new ride:', newRide)
  console.log('User ID:', req.user._id)

  await newRide.save()
  publishToQueue('new-ride', JSON.stringify(newRide))
  res.send(newRide)
}
// module.exports.acceptRide = async (req, res) => {
//   try {
//     const { rideId } = req.body
//     console.log('Accepting ride with ID:', rideId)

//     if (!rideId) {
//       return res.status(400).json({ message: 'Ride ID is required' })
//     }

//     const ride = await rideModel.findById(rideId)
//     if (!ride) {
//       return res.status(404).json({ message: 'Ride not found' })
//     }

//     if (ride.captain) {
//       return res
//         .status(400)
//         .json({ message: 'Ride already accepted by a captain' })
//     }

//     // Assign captain and update ride status
//     ride.captain = req.user._id
//     ride.status = 'accepted'

//     await ride.save()

//     // Publish to queue (optional async function)
//     publishToQueue('ride-accepted', JSON.stringify(ride))

//     return res.status(200).json({
//       message: 'Ride accepted successfully',
//       ride
//     })
//   } catch (error) {
//     console.error('Error accepting ride:', error)
//     return res
//       .status(500)
//       .json({ message: 'Server error', error: error.message })
//   }
// }

module.exports.acceptRide = async (req, res) => {
  try {
    const { rideId } = req.body

    // 1. Validate rideId
    if (!rideId) {
      return res.status(400).json({ message: 'Ride ID is required' })
    }

    // 2. Fetch the ride from DB
    const ride = await rideModel.findById(rideId)
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' })
    }

    // 3. Check if already accepted
    if (ride.captain) {
      return res
        .status(400)
        .json({ message: 'Ride already accepted by a captain' })
    }

    // 4. Ensure req.user is available
    // if (!req.user || !req.user._id) {
    //   return res
    //     .status(401)
    //     .json({ message: 'Unauthorized: Missing captain info' })
    // }
    // console.log('4')

    // 5. Update ride
    // console.log(ride)
    // console.log('dddd', req)
    // ride.captain = req.user._id
    ride.status = 'accepted'

    await ride.save()

    // 6. Publish to queue (optional)
    try {
      await publishToQueue('ride-accepted', JSON.stringify(ride))
    } catch (queueErr) {
      console.warn('Queue publish failed, continuing anyway:', queueErr.message)
    }

    // 7. Respond with success
    return res.status(200).json({
      message: 'Ride accepted successfully',
      ride
    })
  } catch (error) {
    console.error('Error accepting ride:', error)
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
}

module.exports.getAcceptedRides = async (req, res) => {
  try {
    const { pickup, destination } = req.body

    // Basic validation
    if (!pickup || !destination) {
      return res
        .status(400)
        .json({ message: 'Pickup and destination are required' })
    }

    // Find accepted rides that match the criteria
    const rides = await rideModel.find({
      captain: req.user._id,
      pickup: { $regex: new RegExp(pickup.trim(), 'i') },
      destination: { $regex: new RegExp(destination.trim(), 'i') },
      isAccepted: true
    })

    if (!rides || rides.length === 0) {
      return res
        .status(404)
        .json({ message: 'No matching accepted rides found' })
    }

    return res.status(200).json(rides)
  } catch (error) {
    console.error('Error fetching accepted rides:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}
