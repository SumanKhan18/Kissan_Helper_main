import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuickAccessTiles = () => {
  const quickAccessItems = [
    {
      id: 1,
      title: "Soil Monitoring",
      description: "Smart sensors for soil health tracking",
      icon: "Thermometer",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=150&fit=crop",
      productCount: "45+ Products",
      color: "primary",
      popular: true
    },
    {
      id: 2,
      title: "Weather Stations",
      description: "Complete weather monitoring solutions",
      icon: "Cloud",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=200&h=150&fit=crop",
      productCount: "28+ Products",
      color: "secondary",
      popular: false
    },
    {
      id: 3,
      title: "Irrigation Systems",
      description: "Automated watering and control systems",
      icon: "Droplets",
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/drone-1846734_1280.jpg?w=200&h=150&fit=crop",
      productCount: "62+ Products",
      color: "accent",
      popular: true
    },
    {
      id: 4,
      title: "Crop Monitoring",
      description: "Advanced crop health and growth tracking",
      icon: "Leaf",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=150&fit=crop",
      productCount: "38+ Products",
      color: "success",
      popular: false
    },
    {
      id: 5,
      title: "Livestock Tracking",
      description: "GPS and health monitoring for animals",
      icon: "MapPin",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=200&h=150&fit=crop",
      productCount: "24+ Products",
      color: "warning",
      popular: false
    },
    {
      id: 6,
      title: "Greenhouse Control",
      description: "Climate and environment automation",
      icon: "Home",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=150&fit=crop",
      productCount: "31+ Products",
      color: "primary",
      popular: true
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
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          border: 'border-success/20',
          hover: 'hover:bg-success/20'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20',
          hover: 'hover:bg-warning/20'
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
    <section className="py-12 lg:py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Quick access to our most sought-after agricultural IoT solutions
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems?.map((item) => {
            const colors = getColorClasses(item?.color);
            
            return (
              <Link
                key={item?.id}
                to="/product-catalog"
                className="group block"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={item?.image}
                      alt={`${item?.title} category showing agricultural IoT devices`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    
                    {/* Popular Badge */}
                    {item?.popular && (
                      <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`absolute bottom-2 right-2 w-10 h-10 ${colors?.bg} ${colors?.border} border rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                      <Icon name={item?.icon} size={20} className={colors?.text} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {item?.title}
                      </h3>
                      <Icon 
                        name="ArrowUpRight" 
                        size={16} 
                        className="text-text-secondary group-hover:text-primary transition-colors flex-shrink-0 ml-2" 
                      />
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {item?.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">
                        {item?.productCount}
                      </span>
                      <span className="text-xs text-text-secondary group-hover:text-primary transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Expert Consultation */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Expert Consultation</h3>
              <p className="text-sm text-text-secondary mb-4">
                Get personalized recommendations from our agricultural IoT specialists
              </p>
              <Link 
                to="/user-account-dashboard" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Book Consultation →
              </Link>
            </div>

            {/* Custom Solutions */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Settings" size={32} className="text-secondary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Custom Solutions</h3>
              <p className="text-sm text-text-secondary mb-4">
                Tailored IoT systems designed specifically for your farm's unique needs
              </p>
              <Link 
                to="/product-catalog" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Learn More →
              </Link>
            </div>

            {/* Installation Support */}
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Wrench" size={32} className="text-success" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Installation Support</h3>
              <p className="text-sm text-text-secondary mb-4">
                Professional installation and setup services for all IoT devices
              </p>
              <Link 
                to="/user-account-dashboard" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Get Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessTiles;