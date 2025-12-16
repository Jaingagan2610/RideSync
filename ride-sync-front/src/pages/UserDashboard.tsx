import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, CreditCard, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface UserDashboardprops {
  loginData?: any
}

const UserDashboard: React.FC<UserDashboardprops> = ({ loginData }) => {
  const location = useLocation()
  const loginDataa = location.state

  console.log('UserDashboard login data', loginDataa)
  console.log('loginData', loginData)

  const [userName] = useState('John Doe')

  // Mock ride history
  const rideHistory = [
    {
      id: 1,
      date: 'Apr 28, 2025',
      pickup: '123 Main St',
      destination: '456 Park Ave',
      driver: 'Michael Lee',
      price: 12.5,
      status: 'Completed'
    },
    {
      id: 2,
      date: 'Apr 25, 2025',
      pickup: '456 Park Ave',
      destination: '789 Broadway',
      driver: 'Sarah Johnson',
      price: 15.75,
      status: 'Completed'
    },
    {
      id: 3,
      date: 'Apr 20, 2025',
      pickup: '789 Broadway',
      destination: '123 Main St',
      driver: 'John Smith',
      price: 10.25,
      status: 'Completed'
    }
  ]

  // Mock saved addresses
  const savedAddresses = [
    {
      id: 1,
      name: 'Home',
      address: '123 Main St, Anytown, USA',
      isDefault: true
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Office Tower, Downtown, USA',
      isDefault: false
    },
    {
      id: 3,
      name: 'Gym',
      address: '789 Fitness Center, Uptown, USA',
      isDefault: false
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar data1={loginDataa} />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-taxi-dark">
              Welcome back, {loginDataa?.user?.name}!
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your rides and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-taxi-primary" />
                  Quick Ride
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* <Button
                  className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                  onClick={() => {
                    redirect('/book-ride')
                  }}
                >
                  Book a Ride Now
                </Button> */}
                <Link to="/find-ride" state={loginDataa}>
                  <Button className="w-full bg-taxi-primary hover:bg-taxi-secondary">
                    Book a Ride Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-taxi-primary" />
                  Scheduled Rides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm mb-2">No upcoming rides</p>
                <Button
                  variant="outline"
                  className="w-full border-taxi-primary text-taxi-primary"
                >
                  Schedule a Ride
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-taxi-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm mb-2">
                  Manage your payment options
                </p>
                <Button
                  variant="outline"
                  className="w-full border-taxi-primary text-taxi-primary"
                >
                  View Payment Options
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rides">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rides">Ride History</TabsTrigger>
              <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="rides">
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
                          <p className="text-sm">Driver: {ride.driver}</p>
                          <p className="font-medium">
                            ${ride.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Your Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedAddresses.map(address => (
                      <div
                        key={address.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold">{address.name}</span>
                          {address.isDefault && (
                            <span className="text-sm bg-taxi-primary text-white px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">{address.address}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-red-500"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full bg-taxi-primary hover:bg-taxi-secondary">
                      Add New Address
                    </Button>
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

export default UserDashboard
