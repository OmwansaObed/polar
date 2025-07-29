"use client";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  ChevronDown,
  DoorOpen,
  User,
  Settings,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearUser } from "@/redux/slices/userSlice";

const links = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const user = useSelector((state) => state.auth?.user);
  const profileRef = useRef(null);

  // Use session data or Redux user data
  const currentUser = session?.user || user;

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const router = useRouter();
  const dispatch = useDispatch();

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

    await signOut();
    toast.success("Successfully signed out");
    router.push("/auth/signin");
    dispatch(clearUser());
  };

  const ProfileDropdown = ({ isMobile = false }) => (
    <div
      className={`${
        isMobile ? "w-full" : "absolute right-0 mt-2 w-64"
      } bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50`}
    >
      {/* User Info Section - Only show in desktop dropdown */}
      {!isMobile && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                currentUser?.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {currentUser?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="py-1">
        {/* <Link href="/profile">
          <button
            onClick={() => setProfileOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
          >
            <User size={16} className="text-gray-400" />
            <span>My Profile</span>
          </button>
        </Link> */}

        <Link href="/bookings">
          <button
            onClick={() => setProfileOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
          >
            <Calendar size={16} className="text-gray-400" />
            <span>My Bookings</span>
          </button>
        </Link>

        {/* <Link href="/notifications">
          <button
            onClick={() => setProfileOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
          >
            <Bell size={16} className="text-gray-400" />
            <span>Notifications</span>
          </button>
        </Link>

        <Link href="/settings">
          <button
            onClick={() => setProfileOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
          >
            <Settings size={16} className="text-gray-400" />
            <span>Settings</span>
          </button>
        </Link> */}

        {/* Admin Panel - Show only for admin users */}
        {currentUser?.role === "admin" && (
          <Link href="/admin">
            <button
              onClick={() => setProfileOpen(false)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
            >
              <Shield size={16} className="text-gray-400" />
              <span>Admin Panel</span>
            </button>
          </Link>
        )}
      </div>

      {/* Sign Out - Only show in desktop dropdown */}
      {!isMobile && (
        <div className="border-t border-gray-100 pt-1">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
          >
            <LogOut size={16} className="text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

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

            {/* Authentication Section */}
            {currentUser ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-700 hover:text-rose-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-semibold text-xs">
                    {currentUser.image ? (
                      <img
                        src={currentUser.image}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      currentUser.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && <ProfileDropdown />}
              </div>
            ) : (
              <Link href="/auth/signin">
                <button className="text-gray-700 hover:text-rose-600 border border-rose-500 px-6 py-2.5 rounded-full font-medium transition-colors duration-200 flex items-center gap-2">
                  <DoorOpen size={18} />
                  <span>Sign In</span>
                </button>
              </Link>
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
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
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

              {/* Mobile Authentication Section */}
              {currentUser ? (
                <div className="space-y-3">
                  {/* User Info in Mobile */}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                      {currentUser.image ? (
                        <img
                          src={currentUser.image}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        currentUser.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {currentUser.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Profile Menu */}
                  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    {/* <Link href="/profile">
                      <button
                        onClick={closeMenu}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 border-b border-gray-100"
                      >
                        <User size={16} className="text-gray-400" />
                        <span>My Profile</span>
                      </button>
                    </Link> */}

                    <Link href="/bookings">
                      <button
                        onClick={closeMenu}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 border-b border-gray-100"
                      >
                        <Calendar size={16} className="text-gray-400" />
                        <span>My Bookings</span>
                      </button>
                    </Link>

                    {/* <Link href="/notifications">
                      <button
                        onClick={closeMenu}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 border-b border-gray-100"
                      >
                        <Bell size={16} className="text-gray-400" />
                        <span>Notifications</span>
                      </button>
                    </Link>

                    <Link href="/settings">
                      <button
                        onClick={closeMenu}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 border-b border-gray-100"
                      >
                        <Settings size={16} className="text-gray-400" />
                        <span>Settings</span>
                      </button>
                    </Link> */}

                    {/* Admin Panel - Show only for admin users */}
                    {currentUser?.role === "admin" && (
                      <Link href="/admin">
                        <button
                          onClick={closeMenu}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 border-b border-gray-100"
                        >
                          <Shield size={16} className="text-gray-400" />
                          <span>Admin Panel</span>
                        </button>
                      </Link>
                    )}

                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        closeMenu();
                        handleSignOut();
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
                    >
                      <LogOut size={16} className="text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <button
                    onClick={closeMenu}
                    className="w-full px-4 py-3 text-gray-700 hover:bg-rose-50/70 border border-rose-500 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <DoorOpen size={20} />
                    <span>Sign In</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
