import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }))
  }

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>,
  //   userType: string
  // ) => {
  //   e.preventDefault()

  //   if (formData.password !== formData.confirmPassword) {
  //     toast({
  //       title: "Passwords don't match",
  //       description: 'Please make sure your passwords match.',
  //       variant: 'destructive'
  //     })
  //     return
  //   }

  //   if (!formData.acceptTerms) {
  //     toast({
  //       title: 'Terms and conditions',
  //       description: 'Please accept the terms and conditions to continue.',
  //       variant: 'destructive'
  //     })
  //     return
  //   }

  //   setIsLoading(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     toast({
  //       title: 'Registration successful!',
  //       description: `You've registered as a ${userType}`
  //     })

  //     // Redirect to login
  //     navigate('/login')
  //   }, 1500)
  // }
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userType: 'passenger' | 'driver'
  ) => {
    e.preventDefault()
    setIsLoading(true)

    console.log('Form data:', formData)
    console.log('User type:', userType)

    const endpoint =
      userType === 'passenger'
        ? 'http://localhost:3000/user/register'
        : 'http://localhost:3000/captain/register'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Allows JWT cookies
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.msg || 'Registration failed')
      }
      console.log('Registration response:', data)
      toast({
        title: `Registration successful!`,
        description: `Welcome, ${
          userType === 'passenger'
            ? data.newUser?.name
            : data.newcaptain?.name || 'User'
        }`
      })

      if (userType === 'passenger') {
        navigate('/user-dashboard')
      } else {
        navigate('/rider-dashboard')
      }
    } catch (error: unknown) {
      toast({
        title: 'Registration failed',
        description: (error as Error).message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)] py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started with RideSync
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="text-taxi-primary hover:underline"
                    >
                      terms of service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="text-taxi-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register as Passenger'}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-taxi-primary hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="driver">
            <form onSubmit={e => handleSubmit(e, 'driver')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-name">Full Name</Label>
                  <Input
                    id="driver-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input
                    id="driver-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-password">Password</Label>
                  <Input
                    id="driver-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="driver-confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="driver-terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="driver-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="text-taxi-primary hover:underline"
                    >
                      terms of service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="text-taxi-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register as Driver'}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-taxi-primary hover:underline"
                  >
                    Login
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

export default RegisterForm
