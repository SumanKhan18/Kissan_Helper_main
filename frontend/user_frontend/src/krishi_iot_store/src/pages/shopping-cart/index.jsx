import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import CrossSellRecommendations from './components/CrossSellRecommendations';
import SavedForLater from './components/SavedForLater';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Advanced Soil Moisture Sensor Kit with IoT Connectivity",
      price: 3499,
      quantity: 2,
      stock: 15,
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      specifications: [
        { label: "Range", value: "0-100% moisture" },
        { label: "Connectivity", value: "WiFi, LoRaWAN" },
        { label: "Battery Life", value: "2+ years" },
        { label: "Waterproof", value: "IP67 rated" }
      ],
      bulkDiscountThreshold: 2,
      bulkDiscountAmount: 500
    },
    {
      id: 2,
      name: "Smart Weather Monitoring Station Pro",
      price: 12999,
      quantity: 1,
      stock: 8,
      image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
      specifications: [
        { label: "Sensors", value: "Temperature, Humidity, Wind, Rain" },
        { label: "Range", value: "5km wireless transmission" },
        { label: "Display", value: "7-inch color touchscreen" },
        { label: "Power", value: "Solar + Battery backup" }
      ],
      bulkDiscountThreshold: 3,
      bulkDiscountAmount: 0
    },
    {
      id: 3,
      name: "Automated Irrigation Controller System",
      price: 8499,
      quantity: 1,
      stock: 3,
      image: "https://images.pexels.com/photos/4022090/pexels-photo-4022090.jpeg",
      specifications: [
        { label: "Zones", value: "8 independent zones" },
        { label: "Control", value: "Mobile app + manual" },
        { label: "Scheduling", value: "Advanced timer programs" },
        { label: "Sensors", value: "Rain & soil moisture integration" }
      ],
      bulkDiscountThreshold: 2,
      bulkDiscountAmount: 0
    }
  ];

  const mockSavedItems = [
    {
      id: 4,
      name: "Crop Health Monitoring Drone Kit",
      price: 45999,
      stock: 5,
      image: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg"
    },
    {
      id: 5,
      name: "Smart Greenhouse Control System",
      price: 18999,
      stock: 0,
      image: "https://images.pexels.com/photos/4022088/pexels-photo-4022088.jpeg"
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    const loadCartData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCartItems(mockCartItems);
      setSavedItems(mockSavedItems);
      setIsLoading(false);
    };

    loadCartData();
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems?.find(item => item?.id === itemId);
    if (itemToSave) {
      setSavedItems(prevSaved => [...prevSaved, { ...itemToSave, quantity: 1 }]);
      setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems?.find(item => item?.id === itemId);
    if (itemToMove && itemToMove?.stock > 0) {
      setCartItems(prevCart => [...prevCart, { ...itemToMove, quantity: 1 }]);
      setSavedItems(prevSaved => prevSaved?.filter(item => item?.id !== itemId));
    }
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedItems(prevSaved => prevSaved?.filter(item => item?.id !== itemId));
  };

  const handleApplyPromoCode = (code) => {
    const discountMap = {
      'FARM10': 0.10,
      'SENSOR20': 0.20,
      'BULK15': 0.15
    };
    
    const discountPercent = discountMap?.[code?.toUpperCase()] || 0;
    const subtotal = calculateSubtotal();
    setDiscount(Math.round(subtotal * discountPercent));
  };

  const handleShippingChange = (shippingType) => {
    const shippingCosts = {
      'standard': 0,
      'express': 200,
      'priority': 500
    };
    setShipping(shippingCosts?.[shippingType] || 0);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(item => item?.id === product?.id);
    if (existingItem) {
      handleUpdateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  const calculateBulkDiscounts = () => {
    return cartItems?.reduce((total, item) => {
      if (item?.quantity >= item?.bulkDiscountThreshold) {
        return total + item?.bulkDiscountAmount;
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const bulkDiscounts = calculateBulkDiscounts();
  const tax = Math.round((subtotal - bulkDiscounts) * 0.18);
  const total = subtotal - bulkDiscounts - discount + shipping + tax;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-text-secondary">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link to="/home-page" className="hover:text-primary transition-smooth">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium">Shopping Cart</span>
          </nav>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
                    Shopping Cart
                  </h1>
                  <p className="text-text-secondary">
                    {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    iconName="ArrowLeft"
                    iconPosition="left"
                    asChild
                  >
                    <Link to="/product-catalog">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Bulk Discount Banner */}
                  {bulkDiscounts > 0 && (
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="Tag" size={20} className="text-success" />
                        <h3 className="font-semibold text-success">Bulk Discounts Applied!</h3>
                      </div>
                      <p className="text-sm text-success mt-1">
                        You're saving ₹{bulkDiscounts?.toLocaleString()} with bulk purchase discounts.
                      </p>
                    </div>
                  )}

                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cartItems?.map((item) => (
                      <CartItem
                        key={item?.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        onSaveForLater={handleSaveForLater}
                      />
                    ))}
                  </div>

                  {/* Cross-sell Recommendations */}
                  <CrossSellRecommendations
                    cartItems={cartItems}
                    onAddToCart={handleAddToCart}
                  />

                  {/* Saved for Later */}
                  <SavedForLater
                    savedItems={savedItems}
                    onMoveToCart={handleMoveToCart}
                    onRemoveFromSaved={handleRemoveFromSaved}
                  />
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <OrderSummary
                    subtotal={subtotal - bulkDiscounts}
                    shipping={shipping}
                    tax={tax}
                    discount={discount}
                    total={total}
                    onApplyPromoCode={handleApplyPromoCode}
                    onShippingChange={handleShippingChange}
                    estimatedDelivery={estimatedDelivery}
                  />
                </div>
              </div>

              {/* Mobile Checkout Button */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-text-secondary">Total:</span>
                  <span className="font-heading font-bold text-xl text-primary">
                    ₹{total?.toLocaleString()}
                  </span>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="CreditCard"
                  iconPosition="left"
                  asChild
                >
                  <Link to="/checkout-process">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;