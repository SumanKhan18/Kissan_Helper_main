import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      product,
      variant: selectedVariant,
      quantity
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={16}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
            <span className="text-sm font-medium text-text-primary ml-1">
              {product?.rating}
            </span>
          </div>
          <span className="text-sm text-text-secondary">
            ({product?.reviewCount} reviews)
          </span>
        </div>
        <p className="text-text-secondary text-sm">
          SKU: {product?.sku} | Brand: {product?.brand}
        </p>
      </div>
      {/* Price and Stock */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-primary">
            ${selectedVariant?.price}
          </span>
          {selectedVariant?.originalPrice && (
            <span className="text-lg text-text-secondary line-through">
              ${selectedVariant?.originalPrice}
            </span>
          )}
          {selectedVariant?.discount && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-medium">
              {selectedVariant?.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            product?.inStock ? 'bg-success' : 'bg-error'
          }`} />
          <span className={`text-sm font-medium ${
            product?.inStock ? 'text-success' : 'text-error'
          }`}>
            {product?.inStock ? `In Stock (${product?.stockCount} available)` : 'Out of Stock'}
          </span>
        </div>
      </div>
      {/* Key Features */}
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product?.keyFeatures?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Variant Selection */}
      {product?.variants?.length > 1 && (
        <div>
          <h3 className="font-semibold text-text-primary mb-3">Model Options</h3>
          <div className="grid grid-cols-1 gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`p-3 border rounded-lg text-left transition-smooth ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-text-primary">{variant?.name}</div>
                    <div className="text-sm text-text-secondary">{variant?.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">${variant?.price}</div>
                    {variant?.originalPrice && (
                      <div className="text-sm text-text-secondary line-through">
                        ${variant?.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.maxQuantity}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="default"
            size="lg"
            onClick={handleAddToCart}
            disabled={!product?.inStock}
            className="flex-1"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onAddToWishlist}
            iconName="Heart"
            iconPosition="left"
          >
            Wishlist
          </Button>
        </div>
      </div>
      {/* Delivery Information */}
      <div className="bg-muted p-4 rounded-lg space-y-3">
        <h3 className="font-semibold text-text-primary">Delivery Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-primary" />
            <span className="text-text-secondary">Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-text-secondary">Estimated delivery: 3-5 business days</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} className="text-primary" />
            <span className="text-text-secondary">30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;