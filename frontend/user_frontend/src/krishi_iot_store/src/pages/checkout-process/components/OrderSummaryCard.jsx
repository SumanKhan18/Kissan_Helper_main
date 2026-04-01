import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummaryCard = ({ items, summary, className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 sticky top-24 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Order Summary</h3>
      </div>
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary text-sm truncate">
                {item?.name}
              </h4>
              <p className="text-xs text-text-secondary">
                Qty: {item?.quantity} × ₹{item?.price?.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-text-primary text-sm">
                ₹{(item?.price * item?.quantity)?.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Breakdown */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Subtotal</span>
          <span className="text-sm text-text-primary">₹{summary?.subtotal?.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Shipping</span>
          <span className="text-sm text-success">
            {summary?.shipping === 0 ? 'Free' : `₹${summary?.shipping?.toLocaleString()}`}
          </span>
        </div>
        
        {summary?.installationService > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Installation Service</span>
            <span className="text-sm text-text-primary">₹{summary?.installationService?.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Tax (GST 18%)</span>
          <span className="text-sm text-text-primary">₹{summary?.tax?.toLocaleString()}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-primary">Total</span>
            <span className="font-bold text-primary text-lg">₹{summary?.total?.toLocaleString()}</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} className="text-success" />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;