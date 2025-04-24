
import React from 'react';
import { ShipmentMilestone } from '@/lib/types';
import { format } from 'date-fns';

interface ShipmentTimelineProps {
  milestones: ShipmentMilestone[];
}

const statusColors = {
  'delivered': 'bg-green-500',
  'in-transit': 'bg-yellow-500',
  'delayed': 'bg-red-500',
  'pending': 'bg-blue-500'
};

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ milestones }) => {
  // Sort milestones by timestamp, newest first
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-4 before:w-0.5 before:bg-gray-200">
      {sortedMilestones.map((milestone, index) => (
        <div key={milestone.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <div className={`absolute left-0 p-1 -translate-x-1/2 ${milestone.completed ? statusColors[milestone.status] : 'bg-gray-400'} rounded-full timeline-dot`}>
            {milestone.completed && (
              <span className="block w-2 h-2 bg-white rounded-full"></span>
            )}
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <h3 className="font-medium">{milestone.title}</h3>
              <time className="text-xs text-gray-500">
                {format(new Date(milestone.timestamp), 'MMM d, yyyy • h:mm a')}
              </time>
            </div>
            <p className="text-sm mb-1">{milestone.location}</p>
            <p className="text-sm text-gray-600">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTimeline;
