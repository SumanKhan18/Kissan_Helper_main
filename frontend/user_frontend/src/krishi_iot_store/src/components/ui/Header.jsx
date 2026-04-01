import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const location = useLocation();
  const searchRef = useRef(null);
  const accountMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Home', path: '/home-page', icon: 'Home' },
    { label: 'Products', path: '/product-catalog', icon: 'Package' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart', badge: cartCount },
    { label: 'Account', path: '/user-account-dashboard', icon: 'User' },
  ];

  const accountMenuItems = [
    { label: 'Dashboard', path: '/user-account-dashboard', icon: 'LayoutDashboard' },
    { label: 'Orders', path: '/user-account-dashboard', icon: 'Package' },
    { label: 'Settings', path: '/user-account-dashboard', icon: 'Settings' },
    { label: 'Help', path: '/user-account-dashboard', icon: 'HelpCircle' },
    { label: 'Logout', path: '/home-page', icon: 'LogOut' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchOpen(false);
      }
      if (accountMenuRef?.current && !accountMenuRef?.current?.contains(event?.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home-page" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Sprout" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-primary hidden sm:block">
              Krishi Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.slice(0, 2)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search IoT devices, sensors, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onFocus={handleSearchFocus}
                className="w-full pl-10 pr-4"
              />
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-1010">
                  <div className="p-2">
                    <div className="text-sm text-text-secondary mb-2">Suggestions</div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-smooth">
                        Soil moisture sensors
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-smooth">
                        Weather monitoring stations
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-smooth">
                        Irrigation controllers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Link to="/shopping-cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={isActivePath('/shopping-cart') ? 'text-primary bg-primary/10' : ''}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account Menu */}
            <div className="relative" ref={accountMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={isActivePath('/user-account-dashboard') ? 'text-primary bg-primary/10' : ''}
              >
                <Icon name="User" size={20} />
              </Button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-1010">
                  <div className="py-1">
                    {accountMenuItems?.map((item, index) => (
                      <Link
                        key={index}
                        to={item?.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="search"
                placeholder="Search IoT devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </div>
                  {item?.badge && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {item?.badge > 9 ? '9+' : item?.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;