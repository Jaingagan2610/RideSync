import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import { useLocation } from 'react-router-dom'

const Index = () => {
  const location = useLocation()
  const loginDataa = location.state
  console.log('hello', loginDataa)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar data1={loginDataa} />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default Index
