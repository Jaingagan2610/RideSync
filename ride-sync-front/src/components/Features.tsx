
import { MapPin, Clock, CreditCard, Shield } from 'lucide-react';

const features = [
  {
    name: 'Easy booking',
    description: 'Book a taxi in just a few taps. Our intuitive app makes it simple to request a ride whenever you need one.',
    icon: MapPin,
  },
  {
    name: 'Fast arrival',
    description: 'Our drivers arrive quickly. With a large network of drivers, you never have to wait long for your ride.',
    icon: Clock,
  },
  {
    name: 'Secure payments',
    description: 'Pay securely through the app. Choose from multiple payment methods for your convenience.',
    icon: CreditCard,
  },
  {
    name: 'Safety first',
    description: 'Your safety is our priority. All our drivers are vetted and our rides are tracked for your peace of mind.',
    icon: Shield,
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-taxi-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-taxi-dark sm:text-5xl">
            A better way to travel
          </p>
          <div className="mt-3 max-w-3xl mx-auto">
            <p className="mt-4 text-xl text-gray-500 lg:mx-auto">
              RideSync provides a modern solution to your transportation needs with reliable drivers and comfortable vehicles.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 h-full">
                <div className="flow-root h-full rounded-xl bg-white px-6 pb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-taxi-primary to-taxi-secondary rounded-md shadow-lg transform -translate-y-5">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-taxi-dark tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
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

export default Features;
