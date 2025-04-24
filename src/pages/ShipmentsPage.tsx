
import React from 'react';
import Layout from '@/components/Layout';
import ShipmentList from '@/components/shipments/ShipmentList';
import { mockShipments } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShipmentsPage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Link to="/create-shipment">
          <Button className="flex items-center gap-1">
            <Plus size={18} />
            <span>New Shipment</span>
          </Button>
        </Link>
      </div>

      <ShipmentList shipments={mockShipments} />
    </Layout>
  );
};

export default ShipmentsPage;
