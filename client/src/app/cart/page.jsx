"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../Contexts/AuthContext"
import Cookies from "js-cookie"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

const MySwal = withReactContent(Swal)

export default function CartPage() {
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

  const { user, isAuthenticated } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(Cookies.get("token"))
  const [refresh, setRefresh] = useState(true)
  const [isRemoving, setIsRemoving] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !user || !token) {
      setLoading(false)
      return
    }

    try {
      const response = await axios.get("http://localhost:4000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.data) {
        throw new Error("No cart data found")
      }

      setCart(response.data)
    } catch (error) {
      console.error("Error fetching cart:", error)
      setError(error.response?.data?.error || error.message || "Failed to fetch cart")
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to fetch cart",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: colors.white,
        color: colors.textPrimary,
      })
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user, token, colors.white, colors.textPrimary])

  useEffect(() => {
    fetchCart()
  }, [fetchCart, refresh])

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/cart/update/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.data) {
        throw new Error("Failed to update cart")
      }

      setCart(response.data)
      setRefresh(!refresh)
      MySwal.fire({
        icon: "success",
        title: "Updated",
        text: "Quantity updated successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        background: colors.white,
        color: colors.textPrimary,
      })
    } catch (error) {
      console.error("Error updating cart:", error)
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to update cart",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: colors.white,
        color: colors.textPrimary,
      })
    }
  }

  const handleRemoveItem = async (productId) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.darkPink,
      cancelButtonColor: colors.softBeige,
      confirmButtonText: "Yes, remove it!",
      background: colors.white,
      color: colors.textPrimary,
    })

    if (result.isConfirmed) {
      setIsRemoving(true)
      try {
        const response = await axios.delete(`http://localhost:4000/api/cart/remove/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.data) {
          throw new Error("Failed to remove item")
        }

        setCart(response.data)
        setRefresh(!refresh)
        MySwal.fire({
          icon: "success",
          title: "Removed",
          text: "Item removed from cart",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          background: colors.white,
          color: colors.textPrimary,
        })
      } catch (error) {
        console.error("Error removing item:", error)
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.error || "Failed to remove item from cart",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background: colors.white,
          color: colors.textPrimary,
        })
      } finally {
        setIsRemoving(false)
      }
    }
  }

  const incrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity < 10) {
      handleUpdateQuantity(productId, currentQuantity + 1)
    }
  }

  const decrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(productId, currentQuantity - 1)
    }
  }

  const CartItem = ({ item }) => (
    <div className="py-6 border-b" style={{ borderColor: colors.lightGray }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-md overflow-hidden" style={{ backgroundColor: colors.lightGray }}>
            <img
              src={item.Product?.image || "/placeholder-product.jpg"}
              alt={item.Product?.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium" style={{ color: colors.textPrimary }}>
            {item.Product?.name}
          </h3>
          <p className="text-sm" style={{ color: colors.textLight }}>
            {item.Product?.SubCategory?.Category?.name || "Uncategorized"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="text-base font-medium" style={{ color: colors.textPrimary }}>
            {Number(item.Product?.price).toFixed(2)}TD
          </div>
          <div className="flex items-center border rounded-md" style={{ borderColor: colors.softBeige }}>
            <button
              onClick={() => decrementQuantity(item.ProductId, item.quantity)}
              className="px-3 py-1 transition-colors"
              style={{ color: colors.textSecondary }}
              disabled={item.quantity <= 1 || isRemoving}
            >
              <Minus size={16} className={item.quantity <= 1 ? "opacity-50" : ""} />
            </button>
            <span
              className="px-4 py-1 text-center w-10 border-x"
              style={{ color: colors.textPrimary, borderColor: colors.softBeige }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => incrementQuantity(item.ProductId, item.quantity)}
              className="px-3 py-1 transition-colors"
              style={{ color: colors.textSecondary }}
              disabled={item.quantity >= 10 || isRemoving}
            >
              <Plus size={16} className={item.quantity >= 10 ? "opacity-50" : ""} />
            </button>
          </div>
          <div className="text-base font-medium" style={{ color: colors.textPrimary }}>
            {(item.Product?.price * item.quantity).toFixed(2)}TD
          </div>
          <button
            onClick={() => handleRemoveItem(item.ProductId)}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: colors.darkPink }}
            disabled={isRemoving}
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="text-center py-16 px-4 sm:px-6 lg:px-8 rounded-lg"
            style={{ backgroundColor: colors.lightGray }}
          >
            <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: colors.darkPink }} />
            <h2 className="text-2xl font-light mb-4" style={{ color: colors.textPrimary }}>
              Please login to view your cart
            </h2>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-md transition-colors"
              style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.white }}>
        <div className="flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: `${colors.pastelPink} transparent ${colors.pastelPink} ${colors.pastelPink}` }}
          ></div>
          <p className="mt-4" style={{ color: colors.textSecondary }}>
            Loading your cart...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="text-center py-16 px-4 sm:px-6 lg:px-8 rounded-lg"
            style={{ backgroundColor: colors.lightGray }}
          >
            <h2 className="text-2xl font-light mb-2" style={{ color: colors.textPrimary }}>
              Error
            </h2>
            <p className="mb-6" style={{ color: colors.textSecondary }}>
              {error}
            </p>
            <button
              onClick={() => {
                setLoading(true)
                setError(null)
                fetchCart()
              }}
              className="inline-block px-6 py-3 rounded-md transition-colors"
              style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="text-center py-16 px-4 sm:px-6 lg:px-8 rounded-lg"
            style={{ backgroundColor: colors.lightGray }}
          >
            <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: colors.darkPink }} />
            <h2 className="text-2xl font-light mb-4" style={{ color: colors.textPrimary }}>
              Your cart is empty
            </h2>
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-md transition-colors"
              style={{ backgroundColor: colors.pastelPink, color: colors.textPrimary }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8" style={{ color: colors.textPrimary }}>
          Shopping Cart
        </h1>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border" style={{ borderColor: colors.lightGray }}>
          <div
            className="px-6 py-4 border-b hidden sm:block"
            style={{ borderColor: colors.lightGray, backgroundColor: colors.softBeige }}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6" style={{ color: colors.textSecondary }}>
                Product
              </div>
              <div className="col-span-2" style={{ color: colors.textSecondary }}>
                Price
              </div>
              <div className="col-span-2" style={{ color: colors.textSecondary }}>
                Quantity
              </div>
              <div className="col-span-2" style={{ color: colors.textSecondary }}>
                Total
              </div>
            </div>
          </div>

          <div>
            {cart.CartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="px-6 py-6" style={{ backgroundColor: colors.softBeige }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <span className="text-lg font-medium mr-2" style={{ color: colors.textPrimary }}>
                  Total:
                </span>
                <span className="text-xl font-medium" style={{ color: colors.darkPink }}>
                  {Number(cart.total).toFixed(2)}TD
                </span>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-8 py-3 rounded-md transition-colors"
                  style={{
                    backgroundColor: colors.pastelPink,
                    color: colors.textPrimary,
                  }}
                  disabled={isRemoving}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-block text-sm transition-colors hover:underline"
            style={{ color: colors.darkPink }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
