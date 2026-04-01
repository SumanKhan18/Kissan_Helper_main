// Styles for page sections
const pageStyles = {
  position: "relative",
  zIndex: 1,
  transform: "translateZ(0)",
  transition: "all 0.3s ease-in-out",
  overflow: "hidden", // Added to prevent overflow issues
};

// Parallax scroll effect hook - disabled due to performance issues
const useParallaxScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".parallax-section");
      sections.forEach((section, index) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        section.style.transform = `translateY(${rate * (index + 1)}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Enabled the hook for scrolling effect

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".parallax-section");
      sections.forEach((section, index) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        section.style.transform = `translateY(${rate * (index + 1)}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

// Custom styles for hover effects
const hoverStyles = {
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      "linear-gradient(45deg, rgba(34,197,94,0.2), rgba(16,185,129,0.2))",
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
};

// CSS classes for gradient hover effects
const gradientHoverClasses =
  "hover:bg-gradient-to-br hover:from-green-900/50 hover:to-green-900/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl ";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Users, Target, Eye, Sprout } from "lucide-react";
import us from "./assets/us.jpg";
import Card1 from "./block/Card1"
import Card from "./block/Card"


export default function About() {
  const [farmersHelped, setFarmersHelped] = useState(0);
  const targetFarmers = 0;
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      // Animate the counter
      const interval = setInterval(() => {
        setFarmersHelped((prev) => {
          if (prev < targetFarmers) {
            return prev + 100;
          }
          clearInterval(interval);
          return targetFarmers;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="pt-16 bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center parallax-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Farming landscape"
            className="w-full h-full object-cover opacity-30 "
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About <span className="text-green-500">KissanHelper</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto "
          >
            Transforming agriculture through technology and community
          </motion.p>
        </div>
      </div>

      {/* Who We Are Section */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-4 py-20 parallax-section "
      >
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12 items-center "
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-300 mb-6">
              KissanHelper was founded with a simple yet powerful vision: to
              empower Indian farmers with modern technology and sustainable
              farming practices. Our platform bridges the gap between
              traditional farming wisdom and contemporary agricultural
              innovations.
            </p>
            <p className="text-gray-300">
              We believe that every farmer deserves access to the best
              resources, knowledge, and community support to thrive in today's
              agricultural landscape.
            </p>
          </div>
          <div className="relative">
            <Card1 className="rounded-4xl shadow-2xl hover:shadow-[#00800069] cursor-pointer">
              <img
                src={us}
                alt="About KissanHelper Team"
                className="w-[400px] h-[550px] rounded-4xl object-cover"
              />
            </Card1>
          </div>
        </motion.div>

        {/* Vision and Mission */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 mt-32"
        >
          <div className="bg-gray-900 p-8 rounded-lg">
            <Eye className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-300">
              To create a future where every Indian farmer has the tools,
              knowledge, and support needed to build a sustainable and
              profitable agricultural business.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <Target className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300">
              To provide innovative solutions, expert guidance, and a supportive
              community that enables farmers to adopt sustainable practices and
              increase their yield while preserving natural resources.
            </p>
          </div>
        </motion.div>

        {/* <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12 items-center mt-10"
        >
          <div className="relative">
            <Card className="rounded-4xl shadow-2xl hover:shadow-[#00800069] cursor-pointer">
              <img
                src={us}
                alt="About KissanHelper Team"
                className="w-[400px] h-[550px] rounded-4xl object-cover"
              />
            </Card>
          </div>
        </motion.div> */}

        {/* Impact Counter */}
        <motion.div
          variants={containerVariants}
          className="text-center mt-32 bg-gradient-to-r from-green-900 to-green-700 p-12 rounded-lg"
        >
          <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Users className="h-12 w-12 mx-auto text-white mb-4" />
              <div className="text-4xl font-bold mb-2">
                {farmersHelped.toLocaleString()}
              </div>
              <p className="text-gray-200">Farmers Helped</p>
            </div>
            <div>
              <Target className="h-12 w-12 mx-auto text-white mb-4" />
              <div className="text-4xl font-bold mb-2">0</div>
              <p className="text-gray-200">States Covered</p>
            </div>
            <div>
              <Sprout className="h-12 w-12 mx-auto text-white mb-4" />
              <div className="text-4xl font-bold mb-2">0+</div>
              <p className="text-gray-200">Expert Advisors</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
