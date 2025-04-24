
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { mockShipments } from '@/lib/mockData';
import { Shipment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ShipmentTimeline from '@/components/shipments/ShipmentTimeline';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusClasses = {
  'delivered': 'bg-green-100 text-green-800 border-green-200',
  'in-transit': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'delayed': 'bg-red-100 text-red-800 border-red-200',
  'pending': 'bg-blue-100 text-blue-800 border-blue-200'
};

const ShipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const foundShipment = mockShipments.find(s => s.id === id);
    
    setTimeout(() => {
      setShipment(foundShipment || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!shipment) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Shipment Not Found</h2>
          <p className="text-gray-600 mb-6">The shipment you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shipments')}>Return to Shipments</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 mb-4" 
          onClick={() => navigate('/shipments')}
        >
          <ArrowLeft size={16} />
          <span>Back to shipments</span>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Shipment Details</h1>
            <p className="text-gray-500">Tracking #{shipment.trackingNumber}</p>
          </div>
          <Badge className={`mt-2 md:mt-0 ${statusClasses[shipment.status]}`}>
            {shipment.status.replace('-', ' ')}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="details">Shipment Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd>{shipment.customer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd>{shipment.customer.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Phone</dt>
                    <dd>{shipment.customer.phone}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Shipment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Carrier</dt>
                    <dd>{shipment.carrier}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Weight</dt>
                    <dd>{shipment.weight} lbs</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Dimensions</dt>
                    <dd>{shipment.dimensions.length}" × {shipment.dimensions.width}" × {shipment.dimensions.height}"</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Created Date</dt>
                    <dd>{format(new Date(shipment.createdAt), 'MMM d, yyyy')}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Origin Address</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <div>{shipment.origin.address}</div>
                  <div>{shipment.origin.city}, {shipment.origin.state} {shipment.origin.zipCode}</div>
                  <div>{shipment.origin.country}</div>
                </address>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Destination Address</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <div>{shipment.destination.address}</div>
                  <div>{shipment.destination.city}, {shipment.destination.state} {shipment.destination.zipCode}</div>
                  <div>{shipment.destination.country}</div>
                </address>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">Estimated Delivery Date</dt>
                  <dd>{format(new Date(shipment.estimatedDelivery), 'MMM d, yyyy')}</dd>
                </div>
                {shipment.actualDelivery && (
                  <div>
                    <dt className="text-sm text-gray-500">Actual Delivery Date</dt>
                    <dd>{format(new Date(shipment.actualDelivery), 'MMM d, yyyy')}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-gray-500">Description</dt>
                  <dd>{shipment.description}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card className="mt-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Shipment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ShipmentTimeline milestones={shipment.milestones} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ShipmentDetail;
