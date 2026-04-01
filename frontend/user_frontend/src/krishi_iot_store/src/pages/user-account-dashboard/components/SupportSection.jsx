import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportSection = () => {
  const supportResources = [
    {
      id: 1,
      title: "Installation Guides",
      description: "Step-by-step guides for setting up your IoT devices",
      icon: "BookOpen",
      color: "text-primary bg-primary/10",
      items: [
        "Soil Sensor Installation",
        "Weather Station Setup",
        "Irrigation Controller Guide",
        "Mobile App Configuration"
      ]
    },
    {
      id: 2,
      title: "Troubleshooting",
      description: "Common issues and solutions for your devices",
      icon: "Wrench",
      color: "text-warning bg-warning/10",
      items: [
        "Connectivity Issues",
        "Battery Problems",
        "Data Sync Errors",
        "Calibration Guide"
      ]
    },
    {
      id: 3,
      title: "Video Tutorials",
      description: "Watch detailed video guides in Hindi and English",
      icon: "Play",
      color: "text-accent bg-accent/10",
      items: [
        "Device Unboxing",
        "Field Installation",
        "App Navigation",
        "Data Interpretation"
      ]
    }
  ];

  const contactOptions = [
    {
      id: 1,
      title: "Technical Support",
      description: "Get help with device setup and troubleshooting",
      icon: "Headphones",
      contact: "+91 1800-123-4567",
      hours: "24/7 Support",
      color: "text-primary"
    },
    {
      id: 2,
      title: "WhatsApp Support",
      description: "Quick assistance via WhatsApp",
      icon: "MessageCircle",
      contact: "+91 98765-43210",
      hours: "9 AM - 9 PM",
      color: "text-success"
    },
    {
      id: 3,
      title: "Email Support",
      description: "Detailed queries and documentation",
      icon: "Mail",
      contact: "support@krishiiot.com",
      hours: "Response within 4 hours",
      color: "text-accent"
    },
    {
      id: 4,
      title: "Field Engineer",
      description: "On-site installation and maintenance",
      icon: "UserCheck",
      contact: "Book Appointment",
      hours: "Mon-Sat, 8 AM - 6 PM",
      color: "text-secondary"
    }
  ];

  const faqItems = [
    {
      question: "How do I connect my devices to WiFi?",
      answer: "Use the mobile app to scan QR code on device and follow setup wizard."
    },
    {
      question: "What if my sensor shows incorrect readings?",
      answer: "Check calibration settings in app and ensure proper installation depth."
    },
    {
      question: "How often should I replace sensor batteries?",
      answer: "Typically 12-18 months depending on usage. App will notify when low."
    },
    {
      question: "Can I access data when internet is down?",
      answer: "Devices store data locally for up to 30 days and sync when connected."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Support Resources */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Support Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {supportResources?.map((resource) => (
            <div key={resource?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
              <div className={`w-12 h-12 rounded-lg ${resource?.color} flex items-center justify-center mb-4`}>
                <Icon name={resource?.icon} size={24} />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{resource?.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{resource?.description}</p>
              <ul className="space-y-2 mb-4">
                {resource?.items?.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Icon name="ChevronRight" size={14} className="text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                View All Guides
              </Button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Download" size={20} className="text-primary" />
            <div>
              <h3 className="font-medium text-text-primary">Download Resources</h3>
              <p className="text-sm text-text-secondary">
                Get offline access to manuals, quick reference cards, and troubleshooting guides
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Download Pack
            </Button>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Contact Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {contactOptions?.map((option) => (
            <div key={option?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${option?.color}`}>
                  <Icon name={option?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">{option?.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">{option?.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">{option?.contact}</p>
                    <p className="text-xs text-text-secondary">{option?.hours}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <h3 className="font-medium text-primary">Priority Support</h3>
              <p className="text-sm text-text-secondary">
                Upgrade to premium support for faster response times and dedicated field engineer visits
              </p>
            </div>
            <Button variant="default" size="sm" className="ml-auto">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems?.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={16} className="text-primary" />
                {faq?.question}
              </h3>
              <p className="text-sm text-text-secondary pl-6">{faq?.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">
            View All FAQs
          </Button>
        </div>
      </div>
      {/* Community Support */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Community Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Users" size={24} className="text-primary" />
              <div>
                <h3 className="font-medium text-text-primary">Farmer Community</h3>
                <p className="text-sm text-text-secondary">Connect with 10,000+ farmers</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Join our WhatsApp and Telegram groups to share experiences, get tips, and help fellow farmers
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Join WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Join Telegram
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="BookOpen" size={24} className="text-success" />
              <div>
                <h3 className="font-medium text-text-primary">Knowledge Base</h3>
                <p className="text-sm text-text-secondary">500+ articles and guides</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Browse our comprehensive knowledge base with farming tips, seasonal guides, and best practices
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Browse Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;