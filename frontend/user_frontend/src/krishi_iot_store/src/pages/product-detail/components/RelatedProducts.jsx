import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, title = "Related Products" }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">{title}</h2>
        <Link
          to="/product-catalog"
          className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product?.id} className="group">
            <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/product-detail?id=${product?.id}`}>
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-1">
                  {product?.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product?.discount && (
                    <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
                      -{product?.discount}%
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-surface/90 hover:bg-surface shadow-soft"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-surface/90 hover:bg-surface shadow-soft"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Stock Status */}
                {!product?.inStock && (
                  <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
                    <span className="bg-error text-error-foreground px-3 py-1 rounded text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Link
                    to={`/product-detail?id=${product?.id}`}
                    className="font-medium text-text-primary hover:text-primary transition-smooth line-clamp-2"
                  >
                    {product?.name}
                  </Link>
                  <p className="text-sm text-text-secondary mt-1">{product?.brand}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    ({product?.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    ${product?.price}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-1">
                  {product?.keyFeatures?.slice(0, 2)?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant={product?.inStock ? "default" : "outline"}
                  size="sm"
                  disabled={!product?.inStock}
                  className="w-full"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {product?.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;