import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeviceManagement = () => {
  const devices = [
    {
      id: 1,
      name: "Soil Moisture Sensor - Field A",
      type: "Sensor",
      status: "online",
      batteryLevel: 85,
      lastUpdate: "2024-08-19T05:30:00Z",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
      location: "North Field",
      warrantyExpiry: "2025-08-15"
    },
    {
      id: 2,
      name: "Weather Station Pro",
      type: "Weather Monitor",
      status: "online",
      batteryLevel: 92,
      lastUpdate: "2024-08-19T06:00:00Z",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=400&h=300&fit=crop",
      location: "Central Farm",
      warrantyExpiry: "2026-03-20"
    },
    {
      id: 3,
      name: "Smart Irrigation Controller",
      type: "Controller",
      status: "offline",
      batteryLevel: 15,
      lastUpdate: "2024-08-18T14:30:00Z",
      image: "https://images.pixabay.com/photo/2016/11/29/13/14/agriculture-1869325_1280.jpg?w=400&h=300&fit=crop",
      location: "South Field",
      warrantyExpiry: "2025-12-10"
    },
    {
      id: 4,
      name: "pH Sensor Kit",
      type: "Sensor",
      status: "online",
      batteryLevel: 68,
      lastUpdate: "2024-08-19T05:45:00Z",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
      location: "Greenhouse 1",
      warrantyExpiry: "2025-09-05"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success';
      case 'offline':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-error';
  };

  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hr ago`;
    } else {
      return date?.toLocaleDateString('en-IN');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Device Management</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Device
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {devices?.map((device) => (
          <div key={device?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={device?.image}
                  alt={device?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-text-primary truncate">{device?.name}</h3>
                    <p className="text-sm text-text-secondary">{device?.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${device?.status === 'online' ? 'bg-success' : 'bg-error'}`}></div>
                    <span className={`text-xs font-medium ${getStatusColor(device?.status)}`}>
                      {device?.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Location:</span>
                    <span className="text-text-primary">{device?.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Battery:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getBatteryColor(device?.batteryLevel)} bg-current transition-all`}
                          style={{ width: `${device?.batteryLevel}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${getBatteryColor(device?.batteryLevel)}`}>
                        {device?.batteryLevel}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Last Update:</span>
                    <span className="text-text-primary">{formatLastUpdate(device?.lastUpdate)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Warranty:</span>
                    <span className="text-text-primary">
                      {new Date(device.warrantyExpiry)?.toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Settings" size={14} className="mr-1" />
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Icon name="BarChart3" size={14} className="mr-1" />
                    View Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-3">
          <Icon name="Smartphone" size={20} className="text-primary" />
          <div>
            <h3 className="font-medium text-text-primary">Mobile App Integration</h3>
            <p className="text-sm text-text-secondary">
              Download the Krishi IoT mobile app to monitor your devices on the go
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Download App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;