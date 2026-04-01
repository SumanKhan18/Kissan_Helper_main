import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered Successfully',
      message: 'Your order #ORD-2024-001 has been delivered to Main Farm address',
      timestamp: '2024-08-19T04:30:00Z',
      read: false,
      icon: 'Package',
      color: 'text-success bg-success/10'
    },
    {
      id: 2,
      type: 'device',
      title: 'Low Battery Alert',
      message: 'Soil Moisture Sensor - Field A battery is at 15%. Replace soon.',
      timestamp: '2024-08-19T03:15:00Z',
      read: false,
      icon: 'Battery',
      color: 'text-warning bg-warning/10'
    },
    {
      id: 3,
      type: 'price',
      title: 'Price Drop Alert',
      message: 'Advanced Drone Sprayer Kit is now ₹78,500 (was ₹85,000)',
      timestamp: '2024-08-19T02:00:00Z',
      read: true,
      icon: 'TrendingDown',
      color: 'text-accent bg-accent/10'
    },
    {
      id: 4,
      type: 'weather',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in your area tomorrow. Secure outdoor equipment.',
      timestamp: '2024-08-18T18:30:00Z',
      read: true,
      icon: 'CloudRain',
      color: 'text-primary bg-primary/10'
    },
    {
      id: 5,
      type: 'stock',
      title: 'Back in Stock',
      message: 'Smart Greenhouse Controller is now available for purchase',
      timestamp: '2024-08-18T16:45:00Z',
      read: true,
      icon: 'Package',
      color: 'text-success bg-success/10'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Aug 20, 2-4 AM. Services may be temporarily unavailable.',
      timestamp: '2024-08-18T14:00:00Z',
      read: true,
      icon: 'Settings',
      color: 'text-text-secondary bg-muted'
    },
    {
      id: 7,
      type: 'recommendation',
      title: 'Seasonal Recommendation',
      message: 'Based on your crops, consider pH sensors for optimal soil management this season.',
      timestamp: '2024-08-18T10:30:00Z',
      read: true,
      icon: 'Lightbulb',
      color: 'text-primary bg-primary/10'
    },
    {
      id: 8,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-002 has been shipped. Tracking: TRK987654321',
      timestamp: '2024-08-17T15:20:00Z',
      read: true,
      icon: 'Truck',
      color: 'text-primary bg-primary/10'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: notifications?.length },
    { id: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.read)?.length },
    { id: 'order', label: 'Orders', count: notifications?.filter(n => n?.type === 'order')?.length },
    { id: 'device', label: 'Devices', count: notifications?.filter(n => n?.type === 'device')?.length },
    { id: 'weather', label: 'Weather', count: notifications?.filter(n => n?.type === 'weather')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification?.read;
    return notification?.type === activeFilter;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hr ago`;
    } else if (diffInMinutes < 10080) {
      return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
    } else {
      return date?.toLocaleDateString('en-IN');
    }
  };

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all notifications as read');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Notifications</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-smooth ${
              activeFilter === filter?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            {filter?.label}
            {filter?.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeFilter === filter?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary'
              }`}>
                {filter?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No notifications</h3>
            <p className="text-text-secondary">
              {activeFilter === 'unread' ? "You're all caught up! No unread notifications." :"No notifications in this category."}
            </p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-lg border transition-smooth hover:shadow-soft cursor-pointer ${
                notification?.read 
                  ? 'border-border bg-card' :'border-primary/20 bg-primary/5'
              }`}
              onClick={() => markAsRead(notification?.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${notification?.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={notification?.icon} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-medium ${notification?.read ? 'text-text-primary' : 'text-primary'}`}>
                      {notification?.title}
                    </h3>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                    {notification?.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {formatTimestamp(notification?.timestamp)}
                    </span>
                    
                    {notification?.type === 'order' && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Order
                      </Button>
                    )}
                    
                    {notification?.type === 'device' && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        Check Device
                      </Button>
                    )}
                    
                    {notification?.type === 'price' && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Product
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More */}
      {filteredNotifications?.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline">
            Load More Notifications
          </Button>
        </div>
      )}
      {/* Notification Settings */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <div>
            <h3 className="font-medium text-text-primary">Notification Preferences</h3>
            <p className="text-sm text-text-secondary">
              Customize which notifications you receive and how you want to be notified
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Manage Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;