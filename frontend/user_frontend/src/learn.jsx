import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plane as Plant, 
  PlayCircle, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Sprout, 
  FlaskRound as Flask, 
  Leaf, 
  Calendar, 
  LineChart, 
  Droplets, 
  Building2,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Share2,
  MessageCircle,
  Users,
  Trophy,
  Newspaper
} from 'lucide-react';

const features = [
  {
    title: "Disease Detection",
    description: "Learn how our AI-powered system detects plant diseases early",
    icon: <Plant className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example1",
    category: "core",
    duration: "10 min",
    views: "2.5K"
  },
  {
    title: "NPK Analysis",
    description: "Understanding soil nutrient analysis and recommendations",
    icon: <Flask className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example2",
    category: "core",
    duration: "8 min",
    views: "1.8K"
  },
  {
    title: "Soil & Seed Selection",
    description: "Expert guidance on choosing the right seeds for your soil",
    icon: <Sprout className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example3",
    category: "core",
    duration: "12 min",
    views: "3.2K"
  },
  {
    title: "Seasonal Medicines",
    description: "Timing your plant protection measures perfectly",
    icon: <Calendar className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example4",
    category: "advanced",
    duration: "15 min",
    views: "1.5K"
  },
  {
    title: "Growth Tracking",
    description: "Monitor and analyze your crop's progress effectively",
    icon: <LineChart className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example5",
    category: "advanced",
    duration: "9 min",
    views: "2.1K"
  },
  {
    title: "Water Management",
    description: "Smart irrigation scheduling and monitoring techniques",
    icon: <Droplets className="w-6 h-6" />,
    videoUrl: "https://www.youtube.com/watch?v=example6",
    category: "advanced",
    duration: "11 min",
    views: "1.9K"
  }
];

const tutorials = [
  {
    title: "Getting Started with Kissan Helper",
    duration: "5 min read",
    type: "article",
    icon: <BookOpen className="w-6 h-6" />,
    link: "/learn/getting-started",
    author: "Dr. Rajesh Kumar",
    authorRole: "Agricultural Expert"
  },
  {
    title: "Complete Guide to Soil Analysis",
    duration: "15 min video",
    type: "video",
    icon: <PlayCircle className="w-6 h-6" />,
    link: "/learn/soil-analysis",
    author: "Dr. Priya Sharma",
    authorRole: "Soil Scientist"
  },
  {
    title: "Understanding Government Schemes",
    duration: "10 min read",
    type: "article",
    icon: <Building2 className="w-6 h-6" />,
    link: "/learn/govt-schemes",
    author: "Amit Patel",
    authorRole: "Policy Expert"
  },
  {
    title: "Seasonal Crop Planning",
    duration: "12 min video",
    type: "video",
    icon: <Leaf className="w-6 h-6" />,
    link: "/learn/crop-planning",
    author: "Dr. Meena Kumari",
    authorRole: "Crop Specialist"
  }
];

const successStories = [
  {
    farmer: "Ramesh Yadav",
    location: "Punjab",
    achievement: "40% increase in wheat yield",
    image: "https://images.unsplash.com/photo-1595749615311-da0b72c15755?q=80&w=400",
    story: "Using Kissan Helper's soil analysis and crop recommendations..."
  },
  {
    farmer: "Lakshmi Devi",
    location: "Karnataka",
    achievement: "Successful organic farming transition",
    image: "https://images.unsplash.com/photo-1595749615314-a5f0da4ba886?q=80&w=400",
    story: "Implemented sustainable farming practices with expert guidance..."
  }
];

const socialFeeds = [
  {
    platform: "YouTube",
    icon: <Youtube className="w-6 h-6" />,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    followers: "50K",
    link: "https://youtube.com/@kissanhelper"
  },
  {
    platform: "Facebook",
    icon: <Facebook className="w-6 h-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    followers: "75K",
    link: "https://facebook.com/kissanhelper"
  },
  {
    platform: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    followers: "45K",
    link: "https://instagram.com/kissanhelper"
  },
  {
    platform: "Twitter",
    icon: <Twitter className="w-6 h-6" />,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    followers: "30K",
    link: "https://twitter.com/kissanhelper"
  }
];

export default function Learn() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920"
            alt="Farm background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Learn to Farm <span className="text-green-500">Smarter</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive guides, tutorials, and videos to make the most of 
              Kissan Helper's features and improve your farming practices.
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-4 mb-8">
              {socialFeeds.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${social.bgColor} ${social.color} hover:opacity-80 transition-opacity`}
                >
                  {social.icon}
                  <span className="font-medium">{social.followers} followers</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Start Tutorials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Quick Start Guides</h2>
          <p className="text-gray-400">Get started with these essential tutorials</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => navigate(tutorial.link)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                  {tutorial.icon}
                </div>
                <div>
                  <p className="text-sm text-green-500">{tutorial.type}</p>
                  <p className="text-sm text-gray-400">{tutorial.duration}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{tutorial.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                  {tutorial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-white">{tutorial.author}</p>
                  <p className="text-xs text-gray-400">{tutorial.authorRole}</p>
                </div>
              </div>
              <button className="text-green-500 text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Tutorials */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Feature Tutorials</h2>
            <p className="text-gray-400">Master every aspect of Kissan Helper</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden group"
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + index}?q=80&w=800`}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {feature.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                      {feature.icon}
                    </div>
                    <span className="text-xs font-medium text-green-500 uppercase tracking-wider">
                      {feature.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-green-500 flex items-center gap-1 hover:gap-2 transition-all">
                      Watch Tutorial <ArrowRight size={16} />
                    </button>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {feature.views}
                      </span>
                      <button className="hover:text-white">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-400">Learn from fellow farmers' experiences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden"
            >
              <div className="aspect-video">
                <img
                  src={story.image}
                  alt={story.farmer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-yellow-500 font-medium">{story.achievement}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{story.farmer}</h3>
                <p className="text-gray-400 mb-4">{story.location}</p>
                <p className="text-gray-300">{story.story}</p>
                <button className="mt-4 text-green-500 flex items-center gap-1 hover:gap-2 transition-all">
                  Read Full Story <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community & Resources */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Community & Resources</h2>
            <p className="text-gray-400">Connect, learn, and grow together</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500 w-fit mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Discussion Forum</h3>
              <p className="text-gray-400 mb-4">
                Join our community of farmers and experts to discuss challenges and share solutions
              </p>
              <button className="text-green-500 flex items-center gap-1 hover:gap-2 transition-all">
                Join Discussion <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500 w-fit mb-4">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Webinars</h3>
              <p className="text-gray-400 mb-4">
                Attend live sessions with agricultural experts and get your questions answered
              </p>
              <button className="text-green-500 flex items-center gap-1 hover:gap-2 transition-all">
                View Schedule <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500 w-fit mb-4">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our weekly newsletter for farming tips and updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}