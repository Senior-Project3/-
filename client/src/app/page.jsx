'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './Contexts/AuthContext';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';

// Sample categories data - in a real app, this would come from your API
const categories = [
  {
    id: 1,
    name: "Men's Collection",
    image: "/images/SoonNoon.jpg ",
    link: "/products?category=men"
  },
  {
    id: 2,
    name: "Women's Collection",
    image: "/images/download.jpg",
    link: "/products?category=women"
  },
  {
    id: 3,
    name: "Kids' Collection",
    image: "/images/kids-category.jpg",
    link: "/products?category=kids"
  }
];

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shuffledCategories, setShuffledCategories] = useState([]);

  // Shuffle categories on component mount and when currentSlide changes
  useEffect(() => {
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    setShuffledCategories(shuffled);
  }, [currentSlide]);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      image: "/images/hero-1.jpg",
      title: "Redefine Your Style",
      subtitle: "Discover the latest trends in fashion",
      cta: "Shop Now"
    },
    {
      image: "/images/hero-2.jpg",
      title: "New Arrivals: Spring '25 Collection",
      subtitle: "Fresh styles for the new season",
      cta: "View Collection"
    },
    {
      image: "/images/hero-3.jpg",
      title: "Limited Time Offers",
      subtitle: "Up to 50% off on selected items",
      cta: "Explore Deals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  StyleHub
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-rose-500 transition-colors">
                Products
              </Link>
              <Link href="/features" className="text-gray-700 hover:text-rose-500 transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-rose-500 transition-colors">
                About Us
              </Link>
            </div>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <Link href="/cart" className="text-gray-700 hover:text-rose-500 transition-colors">
                <ShoppingBag className="h-6 w-6" />
              </Link>

              {isAuthenticated ? (
                <Link href="/profile" className="text-gray-700 hover:text-rose-500 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-rose-500 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700 hover:text-rose-500 transition-colors"
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
              <Link href="/products" className="block text-gray-700 hover:text-rose-500 transition-colors">
                Products
              </Link>
              <Link href="/features" className="block text-gray-700 hover:text-rose-500 transition-colors">
                Features
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-rose-500 transition-colors">
                About Us
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link
                  href="/products"
                  className="inline-block px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shuffledCategories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-xl aspect-[4/5]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 