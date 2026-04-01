import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Products",
      links: [
        { label: "IoT Sensors", href: "/product-catalog" },
        { label: "Smart Devices", href: "/product-catalog" },
        { label: "Complete Kits", href: "/product-catalog" },
        { label: "Weather Stations", href: "/product-catalog" },
        { label: "Irrigation Systems", href: "/product-catalog" },
        { label: "Crop Monitoring", href: "/product-catalog" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/user-account-dashboard" },
        { label: "Installation Guide", href: "/user-account-dashboard" },
        { label: "Technical Support", href: "/user-account-dashboard" },
        { label: "Warranty", href: "/user-account-dashboard" },
        { label: "Returns", href: "/user-account-dashboard" },
        { label: "Contact Us", href: "/user-account-dashboard" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/home-page" },
        { label: "Our Mission", href: "/home-page" },
        { label: "Careers", href: "/home-page" },
        { label: "Press", href: "/home-page" },
        { label: "Partners", href: "/home-page" },
        { label: "Blog", href: "/home-page" }
      ]
    },
    {
      title: "Account",
      links: [
        { label: "My Account", href: "/user-account-dashboard" },
        { label: "Order History", href: "/user-account-dashboard" },
        { label: "Wishlist", href: "/user-account-dashboard" },
        { label: "Track Order", href: "/user-account-dashboard" },
        { label: "Address Book", href: "/user-account-dashboard" },
        { label: "Payment Methods", href: "/user-account-dashboard" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "YouTube", icon: "Youtube", href: "#" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  const certifications = [
    { name: "ISO 9001", icon: "Award" },
    { name: "CE Marking", icon: "Shield" },
    { name: "FCC Approved", icon: "CheckCircle" },
    { name: "RoHS Compliant", icon: "Leaf" }
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/home-page" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Sprout" size={24} color="white" />
              </div>
              <span className="font-heading font-bold text-2xl">
                Krishi Store
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering farmers worldwide with cutting-edge IoT technology for smarter, more sustainable agriculture. Transform your farm with our comprehensive range of sensors, devices, and automation solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-primary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-primary" />
                <span className="text-gray-300">support@krishiiot.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="text-primary mt-1" />
                <span className="text-gray-300">
                  123 AgriTech Plaza, Smart City,<br />
                  Innovation District, CA 94105
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="font-semibold text-white mb-4">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.href}
                        className="text-gray-300 hover:text-primary transition-colors text-sm"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-white mb-2">
                Stay Updated with Smart Farming Trends
              </h3>
              <p className="text-gray-300 text-sm">
                Get the latest IoT innovations, farming tips, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Payment Methods */}
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.name}
                    className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center"
                    title={method?.name}
                  >
                    <Icon name={method?.icon} size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {certifications?.map((cert) => (
                  <div
                    key={cert?.name}
                    className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center"
                    title={cert?.name}
                  >
                    <Icon name={cert?.icon} size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Security</h4>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-400" />
                <span className="text-xs text-gray-300">SSL Secured</span>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">24/7 Support</h4>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={16} className="text-primary" />
                <span className="text-xs text-gray-300">Always Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} Krishi IoT Store. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link to="/home-page" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/home-page" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/home-page" className="text-gray-300 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <Link to="/home-page" className="text-gray-300 hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;