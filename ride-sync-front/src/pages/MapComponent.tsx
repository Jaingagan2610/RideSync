import L from 'leaflet'
import 'leaflet-routing-machine'
import { useLayoutEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3004')

interface MapComponentProps {
  destination: string
  pickup: string
}

const MapComponent: React.FC<MapComponentProps> = ({ destination, pickup }) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})
  const [routeControl, setRouteControl] = useState<null>(null)

  useLayoutEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current).setView([28.6139, 77.209], 13)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map)

    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
    })

    // Delay tile rendering fix
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    // Socket listeners
    socket.on('receive-location', ({ id, lat, lon }) => {
      if (!lat || !lon || !mapRef.current) return

      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([lat, lon])
      } else {
        markersRef.current[id] = L.marker([lat, lon]).addTo(mapRef.current)
      }

      if (id === socket.id) {
        mapRef.current.setView([lat, lon], 20)
      }
    })

    socket.on('user-disconnected', ({ id }) => {
      if (markersRef.current[id] && mapRef.current) {
        mapRef.current.removeLayer(markersRef.current[id])
        delete markersRef.current[id]
      }
    })

    navigator.geolocation.watchPosition(
      pos => {
        const { latitude: lat, longitude: lon } = pos.coords
        socket.emit('send-location', { lat, lon })
      },
      err => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )

    return () => {
      map.remove()
    }
  }, [])

  async function geocode(address: string): Promise<[number, number]> {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    )
    const data = await res.json()
    if (!data.length) throw new Error('Location not found')
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
  }

  const searchRoute = async () => {
    const pickupInput = document.getElementById('pickup') as HTMLInputElement
    const destinationInput = document.getElementById(
      'destination'
    ) as HTMLInputElement

    if (!pickupInput.value || !destinationInput.value)
      return alert('Please fill both fields.')

    try {
      const [fromLat, fromLon] = await geocode(pickupInput.value)
      const [toLat, toLon] = await geocode(destinationInput.value)

      if (routeControl && mapRef.current) {
        mapRef.current.removeControl(routeControl)
      }

      if (!mapRef.current) return

      const control = L.Routing.control({
        waypoints: [L.latLng(fromLat, fromLon), L.latLng(toLat, toLon)],
        routeWhileDragging: false,
        show: false
      }).addTo(mapRef.current)

      setRouteControl(control)
    } catch (err) {
      console.error('Route error:', err)
    }
  }

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          #map {
            height: 100%;
            width: 100%;
          }
        `}
      </style>

      <div
        style={{
          position: 'absolute',
          marginLeft: '80px',
          zIndex: 1000,
          top: '10px',
          left: '10px',
          background: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        <input
          id="pickup"
          value={pickup}
          type="text"
          placeholder="Pickup location"
          style={{ margin: '5px 0', width: '200px', padding: '5px' }}
        />
        <br />
        <input
          id="destination"
          value={destination}
          type="text"
          placeholder="Destination"
          style={{ margin: '5px 0', width: '200px', padding: '5px' }}
        />
        <br />
        <button onClick={searchRoute} style={{ padding: '5px 10px' }}>
          Search
        </button>
      </div>

      <div id="map" ref={mapContainerRef}></div>
    </>
  )
}

export default MapComponent
