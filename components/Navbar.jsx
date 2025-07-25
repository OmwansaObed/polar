"use client";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session, status } = useSession();
  const profileRef = useRef(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setProfileOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
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
          </a>

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

            <Link href="/booking">
              <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                <Calendar size={18} />
                <span>Book Now</span>
              </button>
            </Link>

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              /* Profile Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full border-2 border-rose-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        {session.user?.image ? (
                          <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="w-12 h-12 rounded-full border-2 border-rose-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {session.user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link href="/profile">
                        <button
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </button>
                      </Link>

                      <Link href="/bookings">
                        <button
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Calendar size={16} />
                          <span>My Bookings</span>
                        </button>
                      </Link>

                      <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In/Up Buttons */
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <button className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200">
                    Sign In
                  </button>
                </Link>
                {/* <Link href="/auth/signup">
                  <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Sign Up
                  </button>
                </Link> */}
              </div>
            )}
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
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              <Link href="/booking">
                <button
                  onClick={closeMenu}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mb-3"
                >
                  <Calendar size={18} />
                  <span>Book Now</span>
                </button>
              </Link>

              {/* Mobile Auth Section */}
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-10 h-10 rounded-full border-2 border-rose-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <Link href="/profile">
                    <button
                      onClick={closeMenu}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      closeMenu();
                      handleSignOut();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/signin">
                    <button
                      onClick={closeMenu}
                      className="w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                    >
                      Sign In
                    </button>
                  </Link>
                  {/* <Link href="/auth/signup">
                    <button
                      onClick={closeMenu}
                      className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                    >
                      Sign Up
                    </button>
                  </Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
