'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

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

  // const handleAddToCart = async (productId, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
    
  //   if (!isAuthenticated) {
  //     alert('Please login to add items to cart');
  //     return;
  //   }

  //   try {
  //     const token = Cookies.get('token');
  //     if (!token) {
  //       throw new Error('No authentication token found');
        
  //     }
  //     const decoded= jwtdecode
  //     console.log(token,"token")


  //     const response = await fetch('http://localhost:4000/api/cart/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         productId,
  //         quantity: 1
  //       })
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || 'Failed to add to cart');
  //     }

  //     const data = await response.json();
  //     alert('Product added to cart successfully!');
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //     alert(error.message || 'Failed to add product to cart');
  //   }
  // };
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
  
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
  
      const userId = decoded.id; // adjust if your token uses another key
      console.log("User ID:", userId);
  
      const response = await fetch('http://localhost:4000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          userId // include userId if your backend requires it
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

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory
      ? product.SubCategory?.Category?.id === selectedCategory
      : true;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
            } hover:bg-indigo-700`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
              } hover:bg-indigo-700`}
            >
              {category.name}
            </button>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="h-full"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link
                href={`/products/${product.id}`}
                className="group flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden min-h-[400px] h-full relative"
              >
                <div className="bg-gray-100 w-full h-48 overflow-hidden relative">
                  <img
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="object-cover object-center w-full h-full group-hover:opacity-90 transition duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.SubCategory?.Category?.name || 'Uncategorized'}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-lg font-bold text-indigo-600">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <button
                      onClick={(e) => handleAddToCart(product.id, e)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
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
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
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
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
