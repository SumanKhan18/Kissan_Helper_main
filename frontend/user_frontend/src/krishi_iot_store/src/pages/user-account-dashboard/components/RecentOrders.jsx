import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentOrders = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-08-15",
      status: "delivered",
      total: "₹12,450",
      items: [
        {
          name: "Soil Moisture Sensor Kit",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
          quantity: 2
        },
        {
          name: "Weather Station Pro",
          image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=400&h=300&fit=crop",
          quantity: 1
        }
      ],
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-2024-002",
      date: "2024-08-12",
      status: "in_transit",
      total: "₹8,750",
      items: [
        {
          name: "Smart Irrigation Controller",
          image: "https://images.pixabay.com/photo/2016/11/29/13/14/agriculture-1869325_1280.jpg?w=400&h=300&fit=crop",
          quantity: 1
        }
      ],
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-08-20"
    },
    {
      id: "ORD-2024-003",
      date: "2024-08-10",
      status: "processing",
      total: "₹24,000",
      items: [
        {
          name: "Complete Farm Monitoring Kit",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
          quantity: 1
        }
      ],
      trackingNumber: "TRK456789123"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'in_transit':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in_transit':
        return 'In Transit';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Orders</h2>
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-medium text-text-primary">{order?.id}</h3>
                  <p className="text-sm text-text-secondary">
                    Ordered on {new Date(order.date)?.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                  {getStatusText(order?.status)}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">{order?.total}</p>
                {order?.estimatedDelivery && (
                  <p className="text-sm text-text-secondary">
                    Est. delivery: {new Date(order.estimatedDelivery)?.toLocaleDateString('en-IN')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-muted rounded-lg p-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{item?.name}</p>
                    <p className="text-xs text-text-secondary">Qty: {item?.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon name="Truck" size={16} />
                <span>Tracking: {order?.trackingNumber}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
                {order?.status === 'delivered' && (
                  <Button variant="ghost" size="sm">
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;