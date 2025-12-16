
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock taxi data
const taxisData = [
  {
    id: 1,
    driverName: "John Smith",
    carModel: "Toyota Camry",
    rating: 4.8,
    price: 12.5,
    eta: 3,
    distance: 0.7,
  },
  {
    id: 2,
    driverName: "Sarah Johnson",
    carModel: "Honda Civic",
    rating: 4.9,
    price: 11.75,
    eta: 5,
    distance: 1.2,
  },
  {
    id: 3,
    driverName: "Michael Lee",
    carModel: "Tesla Model 3",
    rating: 4.7,
    price: 15.0,
    eta: 8,
    distance: 1.8,
    isEco: true,
  },
  {
    id: 4,
    driverName: "Emily Davis",
    carModel: "Hyundai Sonata",
    rating: 4.6,
    price: 10.5,
    eta: 10,
    distance: 2.3,
  },
];

const AvailableTaxis = () => {
  const [taxis, setTaxis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get taxis
    const fetchTaxis = async () => {
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => {
        setTaxis(taxisData);
        setIsLoading(false);
      }, 1500);
    };

    fetchTaxis();
  }, []);

  const handleBookTaxi = (taxiId: number) => {
    const selectedTaxi = taxis.find(taxi => taxi.id === taxiId);
    
    if (selectedTaxi) {
      toast({
        title: "Taxi booked successfully!",
        description: `${selectedTaxi.driverName} will arrive in ${selectedTaxi.eta} minutes`,
      });
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-taxi-dark mb-6">Available Taxis</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="w-full animate-pulse">
                <CardContent className="h-32 bg-gray-200"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {taxis.map(taxi => (
              <Card key={taxi.id} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{taxi.driverName}</CardTitle>
                    <CardDescription>{taxi.carModel}</CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span>{taxi.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="font-semibold">${taxi.price.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ETA</div>
                      <div className="font-semibold flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-taxi-primary" />
                        {taxi.eta} min
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Distance</div>
                      <div className="font-semibold flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-taxi-primary" />
                        {taxi.distance} mi
                      </div>
                    </div>
                  </div>
                  {taxi.isEco && (
                    <Badge className="mt-2 bg-green-500 hover:bg-green-600">Eco-friendly</Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-taxi-primary hover:bg-taxi-secondary"
                    onClick={() => handleBookTaxi(taxi.id)}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTaxis;
