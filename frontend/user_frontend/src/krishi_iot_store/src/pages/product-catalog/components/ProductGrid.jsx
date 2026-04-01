import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ 
  products, 
  loading, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistItems = [],
  hasMore = false,
  onLoadMore
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-square bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-muted rounded w-12"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-3 bg-muted rounded w-1/3"></div>
        <div className="h-8 bg-muted rounded w-full"></div>
      </div>
    </div>
  );

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
      observer?.observe(sentinel);
    }

    return () => observer?.disconnect();
  }, [hasMore, loading, loadingMore]);

  if (loading && products?.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(12)]?.map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!loading && products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Package" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-text-secondary max-w-md">
          We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={wishlistItems?.includes(product?.id)}
          />
        ))}
      </div>
      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(8)]?.map((_, index) => (
            <ProductSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}
      {/* Load More Sentinel */}
      {hasMore && !loading && (
        <div id="load-more-sentinel" className="h-10 flex items-center justify-center">
          {loadingMore && (
            <div className="flex items-center space-x-2 text-text-secondary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading more products...</span>
            </div>
          )}
        </div>
      )}
      {/* End of Results */}
      {!hasMore && products?.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;