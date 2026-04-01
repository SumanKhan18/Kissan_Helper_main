import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Sparkles" size={16} />
                <span>Smart Farming Revolution</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary leading-tight">
                Transform Your Farm with 
                <span className="text-primary block">IoT Technology</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-xl">
                Discover cutting-edge agricultural IoT devices, smart sensors, and automation kits designed to boost crop yields, reduce costs, and modernize your farming operations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-text-secondary">IoT Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-text-secondary">Happy Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-text-secondary">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg"
                iconName="ShoppingBag"
                iconPosition="right"
                className="flex-1 sm:flex-none"
              >
                <Link to="/product-catalog" className="flex items-center justify-center w-full">
                  Shop Now
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm text-text-secondary">Certified Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={20} className="text-success" />
                <span className="text-sm text-text-secondary">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={20} className="text-success" />
                <span className="text-sm text-text-secondary">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop"
                alt="Smart farming with IoT sensors monitoring crops in modern agricultural field"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-elevated"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-elevated">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Icon name="Thermometer" size={16} className="text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Soil Temp</div>
                    <div className="font-semibold text-sm">24°C</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-elevated">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="Droplets" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Moisture</div>
                    <div className="font-semibold text-sm">68%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;