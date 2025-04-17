'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Cookies from 'js-cookie';

// Sample products data - in a real app, this would come from your API
const allProducts = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    price: 49.99,
    image: "/images/soonnoon.jpg",
    category: "men",
    description: "Comfortable casual shirt for men"
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    price: 59.99,
    image: "/images/download.jpg",
    category: "women",
    description: "Elegant summer dress for women"
  },
  {
    id: 3,
    name: "Kids' Play Set",
    price: 39.99,
    image: "/images/kids-category.jpg",
    category: "kids",
    description: "Fun play set for kids"
  },
  // Add more products as needed
];

export default function ProductsPage() {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:4000/api/products'),
          fetch('http://localhost:4000/api/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    // Filter by URL category parameter
    if (category) {
      filtered = filtered.filter(product => 
        product.SubCategory?.Category?.gender === category
      );
    }
    
    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.SubCategory?.Category?.id === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, category, selectedCategory, searchQuery]);

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No authentication token found');
        
      }
      console.log(token,"token")


      const response = await fetch('http://localhost:4000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to cart');
      }

      const data = await response.json();
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add product to cart');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Update the title based on the category
  const getCategoryTitle = () => {
    if (category) {
      const categoryObj = categories.find(c => c.gender === category);
      return categoryObj ? `${categoryObj.name} Collection` : 'All Products';
    }
    return 'All Products';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 flex items-center justify-center">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Error</h1>
          <p className="mt-2 text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
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
              <Link href="/features" className="text-gray-700 hover:text-teal-600 transition-colors">
                Features
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
                <Link href="/profile" className="text-gray-700 hover:text-teal-600 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
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
              <Link href="/features" className="block text-gray-700 hover:text-teal-600 transition-colors">
                Features
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-teal-600 transition-colors">
                About Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Products Section */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {getCategoryTitle()}
          </h1>

          {/* Category Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                !selectedCategory ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-900'
              } hover:bg-teal-700 transition-colors`}
            >
              All Products
            </Link>
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/products?category=${category.gender}`}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category.id ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-900'
                } hover:bg-teal-700 transition-colors`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <p className="mt-2 text-lg font-semibold text-teal-600">${product.price}</p>
                  <button 
                    onClick={(e) => handleAddToCart(product.id, e)}
                    className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">No products found</h2>
              <p className="mt-2 text-gray-500">Try a different category or check back later.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => paginate('prev')}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
              </span>

              <button
                onClick={() => paginate('next')}
                disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                className={`p-2 rounded-full ${
                  currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
