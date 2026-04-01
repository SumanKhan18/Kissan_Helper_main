import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Active Orders",
      value: "3",
      subtitle: "2 in transit",
      icon: "Package",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Installed Devices",
      value: "12",
      subtitle: "All connected",
      icon: "Wifi",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Warranty Items",
      value: "8",
      subtitle: "2 expiring soon",
      icon: "Shield",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Total Spent",
      value: "₹45,230",
      subtitle: "This year",
      icon: "IndianRupee",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">{stat?.value}</h3>
            <p className="text-sm font-medium text-text-primary">{stat?.title}</p>
            <p className="text-xs text-text-secondary">{stat?.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;