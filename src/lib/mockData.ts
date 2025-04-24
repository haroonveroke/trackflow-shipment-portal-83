import { Shipment, ShipmentSummary } from "./types";

// Helper function to get random date in the past
const getRandomPastDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  return date;
};

// Helper function to get random date in the future
const getRandomFutureDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * days));
  return date;
};

export const generateMockShipments = (count: number = 20): Shipment[] => {
  const statusOptions: Shipment['status'][] = ['delivered', 'in-transit', 'delayed', 'pending'];
  const carriers = ["FedEx", "UPS", "DHL", "USPS", "Amazon Logistics"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];
  
  return Array(count).fill(0).map((_, index) => {
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const originCity = cities[Math.floor(Math.random() * cities.length)];
    const originState = states[cities.indexOf(originCity)];
    const destCity = cities[Math.floor(Math.random() * cities.length)];
    const destState = states[cities.indexOf(destCity)];
    
    // Generate random milestones
    const numMilestones = Math.floor(Math.random() * 4) + 2; // 2-5 milestones
    const milestones = [];
    
    // Always add "Order Placed" milestone
    milestones.push({
      id: `ms-${index}-0`,
      title: "Order Placed",
      timestamp: getRandomPastDate(14),
      location: `${originCity}, ${originState}`,
      description: "Shipment order was placed",
      completed: true,
      status: 'pending'
    });

    // Add processing milestone
    milestones.push({
      id: `ms-${index}-1`,
      title: "Processing",
      timestamp: getRandomPastDate(10),
      location: `${originCity}, ${originState}`,
      description: "Shipment is being processed",
      completed: status !== 'pending',
      status: 'pending'
    });

    // Add in-transit milestones
    if (status !== 'pending') {
      milestones.push({
        id: `ms-${index}-2`,
        title: "In Transit",
        timestamp: getRandomPastDate(7),
        location: "Transit Hub",
        description: "Shipment is in transit",
        completed: status !== 'pending',
        status: 'in-transit'
      });
    }

    // Add out for delivery milestone
    if (status === 'delivered' || status === 'delayed') {
      milestones.push({
        id: `ms-${index}-3`,
        title: status === 'delayed' ? "Delivery Delayed" : "Out for Delivery",
        timestamp: getRandomPastDate(3),
        location: `${destCity}, ${destState}`,
        description: status === 'delayed' ? "Delivery has been delayed" : "Shipment is out for delivery",
        completed: true,
        status: status === 'delayed' ? 'delayed' : 'in-transit'
      });
    }

    // Add delivered milestone
    if (status === 'delivered') {
      milestones.push({
        id: `ms-${index}-4`,
        title: "Delivered",
        timestamp: getRandomPastDate(1),
        location: `${destCity}, ${destState}`,
        description: "Shipment has been delivered",
        completed: true,
        status: 'delivered'
      });
    }

    return {
      id: `ship-${index}`,
      trackingNumber: `TRK${100000 + index}`,
      customer: {
        name: `Customer ${index + 1}`,
        email: `customer${index + 1}@example.com`,
        phone: `555-${(100 + index).toString().padStart(4, '0')}`
      },
      origin: {
        address: `${1000 + index} Main St`,
        city: originCity,
        state: originState,
        zipCode: `${10000 + index}`,
        country: "USA"
      },
      destination: {
        address: `${2000 + index} Oak St`,
        city: destCity,
        state: destState,
        zipCode: `${20000 + index}`,
        country: "USA"
      },
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      weight: Math.floor(Math.random() * 50) + 1,
      dimensions: {
        length: Math.floor(Math.random() * 30) + 10,
        width: Math.floor(Math.random() * 20) + 5,
        height: Math.floor(Math.random() * 15) + 5
      },
      status,
      createdAt: getRandomPastDate(14),
      estimatedDelivery: getRandomFutureDate(10),
      actualDelivery: status === 'delivered' ? getRandomPastDate(2) : undefined,
      description: `Shipment ${index + 1} containing various items`,
      milestones
    };
  });
};

// Mock data for shipments
export const mockShipments: Shipment[] = generateMockShipments();

// Function to calculate shipment summary
export const getShipmentSummary = (): ShipmentSummary => {
  const totalShipments = mockShipments.length;
  const delivered = mockShipments.filter(s => s.status === "delivered").length;
  const inTransit = mockShipments.filter(s => s.status === "in-transit").length;
  const delayed = mockShipments.filter(s => s.status === "delayed").length;
  const pending = mockShipments.filter(s => s.status === "pending").length;

  return {
    totalShipments,
    delivered,
    inTransit,
    delayed,
    pending
  };
};
