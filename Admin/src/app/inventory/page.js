
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LabelList } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Package,
  DollarSign,
  AlertCircle,
  Search,
  LayoutGrid,
  List,
  BarChart3,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const InventoryPage = () => {
  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [stockStatusFilter, setStockStatusFilter] = useState("all")
  const [isGridView, setIsGridView] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1) // Track current page
  const itemsPerPage = 6 // Display 6 cards per page

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch subcategories
      const subcategoriesResponse = await axios.get("http://localhost:4000/api/subcategories/")
      const subcategoriesData = subcategoriesResponse.data || []

      // Fetch products with images
      const productsResponse = await axios.get("http://localhost:4000/api/products/")
      const productsData = productsResponse.data || []

      // Map products to subcategories based on SubCategoryId and include images
      const enrichedSubcategories = subcategoriesData.map((sub) => {
        const subItems = productsData.filter((product) => product.SubCategoryId === sub.id) || []
        return {
          ...sub,
          items: subItems,
          image: subItems.length > 0 ? subItems[0].image : "/placeholder.svg?height=300&width=400",
        }
      })

      setSubcategories(enrichedSubcategories)
      setProducts(productsData)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch inventory data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Handle cases where data might be empty or malformed
  const safeSubcategories = subcategories || []
  const totalInStock = products.filter((product) => (product.stock || 0) > 0).length
  const totalOutOfStock = products.filter((product) => (product.stock || 0) === 0).length
  const totalAlmostOutOfStock = products.filter(
    (product) => (product.stock || 0) > 0 && (product.stock || 0) <= 5,
  ).length
  const totalInventoryValue = safeSubcategories.reduce((acc, sub) => {
    return acc + (sub.items?.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.stock) || 0), 0) || 0)
  }, 0)

  const chartData = safeSubcategories.map((sub) => ({
    name: sub.name.length > 15 ? `${sub.name.slice(0, 12)}...` : sub.name, // Truncate long names
    stock: sub.items?.reduce((sum, item) => sum + (Number(item.stock) || 0), 0) || 0,
  }))

  // Filter subcategories by name and stock status
  const filteredSubcategories = safeSubcategories.filter((sub) => {
    const matchesName = sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesName) return false

    if (stockStatusFilter === "all") return true

    const hasInStock = sub.items?.some((item) => (Number(item.stock) || 0) > 0)
    const hasOutOfStock = sub.items?.some((item) => (Number(item.stock) || 0) == 0)
    const hasAlmostOutOfStock = sub.items?.some(
      (item) => (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= 5,
    )

    switch (stockStatusFilter) {
      case "inStock":
        return hasInStock
      case "outOfStock":
        return hasOutOfStock
      case "almostOutOfStock":
        return hasAlmostOutOfStock
      default:
        return true
    }
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredSubcategories.length / itemsPerPage)
  const paginatedSubcategories = filteredSubcategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Custom Tooltip for Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</p>
          <p className="text-sm text-teal-600 dark:text-teal-400">
            Stock: <span className="font-medium">{payload[0].value} items</span>
          </p>
        </div>
      )
    }
    return null
  }

  // Handle bar click to filter subcategories
  const handleBarClick = (data) => {
    setSearchQuery(data.name) // Set search query to the clicked subcategory name
    setCurrentPage(1) // Reset to first page
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500 mb-4"></div>
          <p className="text-teal-700 font-medium">Loading inventory data...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Inventory Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor your product inventory across {subcategories.length} subcategories
          </p>
        </div>
        <Button
          onClick={fetchData}
          className="bg-white hover:bg-gray-50 text-teal-600 border border-gray-200 shadow-sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Subcategories</p>
              <h3 className="text-2xl font-bold text-gray-800">{subcategories.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Inventory Value</p>
              <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalInventoryValue)}</h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">In Stock</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalInStock}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalOutOfStock}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Low Stock</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalAlmostOutOfStock}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Distribution</h2>
          <p className="text-sm text-gray-500 mt-1">
            Stock levels across {subcategories.length} subcategories
          </p>
        </div>

        <div className="w-full h-[400px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 40, right: 30, left: 20, bottom: 80 }}
                onClick={(data) => data && handleBarClick(data.activePayload[0].payload)}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 500 }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 500 }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={() => (
                    <span className="text-sm font-medium text-gray-700">Stock (Items)</span>
                  )}
                />
                <Bar
                  dataKey="stock"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={800}
                  activeBar={{ fill: "#2563eb", stroke: "#1e40af", strokeWidth: 2 }}
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                >
                  <LabelList
                    dataKey="stock"
                    position="top"
                    style={{ fontSize: 12, fill: "#1f2937", fontWeight: 600 }}
                    formatter={(value) => `${value}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <Package className="h-12 w-12 mr-2 opacity-50" />
              <span>No inventory data available</span>
            </div>
          )}
        </div>
      </div>

      {/* Search + Stock Status Filter + View Toggle */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 outline-none bg-gray-50"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 outline-none bg-gray-50"
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="almostOutOfStock">Low Stock</option>
            </select>

            <Button
              onClick={() => setIsGridView((prev) => !prev)}
              variant="outline"
              className="flex items-center gap-2 bg-white border border-gray-200"
            >
              {isGridView ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              <span>{isGridView ? "List View" : "Grid View"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Subcategory Cards */}
      {paginatedSubcategories.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No subcategories found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery || stockStatusFilter !== "all"
              ? "No subcategories match your search criteria. Try adjusting your filters."
              : "There are no subcategories in the system yet."}
          </p>
        </div>
      ) : (
        <>
          <div className={`grid ${isGridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
            {paginatedSubcategories.map((sub) => (
              <Card
                key={sub.id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-none"
              >
                {isGridView ? (
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={sub.image || "/placeholder.svg?height=300&width=400"}
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {sub.items?.length || 0} products
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">{sub.name}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Stock</p>
                          <p className="text-base font-medium text-gray-700">
                            {sub.items?.reduce((sum, item) => sum + (Number(item.stock) || 0), 0) || 0} items
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Value</p>
                          <p className="text-base font-medium text-gray-700">
                            {formatCurrency(
                              sub.items?.reduce(
                                (sum, item) => sum + (Number(item.stock) || 0) * (Number(item.price) || 0),
                                0,
                              ) || 0,
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Stock Status Indicators */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sub.items?.some((item) => (Number(item.stock) || 0) === 0) && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                            Out of Stock
                          </span>
                        )}
                        {sub.items?.some((item) => (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= 5) && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                            Low Stock
                          </span>
                        )}
                        {sub.items?.some((item) => (Number(item.stock) || 0) > 5) && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            In Stock
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={sub.image || "/placeholder.svg?height=100&width=100"}
                        alt={sub.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{sub.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-gray-600">
                            Products: <span className="font-medium">{sub.items?.length || 0}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Stock:{" "}
                            <span className="font-medium">
                              {sub.items?.reduce((sum, item) => sum + (Number(item.stock) || 0), 0) || 0}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Value:{" "}
                            <span className="font-medium">
                              {formatCurrency(
                                sub.items?.reduce(
                                  (sum, item) => sum + (Number(item.stock) || 0) * (Number(item.price) || 0),
                                  0,
                                ) || 0,
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {sub.items?.some((item) => (Number(item.stock) || 0) === 0) && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium whitespace-nowrap">
                            Out of Stock
                          </span>
                        )}
                        {sub.items?.some((item) => (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= 5) && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium whitespace-nowrap">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="bg-white border border-gray-200"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                return (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`min-w-[2.5rem] ${
                      currentPage === page
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </Button>
                )
              })}
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="bg-white border border-gray-200"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InventoryPage
