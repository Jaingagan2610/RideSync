import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-taxi-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <MapPin className="h-8 w-8 text-taxi-primary" />
              <span className="ml-2 text-xl font-bold text-white">
                RideSync
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              The next generation of taxi services, bringing you reliable rides
              whenever you need them.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Discover
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-300 hover:text-white"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/find-ride"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Book a ride
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/driver"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Become a driver
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} RideSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
