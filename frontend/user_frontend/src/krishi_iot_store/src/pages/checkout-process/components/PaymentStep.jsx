import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentStep = ({ paymentData, onUpdate, onNext, onBack }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentData?.method || 'card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: false
  });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay accepted',
      icon: 'CreditCard',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI ID or QR code',
      icon: 'Smartphone',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay directly from your bank account',
      icon: 'Building2',
      popular: false
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm, PhonePe, Google Pay',
      icon: 'Wallet',
      popular: false
    },
    {
      id: 'bnpl',
      name: 'Buy Now Pay Later',
      description: 'Split payment into EMIs',
      icon: 'Calendar',
      popular: false
    },
    {
      id: 'agricultural',
      name: 'Agricultural Financing',
      description: 'Seasonal payment options for farmers',
      icon: 'Sprout',
      popular: false
    }
  ];

  const bankOptions = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'pnb', label: 'Punjab National Bank' },
    { value: 'bob', label: 'Bank of Baroda' },
    { value: 'canara', label: 'Canara Bank' },
    { value: 'union', label: 'Union Bank of India' }
  ];

  const handlePaymentMethodChange = (methodId) => {
    setSelectedPaymentMethod(methodId);
    onUpdate({ method: methodId });
  };

  const handleCardDetailsChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const handleContinue = () => {
    const paymentDetails = {
      method: selectedPaymentMethod,
      ...(selectedPaymentMethod === 'card' && { cardDetails }),
      ...(selectedPaymentMethod === 'upi' && { upiId }),
      ...(selectedPaymentMethod === 'netbanking' && { selectedBank })
    };
    
    onUpdate(paymentDetails);
    onNext();
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails?.number}
              onChange={(e) => handleCardDetailsChange('number', formatCardNumber(e?.target?.value))}
              maxLength={19}
              required
            />
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="Name as on card"
              value={cardDetails?.name}
              onChange={(e) => handleCardDetailsChange('name', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={cardDetails?.expiry}
                onChange={(e) => handleCardDetailsChange('expiry', formatExpiry(e?.target?.value))}
                maxLength={5}
                required
              />
              <Input
                label="CVV"
                type="password"
                placeholder="123"
                value={cardDetails?.cvv}
                onChange={(e) => handleCardDetailsChange('cvv', e?.target?.value)}
                maxLength={4}
                required
              />
            </div>
            <Checkbox
              label="Save this card for future purchases"
              checked={cardDetails?.saveCard}
              onChange={(e) => handleCardDetailsChange('saveCard', e?.target?.checked)}
            />
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <Input
              label="UPI ID"
              type="text"
              placeholder="yourname@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e?.target?.value)}
              required
            />
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="QrCode" size={20} className="text-primary" />
                <span className="font-medium text-text-primary">Or scan QR code</span>
              </div>
              <div className="w-32 h-32 bg-white border-2 border-dashed border-border rounded-lg flex items-center justify-center mx-auto">
                <Icon name="QrCode" size={48} className="text-text-secondary" />
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <Select
              label="Select Your Bank"
              placeholder="Choose your bank"
              options={bankOptions}
              value={selectedBank}
              onChange={setSelectedBank}
              searchable
              required
            />
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay']?.map((wallet) => (
                <div
                  key={wallet}
                  className="border border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-smooth"
                >
                  <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Icon name="Wallet" size={20} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{wallet}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bnpl':
        return (
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="font-medium text-success">Instant Approval</span>
              </div>
              <p className="text-sm text-text-secondary">
                Split your payment into 3 equal EMIs with 0% interest
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-text-secondary">Today</span>
                <span className="font-medium text-text-primary">₹2,166</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-text-secondary">After 30 days</span>
                <span className="font-medium text-text-primary">₹2,166</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-text-secondary">After 60 days</span>
                <span className="font-medium text-text-primary">₹2,166</span>
              </div>
            </div>
          </div>
        );

      case 'agricultural':
        return (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Sprout" size={20} className="text-primary" />
                <span className="font-medium text-primary">Farmer-Friendly Payment</span>
              </div>
              <p className="text-sm text-text-secondary">
                Special payment terms designed for agricultural seasons
              </p>
            </div>
            <div className="space-y-3">
              <div className="border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-smooth">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">Harvest Season Payment</h4>
                    <p className="text-sm text-text-secondary">Pay after harvest (3-6 months)</p>
                  </div>
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
              </div>
              <div className="border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-smooth">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">Subsidy Integration</h4>
                    <p className="text-sm text-text-secondary">Apply government subsidies directly</p>
                  </div>
                  <Icon name="Receipt" size={20} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="CreditCard" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-smooth relative ${
                selectedPaymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handlePaymentMethodChange(method?.id)}
            >
              {method?.popular && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPaymentMethod === method?.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedPaymentMethod === method?.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <Icon name={method?.icon} size={20} className="text-primary" />
                <div>
                  <h4 className="font-medium text-text-primary">{method?.name}</h4>
                  <p className="text-sm text-text-secondary">{method?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {renderPaymentForm()}
      </div>
      {/* Security Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Shield" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Secure Payment</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={20} className="text-success" />
            <div>
              <h4 className="font-medium text-text-primary">SSL Encrypted</h4>
              <p className="text-sm text-text-secondary">256-bit encryption</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <h4 className="font-medium text-text-primary">PCI Compliant</h4>
              <p className="text-sm text-text-secondary">Secure processing</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <h4 className="font-medium text-text-primary">Money Back</h4>
              <p className="text-sm text-text-secondary">100% guarantee</p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          size="lg"
        >
          Back to Shipping
        </Button>
        <Button
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
          size="lg"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;