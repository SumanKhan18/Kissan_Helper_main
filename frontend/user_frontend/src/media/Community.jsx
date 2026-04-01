import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

function Community() {
  const communities = [
    {
      id: 1,
      name: "Organic Farming Network",
      members: 1234,
      description: "A community dedicated to sharing organic farming practices and experiences.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800",
      activePosts: 45
    },
    {
      id: 2,
      name: "Smart Agriculture Tech",
      members: 856,
      description: "Discuss and learn about modern farming technologies and innovations.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      activePosts: 32
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid gap-6">
        {communities.map(community => (
          <div key={community.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {community.name}
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">{community.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="h-5 w-5" />
                    <span>{community.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MessageSquare className="h-5 w-5" />
                    <span>{community.activePosts} active posts</span>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;