import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

interface FindRideProps {
  data1: any
}

const FindRide: React.FC<FindRideProps> = ({ data1 }) => {
  console.log('eee', data1)

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [locations, setLocations] = useState({
    pickup: '',
    destination: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocations(prev => ({ ...prev, [name]: value }))
  }

  // const handleSearchRide = () => {
  //   if (!locations.pickup || !locations.destination) {
  //     toast({
  //       title: 'Missing information',
  //       description: 'Please enter both pickup and destination locations.',
  //       variant: 'destructive'
  //     })
  //     return
  //   }

  //   setIsLoading(true)
  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     // Show success message
  //     toast({
  //       title: 'Searching for drivers',
  //       description: "We're looking for available drivers near you."
  //     })

  //     setTimeout(async () => {

  //       const res = await fetch('/')
  //       // const driverNames = ["John D.", "Sarah M.", "Alex T.", "Maria R."];
  //       // const randomDriverName = driverNames[Math.floor(Math.random() * driverNames.length)];
  //       // toast({
  //       //   title: "Driver found!",
  //       //   description: `${randomDriverName} is 3 minutes away from your location.`,
  //       // });
  //     }, 3000)

  //     // setTimeout(() => {
  //     //   const driverNames = ["John D.", "Sarah M.", "Alex T.", "Maria R."];
  //     //   const randomDriverName = driverNames[Math.floor(Math.random() * driverNames.length)];

  //     //   toast({
  //     //     title: "Driver found!",
  //     //     description: `${randomDriverName} is 3 minutes away from your location.`,
  //     //   });
  //     // }, 3000);
  //   }, 1500)
  // }
  const handleSearchRide = async () => {
    if (!locations.pickup || !locations.destination) {
      toast({
        title: 'Missing information',
        description: 'Please enter both pickup and destination locations.',
        variant: 'destructive'
      })
      return
    }
    const renderProgressBar = (progress: number) => (
      <div className="space-y-1">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">{progress}%</p>
      </div>
    )

    setIsLoading(true)

    try {
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjUyNmJlYjAwYzc5YTRlMjNkYjE2ZSIsImlhdCI6MTc1Mjg0NjkxMSwiZXhwIjoxNzUyODUwNTExfQ.dkDptHnA31t0a5t1FxKqsNpzVGifnryNjw3aVA6WU40'
      const token = data1?.token
      const res = await fetch('http://localhost:3000/ride/create-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          pickup: locations.pickup,
          destination: locations.destination
        })
      })

      const data = await res.json()

      if (res.ok) {
        // Show progress toast
        let progress = 0
        const toastController = toast({
          title: 'Ride Created!',
          description: renderProgressBar(progress)
        })

        const interval = setInterval(() => {
          progress += 10
          if (progress >= 100) {
            clearInterval(interval)

            toastController.dismiss() // remove the old progress toast

            // Show driver found toast
            const driverNames = ['John D.', 'Sarah M.', 'Alex T.', 'Maria R.']
            const randomDriverName =
              driverNames[Math.floor(Math.random() * driverNames.length)]

            toast({
              title: 'Driver found!',
              description: `${randomDriverName} is 3 minutes away from your location.`
            })
          } else {
            toastController.update({
              title: 'Searching for driver...',
              description: renderProgressBar(progress),
              id: ''
            })
          }
        }, 1000)
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Something went wrong.',
          variant: 'destructive'
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // const handleSearchRide = async () => {
  //   if (!locations.pickup || !locations.destination) {
  //     toast({
  //       title: 'Missing information',
  //       description: 'Please enter both pickup and destination locations.',
  //       variant: 'destructive'
  //     })
  //     return
  //   }

  //   setIsLoading(true)

  //   try {
  //     const token =
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjcwNzE4MmY1YWUwZmMyMTIzNjdhYyIsImlhdCI6MTc0ODI0NDQxMSwiZXhwIjoxNzQ4MjQ4MDExfQ.sn6SQ49uultECG4OeFIi1NsCE62ikF6Vwbiq5avGJJM'
  //     const res = await fetch('http://localhost:3000/ride/create-ride', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         pickup: locations.pickup,
  //         destination: locations.destination
  //       })
  //     })

  //     const data = await res.json()
  //     if (res.ok) {
  //       toast({
  //         duration: 10000,
  //         render: ({ onClose }) => (
  //           <RideSearchingToast
  //             onComplete={() => {
  //               const driverNames = [
  //                 'John D.',
  //                 'Sarah M.',
  //                 'Alex T.',
  //                 'Maria R.'
  //               ]
  //               const randomDriverName =
  //                 driverNames[Math.floor(Math.random() * driverNames.length)]

  //               toast({
  //                 title: 'Driver found!',
  //                 description: `${randomDriverName} is 3 minutes away from your location.`
  //               })

  //               onClose()
  //             }}
  //           />
  //         )
  //       })
  //     }

  //     // if (res.ok) {
  //     //   toast({
  //     //     title: 'Ride Created!',
  //     //     description: 'We are looking for drivers near your pickup location.'
  //     //   })

  //     //   // Simulate driver found
  //     //   setTimeout(() => {
  //     //     const driverNames = ['John D.', 'Sarah M.', 'Alex T.', 'Maria R.']
  //     //     const randomDriverName =
  //     //       driverNames[Math.floor(Math.random() * driverNames.length)]

  //     //     toast({
  //     //       title: 'Driver found!',
  //     //       description: `${randomDriverName} is 3 minutes away from your location.`
  //     //     })
  //     //   }, 3000)
  //     // } else {
  //     //   toast({
  //     //     title: 'Error',
  //     //     description: data.message || 'Something went wrong.',
  //     //     variant: 'destructive'
  //     //   })
  //     // }
  //   } catch (err) {
  //     toast({
  //       title: 'Error 122',
  //       description: err.message,
  //       variant: 'destructive'
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Find a ride</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-taxi-primary" />
                Pickup Location
              </Label>
              <Input
                id="pickup"
                name="pickup"
                placeholder="Enter pickup address"
                value={locations.pickup}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-taxi-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                name="destination"
                placeholder="Enter destination address"
                value={locations.destination}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="when" className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-taxi-primary" />
                When
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  Now
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSearchRide}
              className="w-full bg-taxi-primary hover:bg-taxi-secondary"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search for a ride'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default FindRide
