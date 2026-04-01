import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistSection = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Advanced Drone Sprayer Kit",
      originalPrice: "₹85,000",
      currentPrice: "₹78,500",
      discount: "8%",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
      inStock: true,
      priceDropped: true,
      category: "Drones"
    },
    {
      id: 2,
      name: "Smart Greenhouse Controller",
      originalPrice: "₹45,000",
      currentPrice: "₹45,000",
      discount: null,
      image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?w=400&h=300&fit=crop",
      inStock: false,
      priceDropped: false,
      category: "Controllers",
      expectedRestockDate: "2024-08-25"
    },
    {
      id: 3,
      name: "Multi-Parameter Water Quality Tester",
      originalPrice: "₹12,500",
      currentPrice: "₹10,999",
      discount: "12%",
      image: "https://images.pixabay.com/photo/2016/11/29/13/14/agriculture-1869325_1280.jpg?w=400&h=300&fit=crop",
      inStock: true,
      priceDropped: true,
      category: "Testing Equipment"
    },
    {
      id: 4,
      name: "Solar-Powered Weather Station",
      originalPrice: "₹32,000",
      currentPrice: "₹32,000",
      discount: null,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
      inStock: true,
      priceDropped: false,
      category: "Weather Monitoring"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Wishlist</h2>
        <Button variant="outline" size="sm">
          View All ({wishlistItems?.length})
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlistItems?.slice(0, 4)?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
                {item?.priceDropped && (
                  <div className="absolute top-1 left-1 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">
                    -{item?.discount}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text-primary text-sm leading-tight mb-1 line-clamp-2">
                      {item?.name}
                    </h3>
                    <p className="text-xs text-text-secondary">{item?.category}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <Icon name="X" size={16} />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary text-sm">{item?.currentPrice}</span>
                    {item?.originalPrice !== item?.currentPrice && (
                      <span className="text-xs text-text-secondary line-through">{item?.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item?.inStock ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-success">In Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-error rounded-full"></div>
                        <span className="text-xs text-error">Out of Stock</span>
                      </div>
                    )}
                    
                    {item?.priceDropped && (
                      <div className="flex items-center gap-1">
                        <Icon name="TrendingDown" size={12} className="text-accent" />
                        <span className="text-xs text-accent">Price Drop!</span>
                      </div>
                    )}
                  </div>

                  {!item?.inStock && item?.expectedRestockDate && (
                    <p className="text-xs text-text-secondary">
                      Expected: {new Date(item.expectedRestockDate)?.toLocaleDateString('en-IN')}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  {item?.inStock ? (
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1 text-xs" disabled>
                      Notify Me
                    </Button>
                  )}
                  <Link to="/product-detail" className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishlistItems?.some(item => item?.priceDropped) && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Bell" size={16} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-accent">Price Alert!</p>
              <p className="text-xs text-text-secondary">
                {wishlistItems?.filter(item => item?.priceDropped)?.length} items in your wishlist have price drops
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;