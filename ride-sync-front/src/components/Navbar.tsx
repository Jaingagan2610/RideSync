import { Button } from '@/components/ui/button'
import { MapPin, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
  data1?: any
}

const Navbar: React.FC<NavbarProps> = ({ data1 }) => {
  // const Navbar = () => {
  const location = useLocation()
  const loginDataa = location.state
  console.log('hhhh', loginDataa)
  console.log('Data received in Navbar:', data1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-taxi-primary" />
              <span className="ml-2 text-xl font-bold text-taxi-dark">
                RideSync
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-taxi-primary"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              state={loginDataa}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-taxi-primary"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-taxi-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-taxi-primary"
            >
              Contact
            </Link>
            <div
              onClick={() => {
                console.log('hhh', data1)
              }}
            >
              hello
            </div>
            {/* <div className="ml-4 flex items-center space-x-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-taxi-primary text-taxi-primary hover:bg-taxi-primary hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-taxi-primary text-white hover:bg-taxi-secondary">
                  Register
                </Button>
              </Link>
            </div> */}
            <div className="ml-4 flex items-center space-x-2">
              {data1 || loginDataa ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-taxi-primary text-white flex items-center justify-center font-bold uppercase">
                    {data1?.user?.name?.[0] ||
                      loginDataa?.user?.name?.[0] ||
                      loginDataa?.captain?.name?.[0] ||
                      'R'}
                  </div>
                  <span>
                    {data1?.user?.name ||
                      loginDataa?.user?.name ||
                      loginDataa?.captain?.name ||
                      'User'}
                  </span>
                </div>
              ) : (
                <div className="ml-4 flex items-center space-x-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-taxi-primary text-taxi-primary hover:bg-taxi-primary hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-taxi-primary text-white hover:bg-taxi-secondary">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taxi-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taxi-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taxi-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 mt-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-taxi-primary text-taxi-primary hover:bg-taxi-primary hover:text-white"
                >
                  Loginss
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-taxi-primary text-white hover:bg-taxi-secondary">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
