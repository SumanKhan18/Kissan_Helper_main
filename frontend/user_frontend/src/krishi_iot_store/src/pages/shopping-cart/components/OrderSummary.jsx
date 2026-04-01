import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode, 
  onShippingChange,
  estimatedDelivery 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const shippingOptions = [
    { 
      value: 'standard', 
      label: 'Standard Delivery (5-7 days)', 
      description: 'Free shipping on orders above ₹2,000' 
    },
    { 
      value: 'express', 
      label: 'Express Delivery (2-3 days)', 
      description: 'Additional ₹200' 
    },
    { 
      value: 'priority', 
      label: 'Priority Delivery (Next day)', 
      description: 'Additional ₹500' 
    }
  ];

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    const validCodes = ['FARM10', 'SENSOR20', 'BULK15'];
    if (validCodes?.includes(promoCode?.toUpperCase())) {
      onApplyPromoCode(promoCode);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try FARM10, SENSOR20, or BULK15');
    }

    setIsApplyingPromo(false);
  };

  const handleShippingChange = (value) => {
    setSelectedShipping(value);
    onShippingChange(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="font-heading font-bold text-xl text-text-primary mb-6">
        Order Summary
      </h2>
      {/* Shipping Options */}
      <div className="mb-6">
        <Select
          label="Shipping Method"
          options={shippingOptions}
          value={selectedShipping}
          onChange={handleShippingChange}
        />
        
        {estimatedDelivery && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={16} className="text-primary" />
              <p className="text-sm font-medium text-text-primary">
                Estimated Delivery: {estimatedDelivery}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            loading={isApplyingPromo}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Try: FARM10, SENSOR20, or BULK15
        </p>
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium">₹{subtotal?.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `₹${shipping?.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tax (GST 18%)</span>
          <span className="font-medium">₹{tax?.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <span>Discount Applied</span>
            <span className="font-medium">-₹{discount?.toLocaleString()}</span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-lg">Total</span>
            <span className="font-heading font-bold text-xl text-primary">
              ₹{total?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* Savings Information */}
      {discount > 0 && (
        <div className="mb-6 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <p className="text-sm font-medium text-success">
              You're saving ₹{discount?.toLocaleString()} on this order!
            </p>
          </div>
        </div>
      )}
      {/* Security Badge */}
      <div className="mb-6 p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <p className="text-sm text-text-secondary">
            Secure checkout with 256-bit SSL encryption
          </p>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        iconName="CreditCard"
        iconPosition="left"
        className="font-semibold"
      >
        Proceed to Checkout
      </Button>
      {/* Payment Methods */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary mb-2">We accept</p>
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            UPI
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            NB
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;