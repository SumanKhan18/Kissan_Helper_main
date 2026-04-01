import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import DashboardStats from './components/DashboardStats';
import RecentOrders from './components/RecentOrders';
import DeviceManagement from './components/DeviceManagement';
import WishlistSection from './components/WishlistSection';
import AddressBook from './components/AddressBook';
import AccountSettings from './components/AccountSettings';
import SupportSection from './components/SupportSection';
import NotificationCenter from './components/NotificationCenter';

const UserAccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userInfo = {
    name: "Rajesh Kumar",
    farmName: "Kumar Organic Farm",
    location: "Jaipur, Rajasthan",
    memberSince: "2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Orders', icon: 'Package' },
    { id: 'devices', label: 'My Devices', icon: 'Wifi' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentOrders />
              <WishlistSection />
            </div>
            <DeviceManagement />
          </div>
        );
      case 'orders':
        return <RecentOrders />;
      case 'devices':
        return <DeviceManagement />;
      case 'wishlist':
        return <WishlistSection />;
      case 'addresses':
        return <AddressBook />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <AccountSettings />;
      case 'support':
        return <SupportSection />;
      default:
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentOrders />
              <WishlistSection />
            </div>
            <DeviceManagement />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Profile Header */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={userInfo?.avatar}
                  alt={userInfo?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Welcome back, {userInfo?.name}!
                </h1>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="Sprout" size={16} />
                    <span>{userInfo?.farmName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="MapPin" size={16} />
                    <span>{userInfo?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="Calendar" size={16} />
                    <span>Member since {userInfo?.memberSince}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                  Edit Profile
                </Button>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
                  Add Device
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              {/* Mobile Menu Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full justify-between"
                >
                  <span>Menu</span>
                  <Icon name={isMobileMenuOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </Button>
              </div>

              {/* Navigation Menu */}
              <nav className={`space-y-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                {navigationTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => {
                      setActiveTab(tab?.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 p-4 bg-muted rounded-lg hidden lg:block">
                <h3 className="font-medium text-text-primary mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start" iconName="ShoppingCart" iconPosition="left">
                    Reorder Items
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Download" iconPosition="left">
                    Download Invoice
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" iconName="MessageCircle" iconPosition="left">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;