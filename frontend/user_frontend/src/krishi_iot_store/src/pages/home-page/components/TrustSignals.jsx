import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Organic Farmer",
      location: "Punjab, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      content: `The soil moisture sensors have revolutionized my irrigation system. I've reduced water usage by 40% while increasing crop yield by 25%. The real-time monitoring gives me peace of mind even when I'm away from the farm.`,
      product: "Smart Soil Monitoring Kit"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Greenhouse Owner",
      location: "California, USA",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content: `The automated climate control system has been a game-changer for my greenhouse operations. Temperature and humidity are perfectly maintained, and I can monitor everything from my phone. Highly recommended!`,
      product: "Smart Greenhouse Controller"
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      role: "Vineyard Manager",
      location: "Mendoza, Argentina",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      content: `The weather station and crop monitoring sensors help me make data-driven decisions for my vineyard. The precision agriculture approach has improved grape quality and reduced pesticide usage significantly.`,
      product: "Complete Farm Monitoring Kit"
    }
  ];

  const certifications = [
    {
      name: "ISO 9001 Certified",
      icon: "Award",
      description: "Quality Management System"
    },
    {
      name: "CE Marking",
      icon: "Shield",
      description: "European Conformity"
    },
    {
      name: "FCC Approved",
      icon: "CheckCircle",
      description: "Federal Communications Commission"
    },
    {
      name: "IP67 Rated",
      icon: "Droplets",
      description: "Weather Resistant"
    }
  ];

  const partners = [
    {
      name: "Agricultural Research Institute",
      logo: "https://via.placeholder.com/120x60/2D5A27/FFFFFF?text=ARI"
    },
    {
      name: "Smart Farming Alliance",
      logo: "https://via.placeholder.com/120x60/8B4513/FFFFFF?text=SFA"
    },
    {
      name: "IoT Technology Partners",
      logo: "https://via.placeholder.com/120x60/FF6B35/FFFFFF?text=ITP"
    },
    {
      name: "Precision Agriculture Council",
      logo: "https://via.placeholder.com/120x60/22C55E/FFFFFF?text=PAC"
    }
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Happy Farmers",
      icon: "Users"
    },
    {
      value: "500+",
      label: "IoT Devices",
      icon: "Cpu"
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: "Star"
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: "Headphones"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${index < rating ? 'text-warning fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Trusted by Farmers Worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of farmers who have transformed their operations with our IoT solutions
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={32} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">{stat?.value}</div>
              <div className="text-sm text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-text-primary text-center mb-8">
            What Our Customers Say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial?.rating)}
                </div>

                {/* Content */}
                <blockquote className="text-text-secondary mb-4 line-clamp-4">
                  "{testimonial?.content}"
                </blockquote>

                {/* Product */}
                <div className="text-sm text-primary font-medium mb-4">
                  Product: {testimonial?.product}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name} profile picture`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{testimonial?.name}</div>
                    <div className="text-sm text-text-secondary">
                      {testimonial?.role} • {testimonial?.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-text-primary text-center mb-8">
            Certifications & Standards
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={cert?.icon} size={32} className="text-success" />
                </div>
                <div className="font-semibold text-text-primary mb-1">{cert?.name}</div>
                <div className="text-sm text-text-secondary">{cert?.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="text-center">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {partners?.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={partner?.logo}
                  alt={`${partner?.name} logo`}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="RotateCcw" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">2-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;