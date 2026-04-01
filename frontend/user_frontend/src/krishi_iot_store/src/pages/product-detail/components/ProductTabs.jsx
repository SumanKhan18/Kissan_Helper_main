import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'installation', label: 'Installation', icon: 'Wrench' },
    { id: 'compatibility', label: 'Compatibility', icon: 'Zap' },
    { id: 'warranty', label: 'Warranty', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product?.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border">
                    <span className="text-text-secondary">{spec?.label}</span>
                    <span className="text-text-primary font-medium">{spec?.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product?.performanceMetrics?.map((metric, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
                    <div className="text-sm text-text-secondary">{metric?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'installation':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Installation Guide</h3>
              <div className="space-y-4">
                {product?.installationSteps?.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary mb-1">{step?.title}</h4>
                      <p className="text-text-secondary text-sm">{step?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-text-primary mb-1">Important Notes</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Ensure proper waterproofing for outdoor installations</li>
                    <li>• Check local regulations for wireless device deployment</li>
                    <li>• Professional installation recommended for complex setups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compatibility':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-4">System Compatibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Compatible Platforms</h4>
                  <div className="space-y-2">
                    {product?.compatiblePlatforms?.map((platform, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-text-secondary">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Communication Protocols</h4>
                  <div className="space-y-2">
                    {product?.protocols?.map((protocol, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                        <Icon name="Wifi" size={16} className="text-primary" />
                        <span className="text-text-secondary">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Recommended Accessories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product?.recommendedAccessories?.map((accessory, index) => (
                  <div key={index} className="border border-border p-4 rounded-lg">
                    <h4 className="font-medium text-text-primary mb-1">{accessory?.name}</h4>
                    <p className="text-sm text-text-secondary mb-2">{accessory?.description}</p>
                    <div className="text-primary font-semibold">${accessory?.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'warranty':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Warranty Coverage</h3>
              <div className="bg-success/10 border border-success/20 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                  <div>
                    <h4 className="font-semibold text-text-primary">{product?.warranty?.duration} Warranty</h4>
                    <p className="text-sm text-text-secondary">Comprehensive coverage included</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">What's Covered</h4>
                  <ul className="space-y-1">
                    {product?.warranty?.covered?.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">What's Not Covered</h4>
                  <ul className="space-y-1">
                    {product?.warranty?.notCovered?.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Icon name="X" size={16} className="text-error mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Support Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-text-secondary">1-800-KRISHI-IOT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-text-secondary">support@krishiiot.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-text-secondary">24/7 Technical Support</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;