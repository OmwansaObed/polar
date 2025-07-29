"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Calendar,
  ArrowDown,
  Star,
  Users,
  Award,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock framer-motion for demo (you'll use the real one)
const motion = {
  div: ({ children, initial, animate, transition, className, ...props }) => (
    <div className={`${className} animate-fadeInUp`} {...props}>
      {children}
    </div>
  ),
  h1: ({ children, initial, animate, transition, className, ...props }) => (
    <h1 className={`${className} animate-slideInLeft`} {...props}>
      {children}
    </h1>
  ),
  p: ({ children, initial, animate, transition, className, ...props }) => (
    <p className={`${className} animate-slideInRight`} {...props}>
      {children}
    </p>
  ),
  button: ({ children, whilehover, whiletap, className, ...props }) => (
    <button
      className={`${className} hover:scale-105 active:scale-95 transition-transform`}
      {...props}
    >
      {children}
    </button>
  ),
};

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: Users, value: "2,500+", label: "Happy Skaters" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Award, value: "8+", label: "Years Experience" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-rose-900/20 to-pink-900/20 relative">
          {/* Placeholder for video - replace with your actual video */}
          <div className="w-full h-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 opacity-80">
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

        {/* Animated Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-rose-300/50 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-300/40 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Roll Into The
          <span className="block bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            Ultimate Fun
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the thrill of roller skating in Nairobi's premier skating
          destination. From beginners to pros, we've got the perfect rink for
          everyone.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whilehover={{ scale: 1.05 }}
            whiletap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 flex items-center space-x-3 group"
          >
            <Calendar size={20} />
            <span onClick={() => router.push("/booking")}>
              Book Your Session
            </span>
            <div className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </motion.button>

          {/* <motion.button
            whilehover={{ scale: 1.05 }}
            whiletap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
          >
            <Info size={20} />
            <span>About Us</span>
          </motion.button> */}
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-500 ${
                  currentStat === index ? "scale-110" : "scale-100 opacity-80"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <Icon size={24} className="text-rose-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown size={20} />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
