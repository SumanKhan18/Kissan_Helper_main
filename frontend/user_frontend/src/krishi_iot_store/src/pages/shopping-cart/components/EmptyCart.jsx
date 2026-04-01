import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: "Soil Moisture Sensor Kit",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Weather Station Pro",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: "Smart Irrigation Controller",
      price: 5499,
      originalPrice: 6499,
      image: "https://images.pexels.com/photos/4022090/pexels-photo-4022090.jpeg",
      rating: 4.6,
      reviews: 156
    }
  ];

  const categories = [
    { name: "IoT Sensors", icon: "Cpu", path: "/product-catalog?category=sensors" },
    { name: "Smart Devices", icon: "Smartphone", path: "/product-catalog?category=devices" },
    { name: "Farming Kits", icon: "Package", path: "/product-catalog?category=kits" },
    { name: "Monitoring Systems", icon: "Monitor", path: "/product-catalog?category=monitoring" }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-text-primary mb-3">
          Your cart is empty
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Start building your smart farming setup by adding IoT devices and sensors to your cart.
        </p>
      </div>
      {/* Quick Category Access */}
      <div className="mb-12">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-6">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {categories?.map((category) => (
            <Link
              key={category?.name}
              to={category?.path}
              className="p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-smooth group"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-smooth">
                <Icon name={category?.icon} size={24} className="text-primary" />
              </div>
              <p className="font-medium text-sm text-text-primary group-hover:text-primary transition-smooth">
                {category?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* Recommended Products */}
      <div className="mb-8">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-6">
          Recommended for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {recommendedProducts?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="font-medium text-text-primary mb-2 line-clamp-2">
                {product?.name}
              </h4>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium">{product?.rating}</span>
                </div>
                <span className="text-xs text-text-secondary">
                  ({product?.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="font-heading font-bold text-primary">
                  ₹{product?.price?.toLocaleString()}
                </span>
                <span className="text-sm text-text-secondary line-through">
                  ₹{product?.originalPrice?.toLocaleString()}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Plus"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="ArrowLeft"
          iconPosition="left"
          asChild
        >
          <Link to="/product-catalog">
            Continue Shopping
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconName="Home"
          iconPosition="left"
          asChild
        >
          <Link to="/home-page">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;