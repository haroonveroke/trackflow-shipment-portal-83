
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Shipment, ShipmentStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ShipmentListProps {
  shipments: Shipment[];
}

const statusClasses = {
  'delivered': 'bg-green-100 text-green-800 border-green-200',
  'in-transit': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'delayed': 'bg-red-100 text-red-800 border-red-200',
  'pending': 'bg-blue-100 text-blue-800 border-blue-200'
};

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "delivered", label: "Delivered" },
  { value: "in-transit", label: "In Transit" },
  { value: "delayed", label: "Delayed" },
  { value: "pending", label: "Pending" }
];

const ShipmentList: React.FC<ShipmentListProps> = ({ shipments }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleRowClick = (id: string) => {
    navigate(`/shipment/${id}`);
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>All Shipments</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by tracking #, customer or destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64 flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <div className="space-y-4">
            {filteredShipments.map((shipment) => (
              <div 
                key={shipment.id} 
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleRowClick(shipment.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{shipment.trackingNumber}</p>
                    <p className="text-sm text-gray-600">{shipment.customer.name}</p>
                  </div>
                  <Badge className={statusClasses[shipment.status]}>
                    {shipment.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="text-gray-500">From:</span> {shipment.origin.city}, {shipment.origin.state}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">To:</span> {shipment.destination.city}, {shipment.destination.state}
                  </p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Updated {formatDistanceToNow(new Date(shipment.milestones[shipment.milestones.length - 1].timestamp), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow 
                  key={shipment.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(shipment.id)}
                >
                  <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                  <TableCell>{shipment.customer.name}</TableCell>
                  <TableCell>{shipment.origin.city}, {shipment.origin.state}</TableCell>
                  <TableCell>{shipment.destination.city}, {shipment.destination.state}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
};

export default ShipmentList;
