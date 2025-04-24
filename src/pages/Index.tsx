
import React from 'react';
import Layout from '@/components/Layout';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import RecentShipments from '@/components/dashboard/RecentShipments';
import { mockShipments, getShipmentSummary } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const summary = getShipmentSummary();
  const isMobile = useIsMobile();

  const chartData = [
    { name: "Delivered", value: summary.delivered, color: "#22c55e" },
    { name: "In Transit", value: summary.inTransit, color: "#eab308" },
    { name: "Delayed", value: summary.delayed, color: "#ef4444" },
    { name: "Pending", value: summary.pending, color: "#3b82f6" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/create-shipment">
          <Button className="flex items-center gap-1">
            <Plus size={18} />
            <span className={isMobile ? "hidden" : "inline"}>New Shipment</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <DashboardMetrics summary={summary} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentShipments shipments={mockShipments} />

          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Shipment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Bar key={index} dataKey="value" fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
