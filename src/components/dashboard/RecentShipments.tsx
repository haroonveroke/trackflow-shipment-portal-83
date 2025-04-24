
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shipment } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface RecentShipmentsProps {
  shipments: Shipment[];
}

const statusClasses = {
  'delivered': 'bg-green-100 text-green-800 border-green-200',
  'in-transit': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'delayed': 'bg-red-100 text-red-800 border-red-200',
  'pending': 'bg-blue-100 text-blue-800 border-blue-200'
};

const RecentShipments: React.FC<RecentShipmentsProps> = ({ shipments }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleRowClick = (id: string) => {
    navigate(`/shipment/${id}`);
  };

  if (isMobile) {
    return (
      <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-4">
            {shipments.slice(0, 5).map((shipment, index) => (
              <div 
                key={shipment.id} 
                className="flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleRowClick(shipment.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{shipment.trackingNumber}</span>
                  <Badge className={statusClasses[shipment.status]}>
                    {shipment.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {shipment.destination.city}, {shipment.destination.state}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Updated {formatDistanceToNow(new Date(shipment.milestones[shipment.milestones.length - 1].timestamp), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle>Recent Shipments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking #</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.slice(0, 5).map((shipment) => (
              <TableRow 
                key={shipment.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(shipment.id)}
              >
                <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                <TableCell>
                  {shipment.destination.city}, {shipment.destination.state}
                </TableCell>
                <TableCell>
                  <Badge className={statusClasses[shipment.status]}>
                    {shipment.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">
                  {formatDistanceToNow(new Date(shipment.milestones[shipment.milestones.length - 1].timestamp), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentShipments;
