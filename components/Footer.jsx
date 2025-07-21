"use client";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Star,
  Zap,
  Users,
  Calendar,
  ArrowUp,
} from "lucide-react";

// Mock motion components
const MotionDiv = ({ children, className, delay }) => (
  <div className={className}>{children}</div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
    { name: "Book Now", href: "#booking" },
    { name: "Group Events", href: "#events" },
    { name: "Membership", href: "#membership" },
  ];

  const services = [
    { name: "Roller Skating Sessions", href: "#sessions" },
    { name: "Birthday Parties", href: "#parties" },
    { name: "Corporate Events", href: "#corporate" },
    { name: "Skating Lessons", href: "#lessons" },
    { name: "Equipment Rental", href: "#rental" },
    { name: "VIP Experiences", href: "#vip" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:bg-blue-400",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
      color: "hover:bg-red-600",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-rose-500 blur-3xl"></div>
        <div className="absolute top-32 right-20 w-40 h-40 rounded-full bg-pink-500 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 rounded-full bg-purple-500 blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <MotionDiv className="lg:col-span-1" delay={0.1}>
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                  <img
                    src="/polar-logo.jpg"
                    alt="Polar Logo"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold">Polar club</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nairobi's premier roller skating destination. Where fun meets
                fitness, and every roll creates unforgettable memories.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </MotionDiv>

          {/* Quick Links */}
          <MotionDiv delay={0.2}>
            <h4 className="text-lg font-bold mb-6 text-rose-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </MotionDiv>

          {/* Services */}
          <MotionDiv delay={0.3}>
            <h4 className="text-lg font-bold mb-6 text-rose-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </MotionDiv>

          {/* Contact Info */}
          <MotionDiv delay={0.4}>
            <h4 className="text-lg font-bold mb-6 text-rose-400">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin
                  className="text-rose-500 mt-1 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-gray-300 text-sm">
                    Westlands Shopping Center
                  </p>
                  <p className="text-gray-300 text-sm">
                    2nd Floor, Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="text-rose-500 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300 text-sm">+254 700 123 456</p>
                  <p className="text-gray-300 text-sm">+254 733 987 654</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="text-rose-500 flex-shrink-0" size={18} />
                <p className="text-gray-300 text-sm">info@Polar club.co.ke</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="text-rose-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300 text-sm">Mon-Fri: 10AM-10PM</p>
                  <p className="text-gray-300 text-sm">Sat-Sun: 9AM-11PM</p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Newsletter Section */}
        <MotionDiv delay={0.5} className="border-t border-gray-700 pt-12 mb-12">
          <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-2xl p-8 border border-rose-500/20">
            <div className="text-center mb-6">
              <Star className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-2">Stay in the Loop!</h4>
              <p className="text-gray-300">
                Subscribe to get the latest updates on events, special offers,
                and skating tips.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </MotionDiv>

        {/* Stats Section */}
        <MotionDiv
          delay={0.6}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="text-white" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">10K+</div>
            <div className="text-gray-400 text-sm">Happy Skaters</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="text-white" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div className="text-gray-400 text-sm">Events Participated</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="text-white" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
            <div className="text-gray-400 text-sm">Customer Rating</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="text-white" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">3</div>
            <div className="text-gray-400 text-sm">Years of Fun</div>
          </div>
        </MotionDiv>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Polar club. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Terms of Service
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="#cookies"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm flex items-center">
                Made with <Heart className="text-rose-500 mx-1" size={14} /> in
                Nairobi
              </p>

              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-6 right-6 hidden lg:block">
        <div className="flex flex-col space-y-3">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center animate-bounce cursor-pointer hover:scale-110 transition-transform">
            <Phone className="text-white" size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
