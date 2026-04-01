import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    farmName: 'Kumar Organic Farm',
    farmSize: '25',
    cropTypes: 'Wheat, Rice, Vegetables',
    experience: '15',
    location: 'Jaipur, Rajasthan'
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: true,
    stockAlerts: true,
    weatherAlerts: true,
    deviceAlerts: true,
    promotions: false,
    newsletter: true,
    smsNotifications: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'farm', label: 'Farm Details', icon: 'Sprout' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          value={profileData?.firstName}
          onChange={(e) => handleProfileChange('firstName', e?.target?.value)}
          required
        />
        <Input
          label="Last Name"
          type="text"
          value={profileData?.lastName}
          onChange={(e) => handleProfileChange('lastName', e?.target?.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          value={profileData?.email}
          onChange={(e) => handleProfileChange('email', e?.target?.value)}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={profileData?.phone}
          onChange={(e) => handleProfileChange('phone', e?.target?.value)}
          required
        />
      </div>

      <Input
        label="Location"
        type="text"
        value={profileData?.location}
        onChange={(e) => handleProfileChange('location', e?.target?.value)}
        description="City, State"
      />

      <div className="flex justify-end">
        <Button variant="default">Save Profile</Button>
      </div>
    </div>
  );

  const renderFarmTab = () => (
    <div className="space-y-6">
      <Input
        label="Farm Name"
        type="text"
        value={profileData?.farmName}
        onChange={(e) => handleProfileChange('farmName', e?.target?.value)}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Farm Size (Acres)"
          type="number"
          value={profileData?.farmSize}
          onChange={(e) => handleProfileChange('farmSize', e?.target?.value)}
          required
        />
        <Input
          label="Years of Experience"
          type="number"
          value={profileData?.experience}
          onChange={(e) => handleProfileChange('experience', e?.target?.value)}
          required
        />
      </div>

      <Input
        label="Primary Crop Types"
        type="text"
        value={profileData?.cropTypes}
        onChange={(e) => handleProfileChange('cropTypes', e?.target?.value)}
        description="Separate multiple crops with commas"
      />

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-text-primary mb-2">Farm Certification</h3>
        <p className="text-sm text-text-secondary mb-3">
          Add your organic or other certifications to get personalized product recommendations
        </p>
        <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
          Upload Certificates
        </Button>
      </div>

      <div className="flex justify-end">
        <Button variant="default">Save Farm Details</Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-text-primary mb-4">Order & Account Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about order status changes' },
            { key: 'priceAlerts', label: 'Price Alerts', description: 'Notify when wishlist items go on sale' },
            { key: 'stockAlerts', label: 'Stock Alerts', description: 'Notify when out-of-stock items are available' }
          ]?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium text-text-primary">{item?.label}</h4>
                <p className="text-sm text-text-secondary">{item?.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications?.[item?.key]}
                  onChange={(e) => handleNotificationChange(item?.key, e?.target?.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-4">Smart Farm Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'weatherAlerts', label: 'Weather Alerts', description: 'Critical weather updates for your location' },
            { key: 'deviceAlerts', label: 'Device Alerts', description: 'IoT device status and maintenance alerts' }
          ]?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium text-text-primary">{item?.label}</h4>
                <p className="text-sm text-text-secondary">{item?.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications?.[item?.key]}
                  onChange={(e) => handleNotificationChange(item?.key, e?.target?.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-4">Marketing & Communication</h3>
        <div className="space-y-4">
          {[
            { key: 'promotions', label: 'Promotional Offers', description: 'Special deals and seasonal offers' },
            { key: 'newsletter', label: 'Newsletter', description: 'Monthly farming tips and product updates' },
            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive important updates via SMS' }
          ]?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium text-text-primary">{item?.label}</h4>
                <p className="text-sm text-text-secondary">{item?.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications?.[item?.key]}
                  onChange={(e) => handleNotificationChange(item?.key, e?.target?.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="default">Save Preferences</Button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-medium text-text-primary mb-2">Change Password</h3>
        <p className="text-sm text-text-secondary mb-4">
          Update your password to keep your account secure
        </p>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>
        <div className="mt-4">
          <Button variant="default">Update Password</Button>
        </div>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-medium text-text-primary mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-text-secondary mb-4">
          Add an extra layer of security to your account
        </p>
        <Button variant="outline" iconName="Shield" iconPosition="left">
          Enable 2FA
        </Button>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-medium text-text-primary mb-2">Login Sessions</h3>
        <p className="text-sm text-text-secondary mb-4">
          Manage your active login sessions across devices
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Monitor" size={20} className="text-text-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">Desktop - Chrome</p>
                <p className="text-xs text-text-secondary">Current session • Jaipur, India</p>
              </div>
            </div>
            <span className="text-xs text-success">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Smartphone" size={20} className="text-text-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">Mobile - Safari</p>
                <p className="text-xs text-text-secondary">2 hours ago • Jaipur, India</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Revoke</Button>
          </div>
        </div>
      </div>

      <div className="p-4 border border-error/20 bg-error/5 rounded-lg">
        <h3 className="font-medium text-error mb-2">Delete Account</h3>
        <p className="text-sm text-text-secondary mb-4">
          Permanently delete your account and all associated data
        </p>
        <Button variant="destructive" size="sm">
          Delete Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Account Settings</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'farm' && renderFarmTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'security' && renderSecurityTab()}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;