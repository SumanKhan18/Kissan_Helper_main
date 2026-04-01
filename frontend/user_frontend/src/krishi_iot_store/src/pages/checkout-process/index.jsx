import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import ShippingStep from './components/ShippingStep';
import PaymentStep from './components/PaymentStep';
import ReviewStep from './components/ReviewStep';
import OrderSummaryCard from './components/OrderSummaryCard';
import OrderConfirmation from './components/OrderConfirmation';

const CheckoutProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkoutData, setCheckoutData] = useState({
    shipping: {},
    payment: {},
    review: {}
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const steps = [
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Delivery address and options',
      icon: 'MapPin'
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Payment method and billing',
      icon: 'CreditCard'
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm your order',
      icon: 'CheckCircle'
    }
  ];

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

  const orderSummary = {
    subtotal: 13997,
    shipping: 0,
    installationService: checkoutData?.shipping?.installationService ? 1999 : 0,
    tax: Math.round((13997 + (checkoutData?.shipping?.installationService ? 1999 : 0)) * 0.18),
    get total() {
      return this.subtotal + this.shipping + this.installationService + this.tax;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleStepUpdate = (stepName, data) => {
    setCheckoutData(prev => ({
      ...prev,
      [stepName]: { ...prev?.[stepName], ...data }
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = (orderData) => {
    setOrderDetails(orderData);
    setOrderPlaced(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingStep
            shippingData={checkoutData?.shipping}
            onUpdate={(data) => handleStepUpdate('shipping', data)}
            onNext={handleNextStep}
          />
        );
      case 1:
        return (
          <PaymentStep
            paymentData={checkoutData?.payment}
            onUpdate={(data) => handleStepUpdate('payment', data)}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 2:
        return (
          <ReviewStep
            orderData={checkoutData}
            onBack={handlePreviousStep}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      default:
        return null;
    }
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OrderConfirmation orderDetails={orderDetails} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Checkout</h1>
            <p className="text-text-secondary">
              Complete your purchase of agricultural IoT devices
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} steps={steps} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Steps */}
            <div className="lg:col-span-2">
              {renderCurrentStep()}
            </div>

            {/* Order Summary Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <OrderSummaryCard
                items={cartItems}
                summary={orderSummary}
              />
            </div>
          </div>

          {/* Mobile Order Summary */}
          <div className="lg:hidden mt-8">
            <OrderSummaryCard
              items={cartItems}
              summary={orderSummary}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutProcess;