"use client"

import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"
import {
  Package,
  Users,
  DollarSign,
  ShoppingBag,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

const DashboardPage = () => {
  const [theme, setTheme] = useState("light")
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({ products: null, users: null }) // Track errors per endpoint
  const [activeTab, setActiveTab] = useState("overview")

  // Check system preference for dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light")
      })
    }
  }, [])

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products/")
      setProducts(Array.isArray(res.data) ? res.data : [])
      setErrors((prev) => ({ ...prev, products: null }))
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setErrors((prev) => ({ ...prev, products: "Failed to fetch products" }))
      setProducts([])
    }
  }

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users/getall")
      setUsers(Array.isArray(res.data) ? res.data : [])
      setErrors((prev) => ({ ...prev, users: null }))
    } catch (error) {
      console.error("Failed to fetch users:", error)
      setErrors((prev) => ({ ...prev, users: "Failed to fetch users" }))
      setUsers([])
    }
  }

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchProducts(), fetchUsers()])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Memoize dashboard calculations
  const dashboardData = useMemo(() => {
    const totalProducts = products.length
    const totalSoldProducts = products.reduce((sum, p) => {
      const sales = Number.parseInt(p.sales) || 0
      return sum + (isNaN(sales) ? 0 : sales)
    }, 0)
    const totalSales = products.reduce((sum, p) => {
      const price = Number.parseFloat(p.price) || 0
      const sales = Number.parseInt(p.sales) || 0
      return sum + (isNaN(price) || isNaN(sales) ? 0 : price * sales)
    }, 0)
    const totalUsers = users.length
    const revenueGrowth = 0 // Replace with real calculation if API provides historical data

    return {
      totalProducts,
      totalSoldProducts,
      totalSales,
      totalUsers,
      revenueGrowth,
    }
  }, [products, users])

  // Top 7 products by sales
  const overviewData = useMemo(() => {
    return products
      .sort((a, b) => (Number.parseInt(b.sales) || 0) - (Number.parseInt(a.sales) || 0))
      .slice(0, 7)
      .map((p) => ({
        name: p.name || `Product ${p.id || "Unknown"}`,
        total: Number.parseFloat(p.price) || 0,
        sales: Number.parseInt(p.sales) || 0,
      }))
  }, [products])

  // New users per day (last 7 days) and per month
  const newUsersData = useMemo(() => {
    const now = new Date()

    // Daily data (last 7 days)
    const dailyData = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now)
      day.setDate(now.getDate() - i)
      const dayStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      const count = users.filter((user) => {
        if (!user.createdAt) return false
        const created = new Date(user.createdAt)
        return (
          created.getFullYear() === day.getFullYear() &&
          created.getMonth() === day.getMonth() &&
          created.getDate() === day.getDate()
        )
      }).length

      dailyData.push({ name: dayStr, users: count })
    }

    // Monthly data (last 7 months)
    const monthlyData = []
    const monthNames = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setMonth(now.getMonth() - i)
      monthNames.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }))
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(now)
      date.setMonth(now.getMonth() - (6 - i))
      const year = date.getFullYear()
      const month = date.getMonth()

      const count = users.filter((user) => {
        if (!user.createdAt) return false
        const created = new Date(user.createdAt)
        return created.getFullYear() === year && created.getMonth() === month
      }).length

      monthlyData.push({ name: monthNames[i], users: count })
    }

    return { daily: dailyData, monthly: monthlyData }
  }, [users])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TND",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Refresh specific data
  const refreshData = async (type = "all") => {
    setLoading(true)
    try {
      if (type === "all") {
        await Promise.all([fetchProducts(), fetchUsers()])
      } else if (type === "products") {
        await fetchProducts()
      } else if (type === "users") {
        await fetchUsers()
      }
    } catch (error) {
      console.error(`Error refreshing ${type} data:`, error)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-blue-600 dark:text-blue-400 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  // Error state with option to retry specific endpoints
  if (errors.products || errors.users) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Data</h2>
          {errors.products && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">{errors.products}</p>
          )}
          {errors.users && (
            <p className="text-gray-600 dark:text-gray-300 mb-6">{errors.users}</p>
          )}
          <div className="flex flex-col gap-2">
            {errors.products && (
              <button
                onClick={() => refreshData("products")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry Products</span>
              </button>
            )}
            {errors.users && (
              <button
                onClick={() => refreshData("users")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry Users</span>
              </button>
            )}
            <button
              onClick={() => refreshData("all")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry All</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main dashboard render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshData("all")}
              className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Package size={24} />}
            title="Total Products"
            value={dashboardData.totalProducts}
            trend={`${products.filter((p) => (p.stock || 0) > 0).length} in stock`}
            trendColor="text-green-600 dark:text-green-400"
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatsCard
            icon={<ShoppingBag size={24} />}
            title="Total Sold Products"
            value={dashboardData.totalSoldProducts}
            trend={`${(
              (dashboardData.totalSoldProducts / (dashboardData.totalProducts || 1)) * 100
            ).toFixed(1)}% of inventory`}
            trendColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-emerald-100 dark:bg-emerald-900/30"
            iconColor="text-emerald-600 dark:text-emerald-400"
          />
          <StatsCard
            icon={<Users size={24} />}
            title="Total Users"
            value={dashboardData.totalUsers}
            trend={`${newUsersData.daily.reduce((sum, day) => sum + day.users, 0)} new this week`}
            trendColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
          />
          <StatsCard
            icon={<DollarSign size={24} />}
            title="Total Sales"
            value={formatCurrency(dashboardData.totalSales)}
            trend={`${
              dashboardData.revenueGrowth > 0 ? "+" : ""
            }${dashboardData.revenueGrowth}% from last month`}
            trendColor={
              dashboardData.revenueGrowth >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
            iconBg="bg-amber-100 dark:bg-amber-900/30"
            iconColor="text-amber-600 dark:text-amber-400"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Overview Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  Top Products by Sales
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Price and sales volume of your best-selling products
                </p>
              </div>
            </div>
            <div className="h-80">
              {overviewData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      tickMargin={10}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                      tickFormatter={(value) => `TND ${value}`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                      tickFormatter={(value) => `${value} sold`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        borderRadius: "0.5rem",
                        border: "none",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                      formatter={(value, name) => {
                        if (name === "total") return [`TND ${value}`, "Price"]
                        if (name === "sales") return [`${value}`, "Units Sold"]
                        return [value, name]
                      }}
                      labelFormatter={(label) => `Product: ${label}`}
                    />
                    <Bar
                      dataKey="total"
                      name="Price"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      yAxisId="left"
                    />
                    <Bar
                      dataKey="sales"
                      name="Units Sold"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      yAxisId="right"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No product sales data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Users Charts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                User Registration Trends
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">New user registrations over time</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Last 7 months
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Chart */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Daily Registrations (Last 7 Days)
              </h3>
              <div className="h-64">
                {newUsersData.daily.some((day) => day.users > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={newUsersData.daily}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                      />
                      <XAxis
                        dataKey="name"
                        stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                          borderRadius: "0.5rem",
                          border: "none",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                        formatter={(value) => [`${value} users`, "New Registrations"]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No new users in the last 7 days</p>
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Chart */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Monthly Registrations
              </h3>
              <div className="h-64">
                {newUsersData.monthly.some((month) => month.users > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={newUsersData.monthly}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                      />
                      <XAxis
                        dataKey="name"
                        stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                          borderRadius: "0.5rem",
                          border: "none",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                        formatter={(value) => [`${value} users`, "New Registrations"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar
                        dataKey="users"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No new users in the last 7 months</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatsCard = ({ icon, title, value, trend, trendColor, iconBg, iconColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
    <div className="flex items-center justify-between mb-4">
      <div className={`${iconBg} ${iconColor} p-3 rounded-xl`}>{icon}</div>
    </div>
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
    {trend && <p className={`text-xs font-medium ${trendColor} flex items-center`}>{trend}</p>}
  </div>
)

export default DashboardPage