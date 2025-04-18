"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../Contexts/AuthContext"
import { ShoppingBag, User, Menu, X, ChevronDown, Heart, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import Cookies from 'js-cookie';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
            <span 
            // className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent"
            // style={{fontFamily: 'bein', fontSize: '1.5rem', fontWeight: 'bold', color: "green", marginRight: '0.5rem'}}
            style={{
              marginRight: '0.5rem',
              marginLeft: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(to right, #10B981, #16A34A)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'bein'
            }}
            >
            لبِّسني
              </span>
              <ShoppingBag className="h-8 w-8 text-emerald-500" />
              {/* <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent"> */}
              <ShoppingBag className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Labbasni
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-teal-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
              About Us
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-teal-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    {/* <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button> */}
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-teal-600 transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-teal-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link href="/products" className="block text-gray-700 hover:text-teal-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-teal-600 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
