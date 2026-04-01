import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' },
    { value: 'verified', label: 'Verified Purchases' },
    { value: 'photos', label: 'With Photos' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 65 },
    { stars: 4, count: 18, percentage: 26 },
    { stars: 3, count: 4, percentage: 6 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-text-primary">{averageRating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(averageRating)}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution?.map((rating) => (
              <div key={rating?.stars} className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary w-6">
                  {rating?.stars}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-smooth"
                    style={{ width: `${rating?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">
                  {rating?.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
          className="sm:w-48"
        />
        <Select
          options={filterOptions}
          value={filterBy}
          onChange={setFilterBy}
          placeholder="Filter reviews"
          className="sm:w-48"
        />
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <Image
                  src={review?.user?.avatar}
                  alt={review?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-text-primary">{review?.user?.name}</h4>
                    {review?.verified && (
                      <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                  {review?.farmType && (
                    <p className="text-sm text-text-secondary">
                      Farm Type: {review?.farmType} | Size: {review?.farmSize}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-text-primary mb-2">{review?.title}</h5>
                <p className="text-text-secondary leading-relaxed">{review?.content}</p>
              </div>

              {/* Review Images */}
              {review?.images && review?.images?.length > 0 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {review?.images?.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-smooth"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Pros and Cons */}
              {(review?.pros || review?.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review?.pros && (
                    <div>
                      <h6 className="font-medium text-success mb-2 flex items-center space-x-1">
                        <Icon name="ThumbsUp" size={16} />
                        <span>Pros</span>
                      </h6>
                      <ul className="space-y-1">
                        {review?.pros?.map((pro, index) => (
                          <li key={index} className="text-sm text-text-secondary flex items-start space-x-2">
                            <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {review?.cons && (
                    <div>
                      <h6 className="font-medium text-error mb-2 flex items-center space-x-1">
                        <Icon name="ThumbsDown" size={16} />
                        <span>Cons</span>
                      </h6>
                      <ul className="space-y-1">
                        {review?.cons?.map((con, index) => (
                          <li key={index} className="text-sm text-text-secondary flex items-start space-x-2">
                            <Icon name="Minus" size={14} className="text-error mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-smooth">
                    <Icon name="ThumbsUp" size={16} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-smooth">
                    <Icon name="MessageCircle" size={16} />
                    <span>Reply</span>
                  </button>
                </div>
                <button className="text-sm text-text-secondary hover:text-primary transition-smooth">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;