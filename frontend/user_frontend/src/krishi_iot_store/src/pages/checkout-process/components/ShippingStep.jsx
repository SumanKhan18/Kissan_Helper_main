import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingStep = ({ shippingData, onUpdate, onNext }) => {
  const [selectedAddress, setSelectedAddress] = useState(shippingData?.selectedAddressId || '');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });
  const [selectedDelivery, setSelectedDelivery] = useState(shippingData?.deliveryOption || 'standard');
  const [installationService, setInstallationService] = useState(shippingData?.installationService || false);

  const savedAddresses = [
    {
      id: '1',
      fullName: 'Rajesh Kumar',
      addressLine1: 'Farm House, Village Khetpura',
      addressLine2: 'Near Water Tank',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302012',
      phone: '+91 98765 43210',
      isDefault: true,
      type: 'Farm'
    },
    {
      id: '2',
      fullName: 'Rajesh Kumar',
      addressLine1: '45, Green Valley Apartments',
      addressLine2: 'Sector 15',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302015',
      phone: '+91 98765 43210',
      isDefault: false,
      type: 'Home'
    }
  ];

  const stateOptions = [
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 5-7 business days',
      price: 0,
      icon: 'Truck'
    },
    {
      id: 'expedited',
      name: 'Expedited Delivery',
      description: 'Delivery in 2-3 business days',
      price: 299,
      icon: 'Zap'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Equipment Shipping',
      description: 'Specialized handling for sensitive devices',
      price: 599,
      icon: 'Shield'
    }
  ];

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    onUpdate({ selectedAddressId: addressId });
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNewAddress = () => {
    if (newAddress?.fullName && newAddress?.addressLine1 && newAddress?.city && newAddress?.state && newAddress?.zipCode) {
      // In real app, this would save to backend
      setShowNewAddressForm(false);
      setSelectedAddress('new');
      onUpdate({ newAddress, selectedAddressId: 'new' });
    }
  };

  const handleDeliveryOptionChange = (optionId) => {
    setSelectedDelivery(optionId);
    onUpdate({ deliveryOption: optionId });
  };

  const handleInstallationServiceChange = (checked) => {
    setInstallationService(checked);
    onUpdate({ installationService: checked });
  };

  const handleContinue = () => {
    if (selectedAddress || showNewAddressForm) {
      onUpdate({
        selectedAddressId: selectedAddress,
        deliveryOption: selectedDelivery,
        installationService,
        ...(showNewAddressForm && { newAddress })
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Shipping Address Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Shipping Address</h3>
        </div>

        {/* Saved Addresses */}
        <div className="space-y-4 mb-6">
          {savedAddresses?.map((address) => (
            <div
              key={address?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
                selectedAddress === address?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleAddressSelect(address?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                    selectedAddress === address?.id
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedAddress === address?.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{address?.fullName}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        address?.type === 'Farm' ?'bg-success/10 text-success' :'bg-muted text-text-secondary'
                      }`}>
                        {address?.type}
                      </span>
                      {address?.isDefault && (
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      {address?.addressLine1}
                      {address?.addressLine2 && `, ${address?.addressLine2}`}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {address?.city}, {address?.state} {address?.zipCode}
                    </p>
                    <p className="text-sm text-text-secondary">{address?.phone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address */}
        {!showNewAddressForm ? (
          <Button
            variant="outline"
            onClick={() => setShowNewAddressForm(true)}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Add New Address
          </Button>
        ) : (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">Add New Address</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewAddressForm(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={newAddress?.fullName}
                onChange={(e) => handleNewAddressChange('fullName', e?.target?.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={newAddress?.phone}
                onChange={(e) => handleNewAddressChange('phone', e?.target?.value)}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Address Line 1"
                  type="text"
                  placeholder="House/Farm number, Street name"
                  value={newAddress?.addressLine1}
                  onChange={(e) => handleNewAddressChange('addressLine1', e?.target?.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Address Line 2 (Optional)"
                  type="text"
                  placeholder="Landmark, Area"
                  value={newAddress?.addressLine2}
                  onChange={(e) => handleNewAddressChange('addressLine2', e?.target?.value)}
                />
              </div>
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={newAddress?.city}
                onChange={(e) => handleNewAddressChange('city', e?.target?.value)}
                required
              />
              <Select
                label="State"
                placeholder="Select state"
                options={stateOptions}
                value={newAddress?.state}
                onChange={(value) => handleNewAddressChange('state', value)}
                required
              />
              <Input
                label="ZIP Code"
                type="text"
                placeholder="302012"
                value={newAddress?.zipCode}
                onChange={(e) => handleNewAddressChange('zipCode', e?.target?.value)}
                required
              />
              <div className="md:col-span-2">
                <Checkbox
                  label="Set as default address"
                  checked={newAddress?.isDefault}
                  onChange={(e) => handleNewAddressChange('isDefault', e?.target?.checked)}
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button onClick={handleSaveNewAddress} className="flex-1">
                Save Address
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewAddressForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Delivery Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Truck" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Delivery Options</h3>
        </div>

        <div className="space-y-4">
          {deliveryOptions?.map((option) => (
            <div
              key={option?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
                selectedDelivery === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleDeliveryOptionChange(option?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedDelivery === option?.id
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedDelivery === option?.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <Icon name={option?.icon} size={20} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-text-primary">{option?.name}</h4>
                    <p className="text-sm text-text-secondary">{option?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {option?.price === 0 ? 'Free' : `₹${option?.price}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Installation Service */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Settings" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Installation Service</h3>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            checked={installationService}
            onChange={(e) => handleInstallationServiceChange(e?.target?.checked)}
          />
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-1">
              Professional IoT Setup Service (+₹1,999)
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              Our certified technicians will install and configure your IoT devices, ensuring optimal performance and connectivity.
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Device installation and configuration</li>
              <li>• Network connectivity setup</li>
              <li>• Mobile app integration</li>
              <li>• Basic training and support</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedAddress && !showNewAddressForm}
          iconName="ArrowRight"
          iconPosition="right"
          size="lg"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShippingStep;