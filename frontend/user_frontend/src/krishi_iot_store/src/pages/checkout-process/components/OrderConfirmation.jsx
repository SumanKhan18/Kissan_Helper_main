import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderDetails }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery?.setDate(estimatedDelivery?.getDate() + 7);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} color="white" />
      </div>
      {/* Success Message */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-text-secondary">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
      </div>
      {/* Order Details Card */}
      <div className="bg-card border border-border rounded-lg p-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Order Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Order ID:</span>
                <span className="font-medium text-text-primary">{orderDetails?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Order Date:</span>
                <span className="font-medium text-text-primary">
                  {orderDetails?.timestamp?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Amount:</span>
                <span className="font-bold text-primary">
                  ₹{orderDetails?.orderSummary?.total?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Delivery Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Estimated Delivery:</span>
                <span className="font-medium text-text-primary">
                  {estimatedDelivery?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping Method:</span>
                <span className="font-medium text-text-primary">Standard Shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tracking:</span>
                <span className="font-medium text-primary">Available soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-4">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Order Processing</h4>
              <p className="text-sm text-text-secondary">
                We'll prepare your IoT devices for shipping within 1-2 business days.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Truck" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Shipping Updates</h4>
              <p className="text-sm text-text-secondary">
                You'll receive tracking information via email and SMS.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Settings" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Installation Support</h4>
              <p className="text-sm text-text-secondary">
                Our team will contact you to schedule installation service.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/user-account-dashboard">
          <Button
            variant="default"
            iconName="User"
            iconPosition="left"
            size="lg"
            className="w-full sm:w-auto"
          >
            View Order Status
          </Button>
        </Link>
        
        <Link to="/product-catalog">
          <Button
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
            size="lg"
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
      {/* Support Information */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">Need Help?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">+91 1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">support@krishiiot.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Live Chat Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;