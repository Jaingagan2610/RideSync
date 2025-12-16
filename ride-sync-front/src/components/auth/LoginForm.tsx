import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface LoginFormProps {
  setLoginData: (data: unknown) => void // Replace `any` with proper type
}

const LoginForm: React.FC<LoginFormProps> = ({ setLoginData }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const navigate = useNavigate()

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userType: 'passenger' | 'driver'
  ) => {
    e.preventDefault()
    setIsLoading(true)

    const endpoint =
      userType === 'passenger'
        ? 'http://localhost:3000/user/login'
        : 'http://localhost:3000/captain/login'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed')
      }
      console.log('dataa', data)
      setLoginData(data)

      toast({
        title: 'Login successful!',
        description: `Welcome, ${
          userType === 'passenger'
            ? data.user?.name
            : data.captain?.name || 'User'
        }`
      })
      navigate(
        userType === 'passenger' ? '/user-dashboard' : '/rider-dashboard',
        { state: data }
      )
    } catch (error) {
      toast({
        title: 'Login failed',
        description: (error as Error).message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Login to continue using RideSync
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="passenger" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="passenger">Passenger</TabsTrigger>
            <TabsTrigger value="driver">Driver</TabsTrigger>
          </TabsList>
          <TabsContent value="passenger">
            <form onSubmit={e => handleSubmit(e, 'passenger')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={userCredentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-taxi-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={userCredentials.password}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login as Passenger'}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-taxi-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="driver">
            <form onSubmit={e => handleSubmit(e, 'driver')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input
                    id="driver-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={userCredentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-taxi-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="driver-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={userCredentials.password}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login as Driver'}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-taxi-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default LoginForm
