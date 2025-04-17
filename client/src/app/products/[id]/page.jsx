"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../Contexts/AuthContext"
import {
  ChevronRight,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  Truck,
  RefreshCw,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Swal from "sweetalert2"

export default function ProductDetailsPage() {
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
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [expandedSection, setExpandedSection] = useState("description")
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`)
        if (!response.ok) {
          throw new Error("Product not found")
        }
        const data = await response.json()
        setProduct(data)

        // Fetch related products
        fetchRelatedProducts(data.SubCategory?.Category?.id)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedProducts = async (categoryId) => {
      if (!categoryId) return

      try {
        const response = await fetch(`http://localhost:4000/api/products?category=${categoryId}&limit=4`)
        if (response.ok) {
          const data = await response.json()
          // Filter out the current product
          setRelatedProducts(data.filter((item) => item.id !== id).slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error)
      }
    }

    fetchProduct()
  }, [id])

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to cart",
        confirmButtonColor: colors.darkPink,
      })
      return
    }

    // Add to cart logic would go here
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `Added ${quantity} item(s) to cart`,
      confirmButtonColor: colors.darkPink,
    })
  }

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to wishlist",
        confirmButtonColor: colors.darkPink,
      })
      return
    }

    // Add to wishlist logic would go here
    Swal.fire({
      icon: "success",
      title: "Added to Wishlist",
      text: "Item added to your wishlist",
      confirmButtonColor: colors.darkPink,
    })
  }

  // Toggle accordion sections on mobile
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
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
            Loading product details...
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
            Product Not Found
          </h1>
          <p style={{ color: colors.textSecondary }}>{error}</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-6 px-4 py-2 rounded-md transition-colors"
            style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  // Mock data for product images (in a real app, this would come from the API)
  const productImages = [product.image]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-8" style={{ color: colors.textSecondary }}>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href={`/products?category=${product.SubCategory?.Category?.id}`} className="hover:underline">
            {product.SubCategory?.Category?.name || "Uncategorized"}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span style={{ color: colors.textPrimary }}>{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Product Images */}
          <div className="lg:max-w-lg lg:self-start sticky top-8">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg mb-4">
              <img
                src={productImages[activeImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative rounded-md overflow-hidden transition-all duration-200 ${
                    activeImage === index ? "ring-2 transform scale-105" : ""
                  }`}
                  style={{
                    ringColor: colors.darkPink,
                    border: activeImage === index ? `1px solid ${colors.darkPink}` : `1px solid ${colors.lightGray}`,
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    className="h-16 w-full object-cover object-center"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-white opacity-20" aria-hidden="true"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-0 sm:mt-16 lg:mt-0">
            {/* Product metadata */}
            <div className="mb-2 text-sm" style={{ color: colors.textLight }}>
              SKU: {String(product.id).substring(0, 8).toUpperCase()}
            </div>

            <h1 className="text-3xl font-light tracking-tight mb-4" style={{ color: colors.textPrimary }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 mb-6">
              <p className="text-3xl" style={{ color: colors.textPrimary }}>
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Including all taxes
              </p>
            </div>

            {/* Description preview */}
            <div className="my-6 text-base" style={{ color: colors.textSecondary }}>
              <p>
                {product.description ||
                  "This elegant piece combines style and functionality, perfect for everyday use or special occasions. Crafted with attention to detail and premium materials."}
              </p>
            </div>

            {/* Add to cart section */}
            <div className="mt-8 border-t border-b py-6" style={{ borderColor: colors.lightGray }}>
              {/* Quantity selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium" style={{ color: colors.textPrimary }}>
                  Quantity
                </span>
                <div
                  className="flex items-center border rounded-md overflow-hidden"
                  style={{ borderColor: colors.softBeige }}
                >
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 transition-colors hover:bg-gray-50"
                    style={{ color: colors.textSecondary }}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} className={quantity <= 1 ? "opacity-50" : ""} />
                  </button>
                  <span
                    className="px-4 py-1 text-center w-12 border-x"
                    style={{ color: colors.textPrimary, borderColor: colors.softBeige }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 transition-colors hover:bg-gray-50"
                    style={{ color: colors.textSecondary }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-md flex items-center justify-center transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: colors.pastelPink,
                    color: colors.textPrimary,
                  }}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="py-3 px-6 rounded-md flex items-center justify-center border transition-all duration-300 hover:bg-gray-50"
                  style={{
                    borderColor: colors.softBeige,
                    color: colors.textPrimary,
                    backgroundColor: colors.white,
                  }}
                >
                  <Heart size={18} className="mr-2" />
                  Wishlist
                </button>
              </div>
            </div>

            {/* Product features */}
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <Truck size={18} style={{ color: colors.darkPink }} className="mr-2" />
                <span style={{ color: colors.textSecondary }}>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center mb-4">
                <RefreshCw size={18} style={{ color: colors.darkPink }} className="mr-2" />
                <span style={{ color: colors.textSecondary }}>30-day easy returns</span>
              </div>
              <div className="flex items-center">
                <Shield size={18} style={{ color: colors.darkPink }} className="mr-2" />
                <span style={{ color: colors.textSecondary }}>2-year warranty included</span>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.lightGray }}>
              <div className="flex items-center">
                <span className="mr-4" style={{ color: colors.textSecondary }}>
                  Share:
                </span>
                <div className="flex space-x-3">
                  <button className="p-2 rounded-full" style={{ backgroundColor: colors.lightGray }}>
                    <svg width="16" height="16" fill={colors.textSecondary} viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full" style={{ backgroundColor: colors.lightGray }}>
                    <svg width="16" height="16" fill={colors.textSecondary} viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full" style={{ backgroundColor: colors.lightGray }}>
                    <svg width="16" height="16" fill={colors.textSecondary} viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full" style={{ backgroundColor: colors.lightGray }}>
                    <svg width="16" height="16" fill={colors.textSecondary} viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion - Mobile */}
        <div className="mt-12 md:hidden">
          <div className="border-t" style={{ borderColor: colors.lightGray }}>
            <button
              onClick={() => toggleSection("description")}
              className="flex items-center justify-between w-full py-4 font-medium"
              style={{ color: colors.textPrimary }}
            >
              <span>Description</span>
              {expandedSection === "description" ? (
                <ChevronUp size={18} style={{ color: colors.textSecondary }} />
              ) : (
                <ChevronDown size={18} style={{ color: colors.textSecondary }} />
              )}
            </button>
            {expandedSection === "description" && (
              <div className="pb-6" style={{ color: colors.textSecondary }}>
                <p>
                  {product.description ||
                    `This premium product exemplifies our commitment to quality and design excellence. 
                    Crafted with meticulous attention to detail, it combines functionality with aesthetic appeal.
                    
                    The elegant design makes it a versatile addition to any collection, suitable for both everyday use and special occasions. 
                    Made from high-quality materials, it promises durability and long-lasting performance.`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 border-t pt-12" style={{ borderColor: colors.lightGray }}>
          <h2 className="text-2xl font-light mb-8" style={{ color: colors.textPrimary }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.length > 0
              ? relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group">
                    <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 bg-gray-100 relative">
                      <img
                        src={relatedProduct.image || "/placeholder-product.jpg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                      />
                      <div
                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <h3 className="text-base font-medium truncate" style={{ color: colors.textPrimary }}>
                      {relatedProduct.name}
                    </h3>
                    <p className="mt-1 font-medium" style={{ color: colors.darkPink }}>
                      ${Number(relatedProduct.price).toFixed(2)}
                    </p>
                  </Link>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="group">
                    <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Related+${index + 1}`}
                        alt={`Related product ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-base font-medium truncate" style={{ color: colors.textPrimary }}>
                      Related Product {index + 1}
                    </h3>
                    <p className="mt-1 font-medium" style={{ color: colors.darkPink }}>
                      ${(29.99 + index * 10).toFixed(2)}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
