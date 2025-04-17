
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../Contexts/AuthContext';
// import { motion } from 'framer-motion';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, categoriesRes] = await Promise.all([
//           fetch('http://localhost:4000/api/products'),
//           fetch('http://localhost:4000/api/categories')
//         ]);

//         if (!productsRes.ok || !categoriesRes.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const productsData = await productsRes.json();
//         const categoriesData = await categoriesRes.json();

//         setProducts(productsData);
//         setCategories(categoriesData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(product => {
//     const categoryMatch = selectedCategory
//       ? product.SubCategory?.Category?.id === selectedCategory
//       : true;

//     const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

//     return categoryMatch && searchMatch;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

//   const handleAddToCart = (productId, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(`Added product ${productId} to cart`);
//   };

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 flex items-center justify-center">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-4">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <div
//               key={index}
//               className="animate-pulse bg-white rounded-lg shadow overflow-hidden flex flex-col"
//             >
//               <div className="bg-gray-200 w-full h-48"></div>
//               <div className="p-4 flex flex-col justify-between flex-grow">
//                 <div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
//                 </div>
//                 <div className="h-5 bg-gray-300 rounded w-1/4 mt-4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Error</h1>
//           <p className="mt-2 text-gray-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
//         </div>

//         {/* Category Filter Buttons */}
//         <div className="mb-8 flex flex-wrap gap-2">
//           <button
//             onClick={() => handleCategoryChange('')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               selectedCategory === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
//             } hover:bg-indigo-700`}
//           >
//             All Products
//           </button>

//           {categories.map(category => (
//             <button
//               key={category.id}
//               onClick={() => handleCategoryChange(category.id)}
//               className={`px-4 py-2 rounded-md text-sm font-medium ${
//                 selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
//               } hover:bg-indigo-700`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search products..."
//             className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {paginatedProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.05, duration: 0.3 }}
//               className="h-full"
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <Link
//                 href={`/products/${product.id}`}
//                 className="group flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden min-h-[400px] h-full relative"
//               >
//                 <div className="bg-gray-100 w-full h-48 overflow-hidden relative">
//                   <img
//                     src={product.image || '/placeholder-product.jpg'}
//                     alt={product.name}
//                     className="object-cover object-center w-full h-full group-hover:opacity-90 transition duration-300"
//                   />
//                   {hoveredProduct === product.id && (
//                     <motion.button
//                       onClick={(e) => handleAddToCart(product.id, e)}
//                       className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors z-10"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       Add to Cart
//                     </motion.button>
//                   )}
//                 </div>

//                 <div className="p-4 flex flex-col flex-grow">
//                   <div className="flex flex-col flex-grow">
//                     <h3 className="text-base font-semibold text-gray-800 truncate">
//                       {product.name}
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {product.SubCategory?.Category?.name || 'Uncategorized'}
//                     </p>
//                   </div>
//                   <p className="mt-2 text-lg font-bold text-indigo-600">
//                     ${Number(product.price).toFixed(2)}
//                   </p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* No Products Message */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No products found.</p>
//           </div>
//         )}

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-8 space-x-2 items-center">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-2 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
//             >
//               ←
//             </button>

//             <span className="px-4 py-2 text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-2 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

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

  const handleAddToCart = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added product ${productId} to cart`);
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
                  <p className="mt-2 text-lg font-bold text-indigo-600">
                    ${Number(product.price).toFixed(2)}
                  </p>
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
