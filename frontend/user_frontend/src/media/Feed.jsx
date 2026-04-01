import React from 'react';
import { ThumbsUp, MessageCircle, Share2, BookmarkPlus, Video, Image } from 'lucide-react';

function Feed() {
  const posts = [
    {
      id: 1,
      author: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content: "Just implemented organic farming techniques in my wheat field. The results are amazing! Sharing some insights on pest control using neem-based solutions.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800",
      likes: 234,
      comments: 45,
      shares: 12
    },
    {
      id: 2,
      author: "Priya Singh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content: "Here's my experience with drip irrigation system. It has helped reduce water consumption by 60% while improving yield. Happy to share more details!",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      likes: 156,
      comments: 23,
      shares: 8
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Share your farming insights..."
            className="flex-1 bg-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
            <Video className="h-5 w-5" />
            <span>Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
            <Image className="h-5 w-5" />
            <span>Photo</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map(post => (
        <div key={post.id} className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3 mb-4">
            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold text-white">{post.author}</h3>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-200 mb-4">{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />
          )}
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
              <ThumbsUp className="h-5 w-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
              <Share2 className="h-5 w-5" />
              <span>{post.shares}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-green-400">
              <BookmarkPlus className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;