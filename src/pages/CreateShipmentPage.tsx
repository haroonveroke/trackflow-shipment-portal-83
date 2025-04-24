
import React from 'react';
import Layout from '@/components/Layout';
import CreateShipmentForm from '@/components/shipments/CreateShipmentForm';

const CreateShipmentPage = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Create New Shipment</h1>
      <CreateShipmentForm />
    </Layout>
  );
};

export default CreateShipmentPage;
