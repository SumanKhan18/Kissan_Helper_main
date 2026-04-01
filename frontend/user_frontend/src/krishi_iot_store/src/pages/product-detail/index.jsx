import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams?.get('id') || '1';
  const [activeSection, setActiveSection] = useState('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock product data
  const product = {
    id: productId,
    name: "Smart Soil Moisture Sensor Pro",
    brand: "AgriTech Solutions",
    sku: "SMS-PRO-2024",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 24,
    maxQuantity: 10,
    images: [
      {
        url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop",
        alt: "Smart Soil Moisture Sensor - Main View"
      },
      {
        url: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=600&h=600&fit=crop",
        alt: "Sensor Installation in Field"
      },
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop",
        alt: "Mobile App Interface"
      },
      {
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
        alt: "Sensor Components"
      }
    ],
    keyFeatures: [
      "Real-time soil moisture monitoring",
      "Wireless connectivity up to 1km range",
      "Battery life up to 2 years",
      "Weather-resistant IP67 rating",
      "Mobile app integration",
      "Multi-crop compatibility"
    ],
    variants: [
      {
        id: 1,
        name: "Single Sensor",
        description: "Individual sensor unit",
        price: 149.99,
        originalPrice: 199.99
      },
      {
        id: 2,
        name: "3-Sensor Kit",
        description: "Three sensors with gateway",
        price: 399.99,
        originalPrice: 549.99
      },
      {
        id: 3,
        name: "5-Sensor Kit",
        description: "Five sensors with gateway and hub",
        price: 649.99,
        originalPrice: 899.99
      }
    ],
    specifications: [
      { label: "Sensor Type", value: "Capacitive" },
      { label: "Measurement Range", value: "0-100% VWC" },
      { label: "Accuracy", value: "±3%" },
      { label: "Operating Temperature", value: "-40°C to +85°C" },
      { label: "Communication", value: "LoRaWAN, WiFi" },
      { label: "Power Supply", value: "3.6V Lithium Battery" },
      { label: "Dimensions", value: "120 x 25 x 15 mm" },
      { label: "Weight", value: "85g" },
      { label: "Installation Depth", value: "5-30 cm" },
      { label: "Data Logging", value: "10,000 readings" }
    ],
    performanceMetrics: [
      { label: "Battery Life", value: "2 Years" },
      { label: "Range", value: "1 KM" },
      { label: "Accuracy", value: "±3%" }
    ],
    installationSteps: [
      {
        title: "Site Preparation",
        description: "Choose representative soil location away from irrigation lines and tree roots. Clear debris and ensure level ground."
      },
      {
        title: "Sensor Placement",
        description: "Insert sensor vertically into soil at desired depth (5-30cm). Ensure full contact with soil around sensor body."
      },
      {
        title: "Gateway Setup",
        description: "Position gateway within 1km of sensors with clear line of sight. Connect to power source and configure network settings."
      },
      {
        title: "Mobile App Configuration",
        description: "Download KrishiIoT app, create account, and pair sensors using QR code. Set monitoring intervals and alerts."
      },
      {
        title: "Calibration",
        description: "Run initial calibration sequence through app. Test readings against known soil conditions for accuracy verification."
      }
    ],
    compatiblePlatforms: [
      "KrishiIoT Mobile App (iOS/Android)",
      "Web Dashboard Portal",
      "Third-party SCADA Systems",
      "Agricultural Management Software",
      "Weather Station Integration"
    ],
    protocols: [
      "LoRaWAN 1.0.3",
      "WiFi 802.11 b/g/n",
      "Bluetooth 5.0 LE",
      "Modbus RTU/TCP"
    ],
    recommendedAccessories: [
      {
        name: "LoRaWAN Gateway",
        description: "Extends range and connectivity",
        price: 299.99
      },
      {
        name: "Solar Panel Kit",
        description: "Sustainable power solution",
        price: 89.99
      },
      {
        name: "Mounting Stakes",
        description: "Professional installation kit",
        price: 24.99
      },
      {
        name: "Protective Housing",
        description: "Additional weather protection",
        price: 39.99
      }
    ],
    warranty: {
      duration: "2-Year",
      covered: [
        "Manufacturing defects",
        "Electronic component failure",
        "Battery performance issues",
        "Sensor accuracy degradation",
        "Firmware updates and support"
      ],
      notCovered: [
        "Physical damage from misuse",
        "Water damage beyond IP67 rating",
        "Lightning or electrical surge damage",
        "Normal wear and tear",
        "Third-party software integration issues"
      ]
    }
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "John Martinez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      rating: 5,
      title: "Excellent precision farming tool",
      content: `This sensor has revolutionized how I manage irrigation on my 50-acre corn farm. The accuracy is impressive and the mobile app makes monitoring effortless. Installation was straightforward and the battery life is as advertised.`,
      date: "2024-08-10",
      verified: true,
      farmType: "Corn & Soybean",
      farmSize: "50 acres",
      helpfulCount: 23,
      images: [
        "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop"
      ],
      pros: [
        "Highly accurate readings",
        "Easy mobile app interface",
        "Long battery life",
        "Weather resistant"
      ],
      cons: [
        "Initial setup requires some technical knowledge"
      ]
    },
    {
      id: 2,
      user: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      rating: 4,
      title: "Great for greenhouse operations",
      content: `Using these sensors in my hydroponic greenhouse setup. The real-time monitoring helps maintain optimal growing conditions. Would recommend for any serious grower looking to optimize water usage.`,
      date: "2024-08-05",
      verified: true,
      farmType: "Greenhouse Vegetables",
      farmSize: "2 acres",
      helpfulCount: 18,
      pros: [
        "Real-time monitoring",
        "Helps optimize water usage",
        "Good for greenhouse use"
      ],
      cons: [
        "Could use better integration with existing systems"
      ]
    },
    {
      id: 3,
      user: {
        name: "Mike Thompson",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg"
      },
      rating: 5,
      title: "Perfect for precision agriculture",
      content: `Deployed 15 sensors across different field zones. The data insights have helped reduce water consumption by 30% while maintaining crop yields. Excellent investment for sustainable farming.`,
      date: "2024-07-28",
      verified: true,
      farmType: "Mixed Crops",
      farmSize: "200 acres",
      helpfulCount: 31,
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      ],
      pros: [
        "Significant water savings",
        "Comprehensive field coverage",
        "Detailed analytics",
        "Professional support"
      ]
    }
  ];

  // Mock related products
  const relatedProducts = [
    {
      id: 2,
      name: "Weather Station Pro",
      brand: "AgriTech Solutions",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.6,
      reviewCount: 67,
      inStock: true,
      isNew: true,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
      keyFeatures: [
        "Multi-parameter monitoring",
        "Solar powered operation"
      ]
    },
    {
      id: 3,
      name: "Smart Irrigation Controller",
      brand: "HydroSmart",
      price: 199.99,
      rating: 4.5,
      reviewCount: 43,
      inStock: true,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      keyFeatures: [
        "Automated scheduling",
        "Zone-based control"
      ]
    },
    {
      id: 4,
      name: "pH Sensor Kit",
      brand: "SoilTech",
      price: 89.99,
      rating: 4.3,
      reviewCount: 29,
      inStock: false,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      keyFeatures: [
        "Soil pH monitoring",
        "Nutrient analysis"
      ]
    },
    {
      id: 5,
      name: "Crop Monitoring Drone",
      brand: "AeroFarm",
      price: 1299.99,
      originalPrice: 1599.99,
      discount: 19,
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
      keyFeatures: [
        "Aerial crop analysis",
        "HD imaging system"
      ]
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/home-page" },
    { label: "Products", href: "/product-catalog" },
    { label: "IoT Sensors", href: "/product-catalog?category=sensors" },
    { label: product?.name }
  ];

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'related', label: 'Related', icon: 'Grid3X3' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (cartItem) => {
    console.log('Adding to cart:', cartItem);
    // Add to cart logic here
  };

  const handleAddToWishlist = () => {
    console.log('Adding to wishlist:', product);
    // Add to wishlist logic here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Overview Section */}
          <section id="overview" className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <ProductImageGallery 
                  images={product?.images} 
                  productName={product?.name} 
                />
              </div>

              {/* Product Information */}
              <div>
                <ProductInfo
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="sticky top-16 bg-background border-b border-border z-40 mb-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                    activeSection === section?.id
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Tabs */}
          <section id="specifications" className="mb-12">
            <ProductTabs product={product} />
          </section>

          {/* Customer Reviews */}
          <section id="reviews" className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Customer Reviews
              </h2>
              <p className="text-text-secondary">
                See what farmers are saying about this product
              </p>
            </div>
            <CustomerReviews
              reviews={reviews}
              averageRating={product?.rating}
              totalReviews={product?.reviewCount}
            />
          </section>

          {/* Related Products */}
          <section id="related">
            <RelatedProducts
              products={relatedProducts}
              title="You Might Also Like"
            />
          </section>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 z-50 shadow-elevated"
            onClick={scrollToTop}
          >
            <Icon name="ArrowUp" size={20} />
          </Button>
        )}

        {/* Mobile Sticky Add to Cart */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-lg font-bold text-primary">${product?.variants?.[0]?.price}</div>
              <div className="text-sm text-text-secondary">
                {product?.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={() => handleAddToCart({ product, variant: product?.variants?.[0], quantity: 1 })}
              disabled={!product?.inStock}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-shrink-0"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;