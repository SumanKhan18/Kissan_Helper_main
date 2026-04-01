import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Smart Soil Moisture Sensor Pro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop",
      badge: "Best Seller",
      badgeColor: "success",
      features: ["Real-time monitoring", "Mobile app", "Weather resistant"],
      inStock: true,
      category: "IoT Sensors"
    },
    {
      id: 2,
      name: "Automated Irrigation Controller",
      price: 299.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=300&h=300&fit=crop",
      badge: "New Arrival",
      badgeColor: "primary",
      features: ["Zone control", "Smart scheduling", "Water savings"],
      inStock: true,
      category: "Smart Devices"
    },
    {
      id: 3,
      name: "Complete Farm Monitoring Kit",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.7,
      reviews: 67,
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/drone-1846734_1280.jpg?w=300&h=300&fit=crop",
      badge: "20% Off",
      badgeColor: "accent",
      features: ["Multiple sensors", "Cloud dashboard", "Expert setup"],
      inStock: true,
      category: "Complete Kits"
    },
    {
      id: 4,
      name: "Weather Station Pro",
      price: 449.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop",
      badge: "Popular",
      badgeColor: "secondary",
      features: ["Multi-parameter", "Long range", "Solar powered"],
      inStock: true,
      category: "IoT Sensors"
    },
    {
      id: 5,
      name: "Smart Greenhouse Controller",
      price: 599.99,
      originalPrice: 699.99,
      rating: 4.8,
      reviews: 92,
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=300&h=300&fit=crop",
      badge: "Featured",
      badgeColor: "primary",
      features: ["Climate control", "Automated vents", "Remote access"],
      inStock: false,
      category: "Smart Devices"
    },
    {
      id: 6,
      name: "Precision Agriculture Drone",
      price: 1299.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 43,
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/drone-1846734_1280.jpg?w=300&h=300&fit=crop",
      badge: "Premium",
      badgeColor: "accent",
      features: ["4K camera", "GPS mapping", "Crop analysis"],
      inStock: true,
      category: "Smart Devices"
    }
  ];

  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const totalSlides = Math.ceil(products?.length / itemsPerSlide?.desktop);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getBadgeColors = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
              Featured Products
            </h2>
            <p className="text-text-secondary">
              Discover our most popular and highly-rated agricultural IoT solutions
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.slice(slideIndex * itemsPerSlide?.desktop, (slideIndex + 1) * itemsPerSlide?.desktop)?.map((product) => (
                      <div key={product?.id} className="group">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1">
                          {/* Product Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={product?.image}
                              alt={`${product?.name} - ${product?.category} for smart farming`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Badge */}
                            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeColors(product?.badgeColor)}`}>
                              {product?.badge}
                            </div>

                            {/* Stock Status */}
                            {!product?.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                                  Out of Stock
                                </span>
                              </div>
                            )}

                            {/* Quick Actions */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex flex-col space-y-2">
                                <Button variant="ghost" size="icon" className="bg-card/90 backdrop-blur-sm">
                                  <Icon name="Heart" size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="bg-card/90 backdrop-blur-sm">
                                  <Icon name="Eye" size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            {/* Category */}
                            <div className="text-xs text-text-secondary mb-1">
                              {product?.category}
                            </div>

                            {/* Product Name */}
                            <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              <Link to="/product-detail">
                                {product?.name}
                              </Link>
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(product?.rating)}
                              </div>
                              <span className="text-sm text-text-secondary">
                                {product?.rating} ({product?.reviews})
                              </span>
                            </div>

                            {/* Features */}
                            <div className="space-y-1 mb-3">
                              {product?.features?.slice(0, 2)?.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                                  <span className="text-xs text-text-secondary">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-text-primary">
                                  ${product?.price}
                                </span>
                                {product?.originalPrice && (
                                  <span className="text-sm text-text-secondary line-through">
                                    ${product?.originalPrice}
                                  </span>
                                )}
                              </div>
                              {product?.originalPrice && (
                                <span className="text-xs text-success font-medium">
                                  Save ${(product?.originalPrice - product?.price)?.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Add to Cart Button */}
                            <Button
                              variant={product?.inStock ? "default" : "outline"}
                              size="sm"
                              fullWidth
                              disabled={!product?.inStock}
                              iconName={product?.inStock ? "ShoppingCart" : "AlertCircle"}
                              iconPosition="left"
                            >
                              {product?.inStock ? "Add to Cart" : "Notify Me"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-6 md:hidden">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
            <Link to="/product-catalog" className="flex items-center justify-center w-full">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;