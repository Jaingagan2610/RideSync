import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'

const Hero = () => {
  const location = useLocation()
  const loginDataa = location.state
  return (
    <div className="relative bg-gradient-to-r from-taxi-dark to-taxi-secondary/90 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.togopool.com/assets/bike-pooling/frd-bike-ride.webp')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Your ride is just a</span>{' '}
                <span className="block text-taxi-accent xl:inline">
                  click away
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Find a reliable ride in minutes. Our drivers are ready to take
                you anywhere, anytime. Book a ride now and experience the next
                generation of taxi services.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/find-ride" state={loginDataa}>
                    <Button className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-white bg-taxi-primary hover:bg-taxi-secondary md:py-5 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Book a Ride
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/driver">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-white bg-taxi-primary hover:bg-taxi-secondary md:py-5 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Become a Driver
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-taxi-dark to-taxi-secondary opacity-90">
          <div className="w-full h-full bg-[url('https://www.togopool.com/assets/bike-pooling/frd-bike-ride.webp')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
