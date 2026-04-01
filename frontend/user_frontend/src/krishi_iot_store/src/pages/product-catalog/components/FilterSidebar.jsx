import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  className = "" 
}) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: true,
    connectivity: false,
    power: false,
    features: false
  });

  const categories = [
    { id: 'sensors', label: 'IoT Sensors', count: 156 },
    { id: 'controllers', label: 'Smart Controllers', count: 89 },
    { id: 'monitoring', label: 'Monitoring Systems', count: 67 },
    { id: 'irrigation', label: 'Irrigation Devices', count: 134 },
    { id: 'weather', label: 'Weather Stations', count: 45 },
    { id: 'soil', label: 'Soil Analysis', count: 78 }
  ];

  const brands = [
    { id: 'farmtech', label: 'FarmTech Pro', count: 89 },
    { id: 'agrisense', label: 'AgriSense', count: 67 },
    { id: 'smartfarm', label: 'SmartFarm Solutions', count: 123 },
    { id: 'cropguard', label: 'CropGuard', count: 45 },
    { id: 'fieldmaster', label: 'FieldMaster', count: 78 },
    { id: 'precisionag', label: 'Precision Ag', count: 56 }
  ];

  const connectivityOptions = [
    { id: 'wifi', label: 'Wi-Fi', count: 234 },
    { id: 'bluetooth', label: 'Bluetooth', count: 156 },
    { id: 'lora', label: 'LoRa', count: 89 },
    { id: 'cellular', label: 'Cellular', count: 67 },
    { id: 'zigbee', label: 'ZigBee', count: 45 }
  ];

  const powerOptions = [
    { id: 'battery', label: 'Battery Powered', count: 189 },
    { id: 'solar', label: 'Solar Powered', count: 134 },
    { id: 'wired', label: 'Wired Power', count: 98 },
    { id: 'hybrid', label: 'Hybrid Power', count: 67 }
  ];

  const featureOptions = [
    { id: 'waterproof', label: 'Waterproof (IP67+)', count: 156 },
    { id: 'mobile-app', label: 'Mobile App Control', count: 234 },
    { id: 'cloud-sync', label: 'Cloud Synchronization', count: 189 },
    { id: 'alerts', label: 'Real-time Alerts', count: 167 },
    { id: 'data-export', label: 'Data Export', count: 145 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
    
    if (newRange?.min || newRange?.max) {
      onFilterChange('priceRange', newRange);
    }
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters?.[filterType] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    onFilterChange(filterType, newValues);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.entries(filters)?.forEach(([key, value]) => {
      if (key === 'priceRange' && (value?.min || value?.max)) count++;
      else if (Array.isArray(value) && value?.length > 0) count++;
    });
    return count;
  };

  const FilterSection = ({ title, items, filterKey, isExpanded, onToggle }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => onToggle(filterKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary"
        />
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
          {items?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between">
              <Checkbox
                label={item?.label}
                checked={(filters?.[filterKey] || [])?.includes(item?.id)}
                onChange={(e) => handleCheckboxChange(filterKey, item?.id, e?.target?.checked)}
                className="flex-1"
              />
              <span className="text-xs text-text-secondary ml-2">({item?.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-lg">Filters</h2>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-primary"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Price Range */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-text-primary">Price Range</span>
            <Icon 
              name={expandedSections?.price ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary"
            />
          </button>
          
          {expandedSections?.price && (
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.min}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.max}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span>₹500</span>
                <div className="flex-1 h-1 bg-muted rounded">
                  <div className="h-1 bg-primary rounded w-1/3"></div>
                </div>
                <span>₹50,000</span>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <FilterSection
          title="Category"
          items={categories}
          filterKey="category"
          isExpanded={expandedSections?.category}
          onToggle={() => toggleSection('category')}
        />

        {/* Brand Filter */}
        <FilterSection
          title="Brand"
          items={brands}
          filterKey="brand"
          isExpanded={expandedSections?.brand}
          onToggle={() => toggleSection('brand')}
        />

        {/* Connectivity Filter */}
        <FilterSection
          title="Connectivity"
          items={connectivityOptions}
          filterKey="connectivity"
          isExpanded={expandedSections?.connectivity}
          onToggle={() => toggleSection('connectivity')}
        />

        {/* Power Source Filter */}
        <FilterSection
          title="Power Source"
          items={powerOptions}
          filterKey="power"
          isExpanded={expandedSections?.power}
          onToggle={() => toggleSection('power')}
        />

        {/* Features Filter */}
        <FilterSection
          title="Features"
          items={featureOptions}
          filterKey="features"
          isExpanded={expandedSections?.features}
          onToggle={() => toggleSection('features')}
        />
      </div>

      {/* Apply Button (Mobile) */}
      <div className="p-4 border-t border-border lg:hidden">
        <Button
          variant="default"
          fullWidth
          onClick={onClose}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  // Mobile overlay
  if (isOpen && window.innerWidth < 1024) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-surface shadow-elevated">
          {sidebarContent}
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className={`hidden lg:block w-80 bg-surface border-r border-border ${className}`}>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;