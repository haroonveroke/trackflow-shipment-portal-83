
import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ShipmentSummary } from "@/lib/types";
import { Package, TruckIcon, Clock, AlertTriangle } from "lucide-react";

interface DashboardMetricsProps {
  summary: ShipmentSummary;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ summary }) => {
  const metrics = [
    {
      title: "Total Shipments",
      value: summary.totalShipments,
      icon: <Package className="h-6 w-6 text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "In Transit",
      value: summary.inTransit,
      icon: <TruckIcon className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100"
    },
    {
      title: "Delayed",
      value: summary.delayed,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      color: "bg-red-100"
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <h3 className="text-3xl font-bold mt-1">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${metric.color}`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
