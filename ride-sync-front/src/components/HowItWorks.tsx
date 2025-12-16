
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const steps = [
  { 
    id: '01', 
    title: 'Create an account', 
    description: 'Sign up as a passenger or driver in just a few minutes.',
    action: 'Register',
    link: '/register'
  },
  { 
    id: '02', 
    title: 'Enter your location', 
    description: 'Let us know where you are and where you want to go.',
    action: 'Find a ride',
    link: '/find-ride'
  },
  { 
    id: '03', 
    title: 'Get matched with a driver', 
    description: 'We\'ll connect you with the closest available driver.',
    action: 'Learn more',
    link: '/about'
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-r from-taxi-light to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-taxi-primary font-semibold tracking-wide uppercase">Getting Started</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-taxi-dark sm:text-5xl">
            How RideSync works
          </p>
          <p className="mt-6 max-w-2xl text-xl text-gray-500 mx-auto">
            Start riding with us in three simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-50">
                <div className="px-8 py-10">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-taxi-primary to-taxi-secondary bg-clip-text text-transparent">{step.id}</span>
                    <h3 className="ml-4 text-2xl font-bold text-taxi-dark">{step.title}</h3>
                  </div>
                  <p className="mt-6 text-base text-gray-500">{step.description}</p>
                  <div className="mt-8">
                    <Link to={step.link}>
                      <Button variant={index === 0 ? "default" : "outline"} 
                        className={index === 0 ? 
                          "bg-taxi-primary hover:bg-taxi-secondary text-white transition-all duration-300" : 
                          "text-taxi-primary border-taxi-primary hover:bg-taxi-primary/10 transition-all duration-300"}>
                        {step.action}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
