
export type ShipmentStatus = 'delivered' | 'in-transit' | 'delayed' | 'pending';

export interface ShipmentMilestone {
  id: string;
  title: string;
  timestamp: Date;
  location: string;
  description: string;
  completed: boolean;
  status: ShipmentStatus;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  origin: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  destination: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  carrier: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  status: ShipmentStatus;
  createdAt: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  description: string;
  milestones: ShipmentMilestone[];
}

export interface ShipmentSummary {
  totalShipments: number;
  delivered: number;
  inTransit: number;
  delayed: number;
  pending: number;
}
