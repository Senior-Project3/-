"use client"

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import {
  RefreshCw,
  Package,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Trash2,
  AlertTriangle,
  ShoppingBag,
  Search,
  Filter,
  User,
} from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const ordersPerPage = 10

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get("http://localhost:4000/api/orders/")
      const ordersData = Array.isArray(response.data) ? response.data : []
      setOrders(ordersData)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError("Failed to fetch orders. Please check if the server is running.")
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Filter orders based on search query and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery)

    const matchesStatus = statusFilter === "all" || order.status?.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Update pagination whenever filteredOrders changes
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(filteredOrders.length / ordersPerPage)
    setTotalPages(calculatedTotalPages)

    // Reset currentPage if it exceeds the new totalPages after filtering
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages)
    } else if (filteredOrders.length === 0) {
      setCurrentPage(1)
    }
  }, [filteredOrders, currentPage, ordersPerPage])

  // Paginate the filtered orders
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

  const getPageNumbers = useCallback(() => {
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
  }, [currentPage, totalPages])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Action",
        text: `Are you sure you want to change order #${orderId} status to ${newStatus}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, update status",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
          cancelButton: "rounded-lg",
        },
      })

      if (!result.isConfirmed) return

      const response = await axios.put(`http://localhost:4000/api/orders/${orderId}`, {
        status: newStatus,
      })

      if (response.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: `Order #${orderId} status updated to ${newStatus}`,
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "rounded-xl",
            confirmButton: "rounded-lg",
          },
        })
        fetchOrders()
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update order status",
        icon: "error",
        confirmButtonColor: "#10b981",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
        },
      })
    }
  }

  const deleteOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete order #${orderId}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
          cancelButton: "rounded-lg",
        },
      })

      if (!result.isConfirmed) return

      const response = await axios.delete(`http://localhost:4000/api/orders/remove/${orderId}`)

      if (response.status === 200) {
        await Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted",
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "rounded-xl",
            confirmButton: "rounded-lg",
          },
        })
        fetchOrders()
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete order",
        icon: "error",
        confirmButtonColor: "#10b981",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg",
        },
      })
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />
      case "cancelled":
        return <AlertTriangle className="h-3.5 w-3.5 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-500 mt-1">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by customer name or order ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 outline-none bg-gray-50"
              />
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 outline-none bg-gray-50 appearance-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center px-4">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No orders found</h3>
              <p className="text-gray-500 mt-2 max-w-md">
                {searchQuery || statusFilter !== "all"
                  ? "No orders match your search criteria. Try adjusting your filters."
                  : "There are no orders in the system yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 text-gray-400 mr-2" />#{order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-9 w-9 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center">
                            {order.customerName?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{order.customerName || "Unknown"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(
                            order.status || "Unknown",
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${Number.parseFloat(order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors duration-150 flex items-center"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!isLoading && filteredOrders.length > 0 && totalPages > 1 && (
          <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length > 0 ? (currentPage - 1) * ordersPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${pageNumber}`}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === pageNumber
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}