import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import LoginForm from '@/components/auth/LoginForm'
import { useState } from 'react'

const Login = () => {
  const [loginData, setLoginData] = useState(null)
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar data1={loginData} />
      <div
        onClick={() => {
          console.log('hhh', loginData)
        }}
      >
        hello
      </div>
      <div className="flex-grow flex items-center justify-center py-12">
        <LoginForm setLoginData={setLoginData} />
      </div>

      <Footer />
    </div>
  )
}

export default Login
