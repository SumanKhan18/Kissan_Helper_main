import React from 'react';
import { Bell, ThumbsUp, MessageCircle, UserPlus } from 'lucide-react';

function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'liked your post about organic farming',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Priya Singh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      content: 'commented on your tutorial video',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'follow',
      user: 'Amit Patel',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
      content: 'started following you',
      time: '1 day ago'
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <img
                  src={notification.avatar}
                  alt={notification.user}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-white">
                    <span className="font-semibold">{notification.user}</span>{' '}
                    {notification.content}
                  </p>
                  <p className="text-sm text-gray-400">{notification.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;