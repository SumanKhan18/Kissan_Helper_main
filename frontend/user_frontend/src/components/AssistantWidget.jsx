import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgArrowsExpandUpLeft } from "react-icons/cg"; 
import aiAgentImg from "../assets/ai-agent.jpg";

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Auto-show tooltip a few seconds after load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 7000);
      return () => clearTimeout(hideTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show tooltip while hovering
  useEffect(() => {
    let delay;
    if (hovering) {
      setShowTooltip(false);
      delay = setTimeout(() => setShowTooltip(true), 300);
    } else {
      const delay = setTimeout(() => setShowTooltip(false), 3000);
      return () => clearTimeout(delay);
    }
  }, [hovering]);

  return (
    <AnimatePresence mode="wait">
      {/* Floating AI Chat Box with Overlay */}
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)} // ✅ close on backdrop click
        >
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4 }}
            className="relative bottom-6 right-6 w-96 h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
          >
            {/* Chatbox Header */}
            <div className="flex items-center justify-between bg-green-700 text-white px-4 py-2">
              <h3 className="font-semibold">Kissan Mitra</h3>
              <div className="flex items-center gap-3">
                {/* Expand Button */}
                <button onClick={() =>
                  window.open(typeof window !== "undefined" && window.location.hostname === "localhost"
                    ? "https://ai-agent-delta-liart.vercel.app"
                    : "http://localhost:3000", "_blank")}
                  className="hover:scale-110 transition text-white" >
                  <CgArrowsExpandUpLeft size={22} />
                </button>



                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded Chat (iframe) */}
            <iframe
              src={
                typeof window !== "undefined" && window.location.hostname === "localhost"
                  ? "https://ai-agent-delta-liart.vercel.app"
                  : "http://localhost:3000"
              }
              title="AI Chat"
              className="w-full h-full border-none"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Widget Button */}
      {!isOpen && (
        <motion.div
          key="widget"
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {/* Tooltip Message */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gradient-to-br from-green-200 to-green-500 text-gray-800 text-sm px-5 py-4 rounded-2xl shadow-2xl max-w-xs"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-base font-semibold"
                >
                  🌱 Hey, I'm{" "}
                  <span className="text-teal-700">Kissan-Mitra</span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-1 text-sm"
                >
                  Need any help today?
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-white border-4 border-green-500 p-2 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center relative"
          >
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="topHalfPath"
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                />
              </defs>
              <text fill="green" fontSize="14" fontWeight="bold">
                <textPath href="#topHalfPath" startOffset="50%" textAnchor="middle">
                  • Kissan Mitra •
                </textPath>
              </text>
            </svg>

            <motion.img
              src={aiAgentImg}
              alt="Kissan Mitra"
              className="w-10 h-10 rounded-full"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            />

            {/* Pulsing red dot */}
            <span className="absolute -top-2 -right-0 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_6px_3px_rgba(239,68,68,0.6)]" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
