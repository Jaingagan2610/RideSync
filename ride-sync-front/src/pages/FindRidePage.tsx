import AvailableTaxis from '@/components/AvailableTaxis'
import FindRide from '@/components/FindRide'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useLocation } from 'react-router-dom'

const FindRidePage = () => {
  const location = useLocation()
  const loginDataa = location.state
  console.log('book a ride ', loginDataa)
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar data1={loginDataa} />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-taxi-dark md:text-4xl lg:text-5xl">
              Book Your Ride
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Find available taxis and book your next journey
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
            <FindRide data1={loginDataa} />
          </div>
          <div className="mt-12">
            <AvailableTaxis />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FindRidePage
