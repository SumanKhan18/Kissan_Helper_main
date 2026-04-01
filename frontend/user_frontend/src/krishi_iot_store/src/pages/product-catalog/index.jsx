import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortAndView from './components/SortAndView';
import ProductGrid from './components/ProductGrid';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    connectivity: [],
    power: [],
    features: [],
    priceRange: { min: '', max: '' }
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Smart Soil Moisture Sensor Pro",
      category: "IoT Sensors",
      brand: "farmtech",
      price: 2499,
      originalPrice: 2999,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 45,
      keySpecs: ["Wireless connectivity", "Battery life: 2 years", "IP67 waterproof"],
      isNew: true,
      isBestseller: false,
      discount: 17,
      freeDelivery: true,
      connectivity: ["wifi", "bluetooth"],
      power: ["battery"],
      features: ["waterproof", "mobile-app", "cloud-sync"]
    },
    {
      id: 2,
      name: "Weather Station Complete Kit",
      category: "Weather Stations",
      brand: "agrisense",
      price: 15999,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 23,
      keySpecs: ["Multi-sensor array", "Solar powered", "Real-time data"],
      isNew: false,
      isBestseller: true,
      discount: null,
      freeDelivery: true,
      connectivity: ["wifi", "cellular"],
      power: ["solar"],
      features: ["waterproof", "mobile-app", "cloud-sync", "alerts"]
    },
    {
      id: 3,
      name: "Automated Irrigation Controller",
      category: "Smart Controllers",
      brand: "smartfarm",
      price: 8999,
      originalPrice: 10999,
      rating: 4.3,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      stockStatus: "low-stock",
      stockCount: 5,
      keySpecs: ["8-zone control", "Smart scheduling", "Mobile app"],
      isNew: false,
      isBestseller: false,
      discount: 18,
      freeDelivery: true,
      connectivity: ["wifi"],
      power: ["wired"],
      features: ["mobile-app", "cloud-sync", "alerts"]
    },
    {
      id: 4,
      name: "pH & Nutrient Monitoring System",
      category: "Soil Analysis",
      brand: "cropguard",
      price: 12499,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 34,
      keySpecs: ["Multi-parameter testing", "Bluetooth connectivity", "Lab-grade accuracy"],
      isNew: true,
      isBestseller: false,
      discount: null,
      freeDelivery: false,
      connectivity: ["bluetooth"],
      power: ["battery"],
      features: ["mobile-app", "data-export"]
    },
    {
      id: 5,
      name: "Livestock Tracking Collar",
      category: "Monitoring Systems",
      brand: "fieldmaster",
      price: 3999,
      originalPrice: 4499,
      rating: 4.2,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 78,
      keySpecs: ["GPS tracking", "Health monitoring", "Long battery life"],
      isNew: false,
      isBestseller: true,
      discount: 11,
      freeDelivery: true,
      connectivity: ["cellular", "lora"],
      power: ["battery"],
      features: ["waterproof", "mobile-app", "alerts"]
    },
    {
      id: 6,
      name: "Smart Greenhouse Controller",
      category: "Smart Controllers",
      brand: "precisionag",
      price: 18999,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      stockStatus: "out-of-stock",
      stockCount: 0,
      keySpecs: ["Climate control", "Automated systems", "Energy efficient"],
      isNew: false,
      isBestseller: false,
      discount: null,
      freeDelivery: true,
      connectivity: ["wifi", "zigbee"],
      power: ["wired"],
      features: ["mobile-app", "cloud-sync", "alerts", "data-export"]
    },
    {
      id: 7,
      name: "Drone Crop Monitoring Kit",
      category: "Monitoring Systems",
      brand: "farmtech",
      price: 45999,
      originalPrice: 52999,
      rating: 4.4,
      reviewCount: 34,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 12,
      keySpecs: ["4K camera", "Multispectral imaging", "AI analysis"],
      isNew: true,
      isBestseller: false,
      discount: 13,
      freeDelivery: true,
      connectivity: ["wifi"],
      power: ["battery"],
      features: ["mobile-app", "cloud-sync", "data-export"]
    },
    {
      id: 8,
      name: "Water Quality Sensor Array",
      category: "IoT Sensors",
      brand: "agrisense",
      price: 6999,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 91,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
      stockStatus: "in-stock",
      stockCount: 56,
      keySpecs: ["Multi-parameter testing", "Wireless data", "Submersible design"],
      isNew: false,
      isBestseller: true,
      discount: null,
      freeDelivery: true,
      connectivity: ["lora"],
      power: ["battery"],
      features: ["waterproof", "cloud-sync", "alerts"]
    }
  ];

  // Initialize products on component mount
  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
      setTotalResults(mockProducts?.length);
      setLoading(false);
    };

    loadInitialProducts();
  }, []);

  // Filter products based on active filters
  const getFilteredProducts = () => {
    let filtered = [...mockProducts];

    // Category filter
    if (filters?.category?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.category?.some(cat => {
          const categoryMap = {
            'sensors': 'IoT Sensors',
            'controllers': 'Smart Controllers',
            'monitoring': 'Monitoring Systems',
            'irrigation': 'Irrigation Devices',
            'weather': 'Weather Stations',
            'soil': 'Soil Analysis'
          };
          return categoryMap?.[cat] === product?.category;
        })
      );
    }

    // Brand filter
    if (filters?.brand?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.brand?.includes(product?.brand)
      );
    }

    // Connectivity filter
    if (filters?.connectivity?.length > 0) {
      filtered = filtered?.filter(product => 
        product?.connectivity?.some(conn => filters?.connectivity?.includes(conn))
      );
    }

    // Power filter
    if (filters?.power?.length > 0) {
      filtered = filtered?.filter(product => 
        product?.power?.some(pow => filters?.power?.includes(pow))
      );
    }

    // Features filter
    if (filters?.features?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.features?.every(feature => product?.features?.includes(feature))
      );
    }

    // Price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(product => {
        const price = product?.price;
        const min = filters?.priceRange?.min ? parseInt(filters?.priceRange?.min) : 0;
        const max = filters?.priceRange?.max ? parseInt(filters?.priceRange?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    return filtered;
  };

  // Sort products
  const getSortedProducts = (products) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted?.sort((a, b) => a?.price - b?.price);
      case 'price-high':
        return sorted?.sort((a, b) => b?.price - a?.price);
      case 'rating':
        return sorted?.sort((a, b) => b?.rating - a?.rating);
      case 'newest':
        return sorted?.sort((a, b) => b?.isNew - a?.isNew);
      case 'bestseller':
        return sorted?.sort((a, b) => b?.isBestseller - a?.isBestseller);
      case 'discount':
        return sorted?.sort((a, b) => (b?.discount || 0) - (a?.discount || 0));
      default:
        return sorted;
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterKey, value) => {
    if (filterKey === 'priceRange') {
      setFilters(prev => ({
        ...prev,
        priceRange: { min: '', max: '' }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterKey]: value || []
      }));
    }
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      brand: [],
      connectivity: [],
      power: [],
      features: [],
      priceRange: { min: '', max: '' }
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Implement cart functionality
  };

  const handleToggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLoadMore = async () => {
    // Simulate loading more products
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPage(prev => prev + 1);
  };

  // Get final filtered and sorted products
  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);
  const totalPages = Math.ceil(sortedProducts?.length / 20);

  // Update total results when filters change
  useEffect(() => {
    setTotalResults(sortedProducts?.length);
    setHasMore(currentPage < totalPages);
  }, [sortedProducts?.length, currentPage, totalPages]);

  return (
    <>
      <Helmet>
        <title>Product Catalog - Krishi IoT Store</title>
        <meta name="description" content="Browse our comprehensive collection of agricultural IoT devices, smart farming equipment, and precision agriculture tools. Find the perfect solutions for your farming needs." />
        <meta name="keywords" content="agricultural IoT, smart farming, precision agriculture, farm sensors, irrigation systems" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Filter Chips */}
          <FilterChips
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Sort and View Controls */}
          <SortAndView
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onFilterToggle={() => setIsFilterSidebarOpen(true)}
          />

          <div className="max-w-7xl mx-auto flex">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearAllFilters}
              isOpen={isFilterSidebarOpen}
              onClose={() => setIsFilterSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-6">
              <ProductGrid
                products={sortedProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductCatalog;