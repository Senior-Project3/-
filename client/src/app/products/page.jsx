"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { useAuth } from "../Contexts/AuthContext"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, ShoppingBag } from "lucide-react"
import Cookies from "js-cookie"
import Swal from "sweetalert2"

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

  // Add to cart functionality with Swal confirmation
  const handleAddToCart = async (productId, productName, e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      await Swal.fire({
        title: "Login Required",
        text: "Please login to add items to your cart.",
        icon: "warning",
        confirmButtonColor: colors.pastelPink,
        customClass: {
          popup: "rounded-lg",
          confirmButton: "rounded-md",
        },
      })
      return
    }

    try {
      const result = await Swal.fire({
        title: "Add to Cart",
        text: `Are you sure you want to add "${productName}" to your cart?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: colors.pastelPink,
        cancelButtonColor: colors.lightGray,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-lg",
          confirmButton: "rounded-md",
          cancelButton: "rounded-md",
        },
      })

      if (!result.isConfirmed) return

      const token = Cookies.get("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const decoded = jwtDecode(token)
      console.log("Decoded JWT:", decoded)

      const userId = decoded.id // adjust if your token uses another key
      console.log("User ID:", userId)

      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          userId // include userId if your backend requires it
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add to cart")
      }

      await response.json()
      await Swal.fire({
        title: "Success!",
        text: `"${productName}" has been added to your cart.`,
        icon: "success",
        confirmButtonColor: colors.pastelPink,
        customClass: {
          popup: "rounded-lg",
          confirmButton: "rounded-md",
        },
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      await Swal.fire({
        title: "Error!",
        text: error.message || "Failed to add product to cart",
        icon: "error",
        confirmButtonColor: colors.pastelPink,
        customClass: {
          popup: "rounded-lg",
          confirmButton: "rounded-md",
        },
      })
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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Generate page numbers with ellipsis for large page counts
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
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
                }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory("")
                setCurrentPage(1)
              }}
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
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentPage(1)
                }}
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
            Page {currentPage} of {totalPages || 1}
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
                      {Number(product.price).toFixed(2)}TD
                    </p>

                    <button
                      onClick={(e) => handleAddToCart(product.id, product.name, e)}
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
                  setCurrentPage(1)
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
              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${pageNumber}`}
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
                ),
              )}
            </div>

            <button
              onClick={() => paginate("next")}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor: currentPage === totalPages ? colors.lightGray : colors.pastelPink,
                color: currentPage === totalPages ? colors.textLight : colors.textPrimary,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}