import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const formatFilterValue = (key, value) => {
    switch (key) {
      case 'priceRange':
        if (value?.min && value?.max) {
          return `₹${value?.min} - ₹${value?.max}`;
        } else if (value?.min) {
          return `Above ₹${value?.min}`;
        } else if (value?.max) {
          return `Below ₹${value?.max}`;
        }
        return '';
      case 'category':
        const categoryLabels = {
          'sensors': 'IoT Sensors',
          'controllers': 'Smart Controllers',
          'monitoring': 'Monitoring Systems',
          'irrigation': 'Irrigation Devices',
          'weather': 'Weather Stations',
          'soil': 'Soil Analysis'
        };
        return categoryLabels?.[value] || value;
      case 'brand':
        const brandLabels = {
          'farmtech': 'FarmTech Pro',
          'agrisense': 'AgriSense',
          'smartfarm': 'SmartFarm Solutions',
          'cropguard': 'CropGuard',
          'fieldmaster': 'FieldMaster',
          'precisionag': 'Precision Ag'
        };
        return brandLabels?.[value] || value;
      case 'connectivity':
        const connectivityLabels = {
          'wifi': 'Wi-Fi',
          'bluetooth': 'Bluetooth',
          'lora': 'LoRa',
          'cellular': 'Cellular',
          'zigbee': 'ZigBee'
        };
        return connectivityLabels?.[value] || value;
      case 'power':
        const powerLabels = {
          'battery': 'Battery Powered',
          'solar': 'Solar Powered',
          'wired': 'Wired Power',
          'hybrid': 'Hybrid Power'
        };
        return powerLabels?.[value] || value;
      case 'features':
        const featureLabels = {
          'waterproof': 'Waterproof (IP67+)',
          'mobile-app': 'Mobile App Control',
          'cloud-sync': 'Cloud Synchronization',
          'alerts': 'Real-time Alerts',
          'data-export': 'Data Export'
        };
        return featureLabels?.[value] || value;
      default:
        return value;
    }
  };

  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters)?.forEach(([key, value]) => {
      if (key === 'priceRange' && (value?.min || value?.max)) {
        chips?.push({
          key,
          value,
          label: formatFilterValue(key, value),
          type: 'single'
        });
      } else if (Array.isArray(value) && value?.length > 0) {
        value?.forEach(item => {
          chips?.push({
            key,
            value: item,
            label: formatFilterValue(key, item),
            type: 'array'
          });
        });
      }
    });
    
    return chips;
  };

  const handleRemoveChip = (chipKey, chipValue, chipType) => {
    if (chipType === 'single') {
      onRemoveFilter(chipKey, null);
    } else {
      const currentValues = activeFilters?.[chipKey] || [];
      const newValues = currentValues?.filter(v => v !== chipValue);
      onRemoveFilter(chipKey, newValues);
    }
  };

  const chips = getFilterChips();

  if (chips?.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Active Filters ({chips?.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-text-secondary hover:text-destructive"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear All
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {chips?.map((chip, index) => (
            <div
              key={`${chip?.key}-${chip?.value}-${index}`}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm"
            >
              <span className="truncate max-w-32">{chip?.label}</span>
              <button
                onClick={() => handleRemoveChip(chip?.key, chip?.value, chip?.type)}
                className="flex-shrink-0 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;