import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-32 h-32"
      >
        {/* Plant Logo SVG */}
<svg 
  width="100" 
  height="100" 
  viewBox="0 0 22  22" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  xmlns="http://www.w3.org/2000/svg">
  <path d="M7 20h10 M10 20c5.5-2.5.8-6.4 3-10 M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7C9.8 13.5 8.3 13.5 7 12.8C5.8 12.2 4.7 10.9 4 8.6C6.8 8.1 8.4 8.6 9.5 9.4z M14.1 6a7 7 0 0 0-1.1 4C14.9 9.9 16.3 9.4 17.3 8.6C18.3 7.6 18.9 6.3 19 4C16.3 4.1 15 5 14.1 6z"/>
</svg>


        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full blur-xl"
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ zIndex: -1 }}
        />

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-500 font-medium"
          initial={{ opacity: 5 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  );
}