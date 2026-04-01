import React from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const SavedForLater = ({ savedItems, onMoveToCart, onRemoveFromSaved }) => {
  if (savedItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-bold text-xl text-text-primary mb-6">
        Saved for Later ({savedItems?.length})
      </h2>
      <div className="space-y-4">
        {savedItems?.map((item) => (
          <div key={item?.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-full sm:w-20 h-32 sm:h-20 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                {item?.name}
              </h3>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="font-heading font-bold text-primary">
                  ₹{item?.price?.toLocaleString()}
                </span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${
                    item?.stock > 0 ? 'bg-success' : 'bg-error'
                  }`} />
                  <span className={`text-sm font-medium ${
                    item?.stock > 0 ? 'text-success' : 'text-error'
                  }`}>
                    {item?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => onMoveToCart(item?.id)}
                  disabled={item?.stock === 0}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onRemoveFromSaved(item?.id)}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;