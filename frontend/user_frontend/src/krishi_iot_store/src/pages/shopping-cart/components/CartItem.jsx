import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 transition-smooth hover:shadow-soft">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-24 h-48 sm:h-24 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2">
                {item?.name}
              </h3>
              
              {/* Specifications */}
              <div className="space-y-1 mb-3">
                {item?.specifications?.map((spec, index) => (
                  <p key={index} className="text-sm text-text-secondary">
                    <span className="font-medium">{spec?.label}:</span> {spec?.value}
                  </p>
                ))}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${
                  item?.stock > 10 ? 'bg-success' : item?.stock > 0 ? 'bg-warning' : 'bg-error'
                }`} />
                <span className={`text-sm font-medium ${
                  item?.stock > 10 ? 'text-success' : item?.stock > 0 ? 'text-warning' : 'text-error'
                }`}>
                  {item?.stock > 10 ? 'In Stock' : item?.stock > 0 ? `Only ${item?.stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Mobile Actions */}
              <div className="flex sm:hidden items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item?.quantity - 1)}
                    disabled={item?.quantity <= 1 || isUpdating}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="font-medium text-lg min-w-[2rem] text-center">
                    {isUpdating ? '...' : item?.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item?.quantity + 1)}
                    disabled={isUpdating || item?.quantity >= item?.stock}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-lg text-primary">
                    ₹{(item?.price * item?.quantity)?.toLocaleString()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    ₹{item?.price?.toLocaleString()} each
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Price and Quantity */}
            <div className="hidden sm:flex flex-col items-end gap-4">
              <div className="text-right">
                <p className="font-heading font-bold text-xl text-primary">
                  ₹{(item?.price * item?.quantity)?.toLocaleString()}
                </p>
                <p className="text-sm text-text-secondary">
                  ₹{item?.price?.toLocaleString()} each
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="font-medium text-lg min-w-[3rem] text-center">
                  {isUpdating ? '...' : item?.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={isUpdating || item?.quantity >= item?.stock}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Bulk Discount Notification */}
          {item?.quantity >= item?.bulkDiscountThreshold && (
            <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Tag" size={16} className="text-success" />
                <p className="text-sm font-medium text-success">
                  Bulk discount applied! Save ₹{item?.bulkDiscountAmount?.toLocaleString()} on this order
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveForLater}
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
            >
              Save for Later
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-error hover:text-error hover:bg-error/10"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;