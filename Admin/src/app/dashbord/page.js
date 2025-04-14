'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { Footer } from "../components/Footer";

import { CreditCard, DollarSign, Package, Users, TrendingUp } from "lucide-react";


const DashboardPage = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products/");
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users/getall");
      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

 
  const totalProducts = products.length;

  // Calculate total number of sold products
  const totalSoldProducts = products.reduce((sum, p) => sum + (parseInt(p.sales) || 0), 0);

  // Calculate total revenue from sales
  const totalSales = products.reduce((sum, p) => sum + (parseFloat(p.price || 0) * (parseInt(p.sales) || 0)), 0);

  // 📈 Overview data (mocked here, you can map by month later)
  const overviewData = products.slice(0, 7).map((p, idx) => ({
    name: `P${idx + 1}`,
    total: parseFloat(p.price) || 0,
  }));

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard icon={<Package size={26} />} title="Total Products" value={totalProducts} />
        <StatsCard icon={<DollarSign size={26} />} title="Total Number of Sold Products" value={totalSoldProducts} />
        <StatsCard icon={<Users size={26} />} title="Total Users" value={users.length} />
        <StatsCard icon={<CreditCard size={26} />} title="Sales" value={`TND ${totalSales.toFixed(2)}`} />
      </div>

      {/* Chart + Recent Sales (placeholder) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Overview</p>
          </div>
          <div className="card-body p-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={overviewData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip formatter={(value) => `$${value}`} />
                <XAxis dataKey="name" stroke={theme === "light" ? "#475569" : "#94a3b8"} />
                <YAxis stroke={theme === "light" ? "#475569" : "#94a3b8"} tickFormatter={(v) => `$${v}`} />
                <Area type="monotone" dataKey="total" stroke="#2563eb" fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Recent Sales</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-4 text-gray-500">
            {/* You can render recent sales or just recent products here */}
            <ul className="space-y-3">
              {products.slice(0, 5).map((p) => (
                <li key={p._id || p.name} className="flex justify-between">
                  <span>{p.name}</span>
                  <span>${p.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const StatsCard = ({ icon, title, value }) => (
  <div className="card">
    <div className="card-header">
      <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
        {icon}
      </div>
      <p className="card-title">{title}</p>
    </div>
    <div className="card-body bg-slate-100 dark:bg-slate-950">
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
      <span className="flex items-center gap-2 rounded-full border border-blue-500 px-2 py-1 text-blue-500 dark:border-blue-600 dark:text-blue-600">
        <TrendingUp size={18} /> {/* Random growth % */}
        20%
      </span>
    </div>
  </div>
);

export default DashboardPage;
