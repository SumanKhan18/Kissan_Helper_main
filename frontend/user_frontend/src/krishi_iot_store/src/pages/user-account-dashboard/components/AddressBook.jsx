import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddressBook = () => {
  const [addresses] = useState([
    {
      id: 1,
      type: "primary",
      label: "Main Farm",
      name: "Rajesh Kumar",
      address: "Plot No. 45, Village Khetpura",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302012",
      phone: "+91 98765 43210",
      isDefault: true,
      notes: "Main entrance near water tank. Delivery between 8 AM - 6 PM only."
    },
    {
      id: 2,
      type: "secondary",
      label: "North Field",
      name: "Rajesh Kumar",
      address: "Survey No. 123, Khasra No. 456",
      city: "Sikar",
      state: "Rajasthan",
      pincode: "332001",
      phone: "+91 98765 43210",
      isDefault: false,
      notes: "Remote location. Contact before delivery. GPS: 27.6094° N, 75.1399° E"
    },
    {
      id: 3,
      type: "office",
      label: "Cooperative Office",
      name: "Kisan Sahakari Samiti",
      address: "Near Bus Stand, Main Market",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302015",
      phone: "+91 98765 43211",
      isDefault: false,
      notes: "Office hours: 9 AM - 5 PM. Closed on Sundays."
    }
  ]);

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'primary':
        return 'Home';
      case 'secondary':
        return 'MapPin';
      case 'office':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'secondary':
        return 'text-success bg-success/10';
      case 'office':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Address Book</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Address
        </Button>
      </div>
      <div className="space-y-4">
        {addresses?.map((address) => (
          <div key={address?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${getAddressTypeColor(address?.type)} flex items-center justify-center`}>
                  <Icon name={getAddressTypeIcon(address?.type)} size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-text-primary">{address?.label}</h3>
                    {address?.isDefault && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{address?.name}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Address</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {address?.address}<br />
                  {address?.city}, {address?.state} - {address?.pincode}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Contact</h4>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Icon name="Phone" size={14} />
                  <span>{address?.phone}</span>
                </div>
              </div>
            </div>

            {address?.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Delivery Notes</h4>
                <p className="text-sm text-text-secondary bg-muted p-3 rounded-lg">
                  {address?.notes}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              {!address?.isDefault && (
                <Button variant="outline" size="sm">
                  Set as Default
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Icon name="MapPin" size={14} className="mr-1" />
                View on Map
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Copy" size={14} className="mr-1" />
                Copy Address
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary mb-1">Delivery Information</h3>
            <p className="text-sm text-text-secondary">
              For remote farm locations, please provide GPS coordinates and contact details. 
              Our delivery team will coordinate with you for the best delivery time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;