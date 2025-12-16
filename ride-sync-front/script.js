const socket = io()

// Initialize the map centered at (0, 0)
const map = L.map('map').setView([0, 0], 16)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map)

// Fix for missing marker icons
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
// })
// Fix for default marker images not loading from CDN
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

const markers = {}

// Handle real-time location updates
socket.on('receive-location', data => {
  const { id, lat, lon } = data
  if (!lat || !lon) return

  if (markers[id]) {
    markers[id].setLatLng([lat, lon])
  } else {
    markers[id] = L.marker([lat, lon]).addTo(map)
  }

  if (id === socket.id) {
    map.setView([lat, lon], 16)
  }
})

// Remove marker when user disconnects
socket.on('user-disconnected', ({ id }) => {
  if (markers[id]) {
    map.removeLayer(markers[id])
    delete markers[id]
  }
})

// Track user's own location
navigator.geolocation.watchPosition(
  position => {
    const { latitude: lat, longitude: lon } = position.coords
    console.log(`📍 Lat: ${lat}, Lon: ${lon}`)
    console.log(`Google Maps: https://www.google.com/maps?q=${lat},${lon}`)
    socket.emit('send-location', { lat, lon })
  },
  error => {
    console.error('Geolocation error:', error)
  },
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
  }
)

// Routing variables and functions
let routeControl = null

// Geocode input location using Nominatim
async function geocode(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  )
  const data = await response.json()
  if (!data.length) {
    alert(`Location not found: ${address}`)
    throw new Error('Location not found')
  }
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
}

// Draw route between pickup and destination
async function searchRoute() {
  const pickup = document.getElementById('pickup')?.value
  const destination = document.getElementById('destination')?.value

  if (!pickup || !destination) {
    alert('Please fill both Pickup and Destination.')
    return
  }

  try {
    const [fromLat, fromLon] = await geocode(pickup)
    const [toLat, toLon] = await geocode(destination)

    if (routeControl) {
      map.removeControl(routeControl)
    }

    routeControl = L.Routing.control({
      waypoints: [L.latLng(fromLat, fromLon), L.latLng(toLat, toLon)],
      routeWhileDragging: false,
      show: false
    }).addTo(map)
  } catch (err) {
    console.error('Routing error:', err)
  }
}
