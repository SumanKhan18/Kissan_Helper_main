import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Leaf, Sun, Cloud } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cards = [
    {
      title: "Sustainable Farming",
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      description:
        "Learn about eco-friendly farming practices that help preserve our environment.",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Weather Insights",
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
      description:
        "Get real-time weather updates and forecasts for better crop planning.",
      image:
        "https://images.unsplash.com/photo-1660319106724-e2af3353c650?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Crop Management",
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
      description:
        "Expert tips on crop rotation, pest control, and yield optimization.",
      image:
        "https://plus.unsplash.com/premium_photo-1661963792535-4e91ddccdfb0?q=80&w=2114&auto=format&fit=crop",
    },
  ];

  const stats = [
    { number: "0", label: "Active Farmers" },
    { number: "0%", label: "Success Rate" },
    { number: "0", label: "States Covered" },
    { number: "0", label: "Acres Analyzed" },
  ];

  const testimonials = [
    {
      name: "XYZ",
      location: "Punjab",
      quote:
        "KissanHelper has transformed how I manage my farm. The insights are invaluable.",
      image: " ",
    },
    {
      name: "ABCD",
      location: "Gujarat",
      quote: "The soil analysis feature helped me increase my crop yield by 40%.",
      image: " ",
    },
  ];

  const handleGetStarted = () => {
    // Check token in localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    navigate(token ? "/dashboard" : "/auth");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920"
            alt="Farm background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6"
          >
            Grow Better, <span className="text-green-500">Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl mb-8"
          >
            Empowering farmers with modern solutions for sustainable agriculture
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleGetStarted}
              className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-green-600 transition-all mr-4"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/media")}
              className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-full text-lg font-bold hover:bg-green-500 hover:text-black transition-all mt-3"
            >
              Kissan Media
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-green-500"
          >
            <Leaf className="h-8 w-8" />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={ref} className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-white ml-2">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-400">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-3">
          Our Achievements
        </h2>
        <p className="text-gray-400 text-center">
          A look at what we have accomplished so far
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 mt-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 p-8 rounded-lg text-center"
            >
              <div className="text-4xl font-bold text-green-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-black-800 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-3">
          What Farmers Say
        </h2>
        <p className="text-gray-400 text-center">
          Real success stories from farmers using KissanHelper
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mt-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="bg-gray-900 p-8 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Join Our Farming Community
        </h2>
        <p className="text-xl text-gray-200 mb-8">
          Connect with experts and fellow farmers to share knowledge and grow
          together.
        </p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate("/join")}
          className="border-2 border-black-500 text-black-500 px-8 py-3 rounded-full text-lg font-bold hover:bg-green-500 hover:text-black transition-all"
        >
          Join Now
        </motion.button>
      </div>
    </div>
  );
}
