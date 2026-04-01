import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewStep = ({ orderData, onBack, onPlaceOrder }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptWarranty, setAcceptWarranty] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: 'Smart Soil Moisture Sensor Kit',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
      price: 2499,
      quantity: 2,
      category: 'IoT Sensors'
    },
    {
      id: 2,
      name: 'Weather Monitoring Station',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      price: 8999,
      quantity: 1,
      category: 'Smart Devices'
    }
  ];

  const shippingAddress = {
    fullName: 'Rajesh Kumar',
    addressLine1: 'Farm House, Village Khetpura',
    addressLine2: 'Near Water Tank',
    city: 'Jaipur',
    state: 'Rajasthan',
    zipCode: '302012',
    phone: '+91 98765 43210'
  };

  const paymentMethod = {
    method: 'card',
    cardDetails: {
      number: '**** **** **** 3456',
      name: 'Rajesh Kumar'
    }
  };

  const orderSummary = {
    subtotal: 13997,
    shipping: 0,
    installationService: 1999,
    tax: 2519,
    total: 18515
  };

  const handlePlaceOrder = async () => {
    if (!acceptTerms || !acceptWarranty) return;
    
    setIsPlacingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      onPlaceOrder({
        orderId: 'KIS' + Date.now(),
        items: cartItems,
        shippingAddress,
        paymentMethod,
        orderSummary,
        timestamp: new Date()
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Package" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Order Items</h3>
        </div>

        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 pb-4 border-b border-border last:border-b-0">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{item?.name}</h4>
                <p className="text-sm text-text-secondary">{item?.category}</p>
                <p className="text-sm text-text-secondary">Quantity: {item?.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">₹{(item?.price * item?.quantity)?.toLocaleString()}</p>
                <p className="text-sm text-text-secondary">₹{item?.price?.toLocaleString()} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Address */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={16} color="white" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Shipping Address</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <Icon name="Edit2" size={16} />
          </Button>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">{shippingAddress?.fullName}</h4>
          <p className="text-sm text-text-secondary">
            {shippingAddress?.addressLine1}
            {shippingAddress?.addressLine2 && `, ${shippingAddress?.addressLine2}`}
          </p>
          <p className="text-sm text-text-secondary">
            {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
          </p>
          <p className="text-sm text-text-secondary">{shippingAddress?.phone}</p>
        </div>
      </div>
      {/* Payment Method */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CreditCard" size={16} color="white" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <Icon name="Edit2" size={16} />
          </Button>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-text-primary">Credit/Debit Card</h4>
              <p className="text-sm text-text-secondary">
                {paymentMethod?.cardDetails?.number} - {paymentMethod?.cardDetails?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Receipt" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary">₹{orderSummary?.subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Shipping</span>
            <span className="text-success">
              {orderSummary?.shipping === 0 ? 'Free' : `₹${orderSummary?.shipping?.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Installation Service</span>
            <span className="text-text-primary">₹{orderSummary?.installationService?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Tax (GST 18%)</span>
            <span className="text-text-primary">₹{orderSummary?.tax?.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-text-primary">Total</span>
              <span className="text-lg font-bold text-primary">₹{orderSummary?.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="FileText" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Terms & Conditions</h3>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            description="By checking this box, you agree to our terms and conditions for purchase and use of agricultural IoT devices."
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e?.target?.checked)}
            required
          />
          
          <Checkbox
            label="I accept the Agricultural Equipment Warranty Terms"
            description="This includes warranty coverage, return policy, and technical support terms specific to IoT agricultural devices."
            checked={acceptWarranty}
            onChange={(e) => setAcceptWarranty(e?.target?.checked)}
            required
          />
        </div>

        <div className="mt-6 bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-1">Important Notice</h4>
              <p className="text-sm text-text-secondary">
                Agricultural IoT devices require proper installation and network connectivity. 
                Professional installation service is recommended for optimal performance. 
                Return policy applies within 30 days of delivery for unused items.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Place Order Button */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          size="lg"
          disabled={isPlacingOrder}
        >
          Back to Payment
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={!acceptTerms || !acceptWarranty || isPlacingOrder}
          loading={isPlacingOrder}
          iconName="CheckCircle"
          iconPosition="right"
          size="lg"
          className="min-w-48"
        >
          {isPlacingOrder ? 'Processing Order...' : `Place Order - ₹${orderSummary?.total?.toLocaleString()}`}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;