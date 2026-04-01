import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist = false }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showQuickView, setShowQuickView] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-warning fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return 'text-success';
      case 'low-stock':
        return 'text-warning';
      case 'out-of-stock':
        return 'text-destructive';
      default:
        return 'text-text-secondary';
    }
  };

  const getStockStatusText = (status) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product-detail?id=${product?.id}`}>
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setIsImageLoading(false)}
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product?.id)}
          className="absolute top-3 right-3 p-2 bg-surface/80 backdrop-blur-sm rounded-full shadow-soft hover:bg-surface transition-colors"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isInWishlist ? "text-destructive fill-current" : "text-text-secondary hover:text-destructive"}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {product?.discount && (
            <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
              -{product?.discount}%
            </span>
          )}
          {product?.isBestseller && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="sm"
              className="bg-surface/90 backdrop-blur-sm"
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Quick View
            </Button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-text-secondary uppercase tracking-wide mb-1">
          {product?.category}
        </div>

        {/* Product Name */}
        <Link to={`/product-detail?id=${product?.id}`}>
          <h3 className="font-medium text-text-primary line-clamp-2 hover:text-primary transition-colors mb-2">
            {product?.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-sm text-text-secondary">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Key Specifications */}
        <div className="space-y-1 mb-3">
          {product?.keySpecs?.slice(0, 2)?.map((spec, index) => (
            <div key={index} className="flex items-center text-xs text-text-secondary">
              <Icon name="Check" size={12} className="text-success mr-1 flex-shrink-0" />
              <span className="truncate">{spec}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-semibold text-text-primary">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Icon 
              name="Package" 
              size={12} 
              className={getStockStatusColor(product?.stockStatus)}
            />
            <span className={`text-xs font-medium ${getStockStatusColor(product?.stockStatus)}`}>
              {getStockStatusText(product?.stockStatus)}
            </span>
          </div>
          
          {product?.stockStatus === 'low-stock' && (
            <span className="text-xs text-warning">
              Only {product?.stockCount} left
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            disabled={product?.stockStatus === 'out-of-stock'}
            onClick={() => onAddToCart(product)}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={14}
          >
            {product?.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0"
            disabled={product?.stockStatus === 'out-of-stock'}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>

        {/* Delivery Info */}
        {product?.freeDelivery && (
          <div className="flex items-center space-x-1 mt-2 text-xs text-success">
            <Icon name="Truck" size={12} />
            <span>Free Delivery</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;