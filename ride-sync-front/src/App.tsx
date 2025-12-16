import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FindRidePage from './pages/FindRidePage'
import Index from './pages/Index'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import RideMap from './pages/RideMap'
import RiderDashboard from './pages/RiderDashboard'
import UserDashboard from './pages/UserDashboard'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-ride" element={<FindRidePage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/ride-map" element={<RideMap />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
