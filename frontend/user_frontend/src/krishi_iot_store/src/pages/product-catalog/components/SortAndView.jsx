import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortAndView = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  totalResults,
  currentPage,
  totalPages,
  onFilterToggle
}) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'bestseller', label: 'Best Sellers', icon: 'TrendingUp' },
    { value: 'discount', label: 'Highest Discount', icon: 'Percent' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef?.current && !sortDropdownRef?.current?.contains(event?.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions?.find(option => option?.value === sortBy);
    return currentSort ? currentSort?.label : 'Best Match';
  };

  const formatResultsText = () => {
    if (totalResults === 0) return 'No results';
    
    const startResult = (currentPage - 1) * 20 + 1;
    const endResult = Math.min(currentPage * 20, totalResults);
    
    return `Showing ${startResult}-${endResult} of ${totalResults?.toLocaleString()} results`;
  };

  return (
    <div className="bg-surface border-b border-border px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Side - Results Count and Filter Toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterToggle}
              className="lg:hidden"
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
            >
              Filters
            </Button>

            {/* Results Count */}
            <div className="hidden sm:block">
              <span className="text-sm text-text-secondary">
                {formatResultsText()}
              </span>
            </div>
          </div>

          {/* Right Side - Sort and View Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="min-w-32 justify-between"
              >
                <span className="truncate">{getCurrentSortLabel()}</span>
                <Icon 
                  name={isSortDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="ml-2 flex-shrink-0"
                />
              </Button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-md shadow-elevated z-50">
                  <div className="py-1">
                    {sortOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => {
                          onSortChange(option?.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-muted transition-colors ${
                          sortBy === option?.value 
                            ? 'bg-primary/10 text-primary' :'text-popover-foreground'
                        }`}
                      >
                        <Icon name={option?.icon} size={16} />
                        <span>{option?.label}</span>
                        {sortBy === option?.value && (
                          <Icon name="Check" size={16} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center border border-border rounded-md overflow-hidden">
              {viewModes?.map((mode) => (
                <button
                  key={mode?.value}
                  onClick={() => onViewModeChange(mode?.value)}
                  className={`p-2 transition-colors ${
                    viewMode === mode?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-text-secondary hover:bg-muted hover:text-text-primary'
                  }`}
                  title={mode?.label}
                >
                  <Icon name={mode?.icon} size={16} />
                </button>
              ))}
            </div>

            {/* Comparison Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex"
              iconName="GitCompare"
              iconPosition="left"
              iconSize={16}
            >
              Compare
            </Button>
          </div>
        </div>

        {/* Mobile Results Count */}
        <div className="sm:hidden mt-2">
          <span className="text-xs text-text-secondary">
            {formatResultsText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortAndView;