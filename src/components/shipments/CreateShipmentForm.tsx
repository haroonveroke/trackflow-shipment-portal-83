
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const CreateShipmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Shipment Created",
      description: "Your shipment has been created successfully",
    });
    navigate("/shipments");
  };

  const carriers = ["FedEx", "UPS", "DHL", "USPS", "Amazon Logistics"];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Create New Shipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="shipment" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="shipment">Shipment Details</TabsTrigger>
              <TabsTrigger value="origin">Origin</TabsTrigger>
              <TabsTrigger value="destination">Destination</TabsTrigger>
            </TabsList>

            <TabsContent value="shipment" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input id="tracking" placeholder="Enter tracking number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">Carrier</Label>
                  <Select>
                    <SelectTrigger id="carrier">
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {carriers.map(carrier => (
                        <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" type="number" min="0" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (in)</Label>
                  <Input id="length" type="number" min="0" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (in)</Label>
                  <Input id="width" type="number" min="0" step="0.1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the contents of this shipment" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input id="customer-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Customer Email</Label>
                  <Input id="customer-email" type="email" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="origin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin-address">Address</Label>
                <Input id="origin-address" placeholder="Street address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin-city">City</Label>
                  <Input id="origin-city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-state">State</Label>
                  <Input id="origin-state" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin-zipcode">Zip Code</Label>
                  <Input id="origin-zipcode" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-country">Country</Label>
                  <Input id="origin-country" defaultValue="USA" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="destination" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dest-address">Address</Label>
                <Input id="dest-address" placeholder="Street address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-city">City</Label>
                  <Input id="dest-city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-state">State</Label>
                  <Input id="dest-state" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-zipcode">Zip Code</Label>
                  <Input id="dest-zipcode" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-country">Country</Label>
                  <Input id="dest-country" defaultValue="USA" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => navigate("/shipments")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Shipment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateShipmentForm;
