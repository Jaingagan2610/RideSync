import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Car, Clock, DollarSign, MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface RiderDashboardProps {
  loginData?: any
}

const RiderDashboard: React.FC<RiderDashboardProps> = ({ loginData }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const loginDataa = location.state
  console.log('RiderDashboard login data', loginDataa)
  const [rideData, setRideData] = useState(null)
  const [isOnline, setIsOnline] = useState(false)
  const [driverName] = useState('Michael Rodriguez')
  const [totalEarnings] = useState(432.75)
  const [rating] = useState(4.8)
  const [completedRides] = useState(58)
  const [isUsersData, setUsersData] = useState([])

  // Mock ride requests
  const rideRequests = [
    {
      id: 1,
      passenger: 'Emma Wilson',
      pickupLocation: '123 Main St',
      destination: '456 Park Ave',
      distance: 3.2,
      estimatedFare: 12.5,
      estimatedTime: 15
    },
    {
      id: 2,
      passenger: 'James Brown',
      pickupLocation: '789 Broadway',
      destination: '101 Sunset Blvd',
      distance: 5.7,
      estimatedFare: 18.25,
      estimatedTime: 22
    }
  ]

  // Mock ride history
  const rideHistory = [
    {
      id: 1,
      date: 'Apr 28, 2025',
      passenger: 'Sarah Miller',
      pickup: '123 Main St',
      destination: '456 Park Ave',
      fare: 14.5,
      status: 'Completed'
    },
    {
      id: 2,
      date: 'Apr 27, 2025',
      passenger: 'John Doe',
      pickup: '456 Park Ave',
      destination: '789 Broadway',
      fare: 16.75,
      status: 'Completed'
    },
    {
      id: 3,
      date: 'Apr 26, 2025',
      passenger: 'Emily Clark',
      pickup: '789 Broadway',
      destination: '123 Main St',
      fare: 11.25,
      status: 'Completed'
    }
  ]

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    try {
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjUyNmRjNDRkNTM0N2E3NjUwYmQ4MyIsImlhdCI6MTc1Mjg0Njk5MCwiZXhwIjoxNzUyODUwNTkwfQ.Z20DtPXlhKZmp05QyjpbyYpoU-S_ut3w7TEYmHrfHyE'
      const token = loginDataa?.token
      const response = fetch(
        'http://localhost:3000/captain/toggleAvailability',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (error) {
      console.error('Error updating driver status:', error)
      return
    }
  }
  const handleAcceptRide = async (rideId: string) => {
    try {
      console.log(`Accepted ride ${rideId}`)

      const response = await fetch('http://localhost:3000/ride/acceptRide', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId: rideId })
      })
      console.log('Response status:', response)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to accept ride')
      }

      console.log('Ride accepted successfully:', data)
      toast(
        <div>
          <div className="font-bold">Ride Accepted!</div>
          <div>{`Ride ID: ${rideId}`}</div>
        </div>
      )
      setRideData(data.ride)
      navigate('/ride-map', {
        state: {
          pickup: data.ride.pickup,
          destination: data.ride.destination
        }
      })
    } catch (error) {
      console.error('Error accepting ride:', error)
    }
  }

  const handleDeclineRide = (rideId: number) => {
    console.log(`Declined ride ${rideId}`)
    // In a real app, this would involve API calls to decline the ride
  }

  const handleRefreshRides = async () => {
    console.log('Refreshing ride requests')

    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjUyNmRjNDRkNTM0N2E3NjUwYmQ4MyIsImlhdCI6MTc1Mjg0Njk5MCwiZXhwIjoxNzUyODUwNTkwfQ.Z20DtPXlhKZmp05QyjpbyYpoU-S_ut3w7TEYmHrfHyE'
    const token = loginDataa?.token
    try {
      const res = await fetch('http://localhost:3000/captain/new-ride', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Response status:', res.status)

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to refresh rides')
      }
      const rides = data.data ? [data.data] : [] // Safely wrap in array
      setUsersData(rides)
      console.log('Ride requests refreshed:', data)

      toast(
        <div>
          <div className="font-bold">Rides Refreshed!</div>
          <div>{`${data.length || 0} ride(s) received.`}</div>
        </div>
      )
    } catch (error) {
      console.error('Error refreshing rides:', error)
      toast(
        <div className="text-red-600">
          <div className="font-bold">Error refreshing rides</div>
          <div>{error.message || 'Something went wrong.'}</div>
        </div>
      )
    }
  }
  console.log('Users Data:', isUsersData)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar data1={loginDataa} />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-taxi-dark">
              Driver Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {loginDataa?.captain?.name}
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="flex items-center">
                <Switch
                  id="driver-status"
                  checked={isOnline}
                  onCheckedChange={handleToggleOnline}
                  className="data-[state=checked]:bg-green-500"
                />
                <Label htmlFor="driver-status" className="ml-2">
                  {isOnline ? 'Online' : 'Offline'}
                </Label>
              </div>

              {isOnline && (
                <Badge className="ml-4 bg-green-500">Available for rides</Badge>
              )}
              <div className="flex items-center">
                {isOnline && (
                  <button
                    onClick={handleRefreshRides}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition  ml-4"
                  >
                    Refresh
                  </button>
                )}
              </div>
            </div>
            <Button className="bg-taxi-primary hover:bg-taxi-secondary">
              View Today's Summary
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-taxi-primary" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  ${totalEarnings.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  Total earnings this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-taxi-primary" />
                  Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{rating}</p>
                <p className="text-gray-500 text-sm">
                  Average passenger rating
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Car className="h-5 w-5 mr-2 text-taxi-primary" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{completedRides}</p>
                <p className="text-gray-500 text-sm">Total rides completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-taxi-primary" />
                  Active Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42</p>
                <p className="text-gray-500 text-sm">Hours online this week</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="requests">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requests">Ride Requests</TabsTrigger>
              <TabsTrigger value="history">Ride History</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>New Ride Requests</CardTitle>
                  <CardDescription>
                    {isOnline
                      ? 'Accept or decline ride requests'
                      : "You're offline. Go online to receive ride requests"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isOnline ? (
                    rideRequests.length > 0 ? (
                      <div className="space-y-6">
                        {/* {rideRequests.map(ride => (
                          <div key={ride.id} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold">
                                Passenger: {ride.passenger}
                              </span>
                              <span className="text-taxi-primary font-semibold">
                                ${ride.estimatedFare.toFixed(2)}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                              <div>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-taxi-primary" />
                                  Pickup
                                </p>
                                <p>{ride.pickupLocation}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-taxi-primary" />
                                  Destination
                                </p>
                                <p>{ride.destination}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                              <div>Distance: {ride.distance} miles</div>
                              <div>Est. time: {ride.estimatedTime} min</div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                                onClick={() => handleAcceptRide(ride.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleDeclineRide(ride.id)}
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        ))} */}
                        {/* {isUsersData.map((ride, index) => (
                          <div key={index} className="p-4 border rounded mb-4">
                            <p>
                              <strong>User:</strong> {ride.user}
                            </p>
                            <p>
                              <strong>Pickup:</strong> {ride.pickup}
                            </p>
                            <p>
                              <strong>Destination:</strong> {ride.destination}
                            </p>
                            <p>
                              <strong>Status:</strong> {ride.status}
                            </p>
                            <p>
                              <strong>Created At:</strong>{' '}
                              {new Date(ride.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))} */}
                        {isUsersData.map((ride, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold">
                                Passenger: {ride.user}
                              </span>
                              <span className="text-taxi-primary font-semibold">
                                Status: {ride.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                              <div>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-taxi-primary" />
                                  Pickup
                                </p>
                                <p>{ride.pickup}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-taxi-primary" />
                                  Destination
                                </p>
                                <p>{ride.destination}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                              <div>
                                Created:{' '}
                                {new Date(ride.createdAt).toLocaleString()}
                              </div>
                              <div>Status: {ride.status}</div>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                                onClick={() => handleAcceptRide(ride._id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleDeclineRide(ride._id)}
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          No new ride requests at the moment
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12">
                      <Button
                        className="bg-green-500 hover:bg-green-600"
                        onClick={handleToggleOnline}
                      >
                        Go Online
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideHistory.map(ride => (
                      <div
                        key={ride.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{ride.date}</span>
                          <span className="text-sm text-green-600">
                            {ride.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p>{ride.pickup}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p>{ride.destination}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="text-sm">Passenger: {ride.passenger}</p>
                          <p className="font-medium">${ride.fare.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RiderDashboard
