import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: "Zap",
      title: "Latest IoT Innovations",
      description: "Be first to know about new agricultural IoT devices and technologies"
    },
    {
      icon: "TrendingDown",
      title: "Exclusive Discounts",
      description: "Get special offers and early access to sales events"
    },
    {
      icon: "BookOpen",
      title: "Farming Tips & Guides",
      description: "Expert advice on smart farming practices and IoT implementation"
    },
    {
      icon: "Calendar",
      title: "Seasonal Recommendations",
      description: "Timely suggestions for optimal farming equipment and practices"
    }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Welcome to Our Community!
            </h2>
            <p className="text-text-secondary mb-6">
              Thank you for subscribing! You'll receive our latest updates, exclusive offers, and expert farming insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                iconName="ShoppingBag"
                iconPosition="right"
                onClick={() => window.location.href = '/product-catalog'}
              >
                Start Shopping
              </Button>
              <Button 
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Icon name="Mail" size={16} />
                  <span>Stay Connected</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
                  Join Our Smart Farming Community
                </h2>
                <p className="text-lg text-text-secondary">
                  Get the latest insights on agricultural IoT, exclusive product launches, and expert farming tips delivered to your inbox.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      error={error}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isLoading}
                    iconName="Send"
                    iconPosition="right"
                    className="sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-success" />
                  <span>15,000+ subscribers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span>Weekly updates</span>
                </div>
              </div>
            </div>

            {/* Benefits Side */}
            <div className="bg-muted/30 p-8 lg:p-12">
              <h3 className="text-xl font-heading font-bold text-text-primary mb-6">
                What You'll Get:
              </h3>
              <div className="space-y-6">
                {benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        {benefit?.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Newsletter Preview */}
              <div className="mt-8 p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">Latest Newsletter</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2 text-sm">
                  "5 IoT Sensors Every Modern Farm Needs"
                </h4>
                <p className="text-xs text-text-secondary mb-3">
                  Discover how soil moisture sensors, weather stations, and crop monitoring devices can increase your yield by up to 30%...
                </p>
                <div className="text-xs text-text-secondary">
                  📅 Sent last Tuesday • ⏱️ 3 min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;