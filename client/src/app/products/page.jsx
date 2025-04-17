"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "../Contexts/AuthContext"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, ShoppingBag, Heart } from "lucide-react"
import Cookies from "js-cookie"

export default function ProductsPage() {
  // Color palette
  const colors = {
    white: "#ffffff",
    lightGray: "#f5f5f5",
    softBeige: "#f5f0e8",
    pastelPink: "#f8e1e7",
    darkPink: "#e4b3c0",
    textPrimary: "#333333",
    textSecondary: "#666666",
    textLight: "#999999",
  }

  // State management
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated } = useAuth()

  const itemsPerPage = 8

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:4000/api/products"),
          fetch("http://localhost:4000/api/categories"),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Add to cart functionality
  const handleAddToCart = async (productId, e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      alert("Please login to add items to cart")
      return
    }

    try {
      const token = Cookies.get("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add to cart")
      }

      const data = await response.json()
      alert("Product added to cart successfully!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert(error.message || "Failed to add product to cart")
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory ? product.SubCategory?.Category?.id === selectedCategory : true
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.white }}>
        <div className="flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: `${colors.pastelPink} transparent ${colors.pastelPink} ${colors.pastelPink}` }}
          ></div>
          <p className="mt-4" style={{ color: colors.textSecondary }}>
            Loading products...
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.white }}>
        <div className="text-center max-w-md p-8 rounded-lg shadow-md" style={{ backgroundColor: colors.lightGray }}>
          <h1 className="text-2xl font-medium mb-4" style={{ color: colors.textPrimary }}>
            Something went wrong
          </h1>
          <p style={{ color: colors.textSecondary }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 rounded-md transition-colors"
            style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2">Our Collection</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl">Discover our curated selection of timeless pieces</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.lightGray }}>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: colors.textLight }}
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: colors.softBeige,
                  backgroundColor: colors.white,
                  color: colors.textPrimary,
                  focusRing: colors.pastelPink,
                }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: selectedCategory === "" ? colors.pastelPink : colors.white,
                color: colors.textPrimary,
                border: `1px solid ${colors.softBeige}`,
              }}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={{
                  backgroundColor: selectedCategory === category.id ? colors.pastelPink : colors.white,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.softBeige}`,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium" style={{ color: colors.textPrimary }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
          </h2>
          <div style={{ color: colors.textSecondary }}>
            Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage) || 1}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="h-full"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link
                href={`/products/${product.id}`}
                className="group flex flex-col rounded-lg overflow-hidden h-full relative"
                style={{
                  backgroundColor: colors.white,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${product.image || "/placeholder-product.jpg"})`,
                    }}
                  ></div>

                  {/* Wishlist button */}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: colors.white }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Add wishlist functionality here
                    }}
                  >
                    <Heart size={16} style={{ color: colors.textSecondary }} />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-1 text-xs" style={{ color: colors.textLight }}>
                    {product.SubCategory?.Category?.name || "Uncategorized"}
                  </div>

                  <h3 className="text-base font-medium mb-2 line-clamp-2" style={{ color: colors.textPrimary }}>
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold" style={{ color: colors.darkPink }}>
                      ${Number(product.price).toFixed(2)}
                    </p>

                    <button
                      onClick={(e) => handleAddToCart(product.id, e)}
                      className="flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors"
                      style={{
                        backgroundColor: colors.pastelPink,
                        color: colors.textPrimary,
                      }}
                    >
                      <ShoppingBag size={16} className="mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4" style={{ backgroundColor: colors.lightGray, borderRadius: "0.5rem" }}>
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-medium mb-2" style={{ color: colors.textPrimary }}>
                No products found
              </h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("")
                  setSearchQuery("")
                }}
                className="px-4 py-2 rounded-md text-sm font-medium"
                style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => paginate("prev")}
              disabled={currentPage === 1}
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor: currentPage === 1 ? colors.lightGray : colors.pastelPink,
                color: currentPage === 1 ? colors.textLight : colors.textPrimary,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, Math.ceil(filteredProducts.length / itemsPerPage)) }, (_, i) => {
                // Logic to show current page and surrounding pages
                let pageNumber
                const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                } else {
                  pageNumber = currentPage - 2 + i
                }

                if (pageNumber > totalPages) return null

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors"
                    style={{
                      backgroundColor: currentPage === pageNumber ? colors.pastelPink : colors.white,
                      color: colors.textPrimary,
                      border: `1px solid ${currentPage === pageNumber ? colors.pastelPink : colors.softBeige}`,
                    }}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => paginate("next")}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor:
                  currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
                    ? colors.lightGray
                    : colors.pastelPink,
                color:
                  currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
                    ? colors.textLight
                    : colors.textPrimary,
                cursor: currentPage === Math.ceil(filteredProducts.length / itemsPerPage) ? "not-allowed" : "pointer",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="py-16" style={{ backgroundColor: colors.softBeige }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4" style={{ color: colors.textPrimary }}>
            Join Our Community
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
            Subscribe to receive updates on new arrivals, special offers and other discount information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 flex-grow rounded-md border focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: colors.white,
                backgroundColor: colors.white,
                color: colors.textPrimary,
              }}
            />
            <button
              className="px-6 py-3 rounded-md font-medium"
              style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
