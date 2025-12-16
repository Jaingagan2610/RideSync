import { useLocation } from 'react-router-dom'
import MapComponent from './MapComponent'

const RideMap = () => {
  const location = useLocation()
  const { pickup, destination } = location.state || {}

  return (
    <div>
      {pickup && destination ? (
        <MapComponent pickup={pickup} destination={destination} />
      ) : (
        <p>No ride data found</p>
      )}
    </div>
  )
}

export default RideMap
