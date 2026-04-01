import React from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrossSellRecommendations = ({ cartItems, onAddToCart }) => {
  const getRecommendations = () => {
    // Mock logic to suggest complementary products based on cart items
    const recommendations = [
      {
        id: 'mount-kit-1',
        name: "Universal Sensor Mounting Kit",
        price: 899,
        originalPrice: 1199,
        image: "https://images.pexels.com/photos/4022091/pexels-photo-4022091.jpeg",
        rating: 4.4,
        reviews: 67,
        description: "Weather-resistant mounting hardware for outdoor sensors",
        compatibility: ["Soil Sensors", "Weather Stations"],
        inStock: true
      },
      {
        id: 'warranty-ext-1',
        name: "2-Year Extended Warranty",
        price: 1499,
        originalPrice: 1999,
        image: "https://images.pexels.com/photos/4022093/pexels-photo-4022093.jpeg",
        rating: 4.8,
        reviews: 234,
        description: "Comprehensive coverage for all IoT devices",
        compatibility: ["All Devices"],
        inStock: true
      },
      {
        id: 'power-bank-1',
        name: "Solar Power Bank 20000mAh",
        price: 3499,
        originalPrice: 4299,
        image: "https://images.pexels.com/photos/4022089/pexels-photo-4022089.jpeg",
        rating: 4.6,
        reviews: 145,
        description: "Reliable power source for remote field installations",
        compatibility: ["Wireless Sensors", "Monitoring Systems"],
        inStock: true
      },
      {
        id: 'cable-kit-1',
        name: "Weatherproof Cable Kit",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/4022088/pexels-photo-4022088.jpeg",
        rating: 4.3,
        reviews: 89,
        description: "Heavy-duty cables for harsh agricultural environments",
        compatibility: ["Wired Sensors", "Controllers"],
        inStock: true
      }
    ];

    // Filter recommendations based on cart contents (mock logic)
    return recommendations?.slice(0, 3);
  };

  const recommendations = getRecommendations();

  if (recommendations?.length === 0) {
    return null;
  }

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Lightbulb" size={20} className="text-warning" />
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Complete Your Setup
        </h2>
      </div>
      <p className="text-text-secondary mb-6">
        Customers who bought these items also purchased:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations?.map((product) => (
          <div key={product?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary line-clamp-2">
                {product?.name}
              </h3>
              
              <p className="text-sm text-text-secondary line-clamp-2">
                {product?.description}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium">{product?.rating}</span>
                </div>
                <span className="text-xs text-text-secondary">
                  ({product?.reviews})
                </span>
              </div>
              
              {/* Compatibility Tags */}
              <div className="flex flex-wrap gap-1">
                {product?.compatibility?.slice(0, 2)?.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-primary">
                    ₹{product?.price?.toLocaleString()}
                  </span>
                  <span className="text-sm text-text-secondary line-through">
                    ₹{product?.originalPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-xs text-success font-medium">In Stock</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Bundle Offer */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Gift" size={18} className="text-accent" />
          <h3 className="font-semibold text-accent">Bundle Offer</h3>
        </div>
        <p className="text-sm text-text-secondary mb-3">
          Add any 2 accessories and save an additional 10% on your total order!
        </p>
        <div className="flex items-center gap-2">
          <Icon name="Tag" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            Use code: BUNDLE10 at checkout
          </span>
        </div>
      </div>
    </div>
  );
};

export default CrossSellRecommendations;