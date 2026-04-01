import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import CategoryCards from './components/CategoryCards';
import FeaturedProducts from './components/FeaturedProducts';
import TrustSignals from './components/TrustSignals';
import QuickAccessTiles from './components/QuickAccessTiles';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from './components/Footer';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Krishi IoT Store - Smart Farming Solutions & Agricultural IoT Devices</title>
        <meta 
          name="description" 
          content="Transform your farm with cutting-edge IoT sensors, smart devices, and automation kits. Shop agricultural IoT solutions trusted by 10,000+ farmers worldwide. Free shipping & expert support." 
        />
        <meta 
          name="keywords" 
          content="agricultural IoT, smart farming, soil sensors, weather stations, irrigation systems, crop monitoring, precision agriculture, farm automation" 
        />
        <meta property="og:title" content="Krishi IoT Store - Smart Farming Solutions" />
        <meta 
          property="og:description" 
          content="Discover IoT devices that boost crop yields, reduce costs, and modernize farming operations. 500+ products, 98% satisfaction rate." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krishiiot.com/home-page" />
        <link rel="canonical" href="https://krishiiot.com/home-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroBanner />

          {/* Category Cards Section */}
          <CategoryCards />

          {/* Featured Products Section */}
          <FeaturedProducts />

          {/* Quick Access Tiles Section */}
          <QuickAccessTiles />

          {/* Trust Signals Section */}
          <TrustSignals />

          {/* Newsletter Signup Section */}
          <NewsletterSignup />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;