"use client";
import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
              <img
                src="/polar-logo.jpg"
                alt="Polar Logo"
                className="w-9 h-9 rounded-full"
              />
            </div>
            <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              PolarClub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2">
              <Calendar size={18} />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-md ${
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <button
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Calendar size={18} />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
