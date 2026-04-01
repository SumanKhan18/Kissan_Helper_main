import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryCards = () => {
  const categories = [
    {
      id: 1,
      title: "IoT Sensors",
      description: "Smart sensors for soil, weather, and crop monitoring with real-time data collection",
      icon: "Cpu",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=400&h=300&fit=crop",
      productCount: "150+ Products",
      features: ["Soil Monitoring", "Weather Tracking", "Crop Health"],
      color: "primary"
    },
    {
      id: 2,
      title: "Smart Devices",
      description: "Automated irrigation systems, drones, and smart controllers for precision farming",
      icon: "Smartphone",
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/drone-1846734_1280.jpg?w=400&h=300&fit=crop",
      productCount: "200+ Products",
      features: ["Irrigation Control", "Drone Monitoring", "Automation"],
      color: "secondary"
    },
    {
      id: 3,
      title: "Complete Kits",
      description: "Ready-to-deploy farming kits with sensors, controllers, and monitoring systems",
      icon: "Package",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
      productCount: "80+ Kits",
      features: ["Plug & Play", "Complete Setup", "Expert Support"],
      color: "accent"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/20',
          hover: 'hover:bg-primary/20'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/10',
          text: 'text-secondary',
          border: 'border-secondary/20',
          hover: 'hover:bg-secondary/20'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          border: 'border-accent/20',
          hover: 'hover:bg-accent/20'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/20',
          hover: 'hover:bg-primary/20'
        };
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore our comprehensive range of agricultural IoT solutions designed for modern farming needs
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories?.map((category) => {
            const colors = getColorClasses(category?.color);
            
            return (
              <Link
                key={category?.id}
                to="/product-catalog"
                className="group block"
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category?.image}
                      alt={`${category?.title} category showing agricultural IoT devices`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Icon Badge */}
                    <div className={`absolute top-4 left-4 w-12 h-12 ${colors?.bg} ${colors?.border} border rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                      <Icon name={category?.icon} size={24} className={colors?.text} />
                    </div>

                    {/* Product Count */}
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-text-primary">{category?.productCount}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {category?.title}
                    </h3>
                    <p className="text-text-secondary mb-4 line-clamp-2">
                      {category?.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {category?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Explore Products
                      </span>
                      <Icon 
                        name="ArrowRight" 
                        size={20} 
                        className="text-primary group-hover:translate-x-1 transition-transform" 
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/product-catalog"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <span>View All Categories</span>
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;