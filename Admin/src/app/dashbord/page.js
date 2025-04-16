'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@/hooks/use-theme';
import {
  CreditCard,
  DollarSign,
  Package,
  Users,
} from 'lucide-react';

const DashboardPage = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/products/');
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to fetch products');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/users/getall');
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/orders/');
      console.log('Fetched orders:', res.data);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to fetch orders');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchUsers(), fetchOrders()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate statistics
  const totalProducts = products.length;
  const totalSoldProducts = products.reduce(
    (sum, p) => sum + (parseInt(p.sales) || 0),
    0
  );
  const totalSales = products.reduce(
    (sum, p) => sum + (parseFloat(p.price || 0) * (parseInt(p.sales) || 0)),
    0
  );

  // Prepare chart data
  const overviewData = products.slice(0, 7).map((p, idx) => ({
    name: `P${idx + 1}`,
    total: parseFloat(p.price || 0),
    sales: parseInt(p.sales || 0),
  }));

  // Calculate order status counts
  const pendingOrders = orders.filter(order => order.status?.toLowerCase() === 'pending').length;
  const deliveredOrders = orders.filter(order => order.status?.toLowerCase() === 'delivered').length;
  const totalOrders = orders.length;

  // Prepare data for PieChart
  const orderStatusData = [
    { id: 0, value: pendingOrders, label: 'Pending', color: '#FCD34D' },
    { id: 1, value: deliveredOrders, label: 'Delivered', color: '#34D399' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Package size={26} />}
          title="Total Products"
          value={totalProducts}
        />
        <StatsCard
          icon={<DollarSign size={26} />}
          title="Total Number of Sold Products"
          value={totalSoldProducts}
        />
        <StatsCard
          icon={<Users size={26} />}
          title="Total Users"
          value={users.length}
        />
        <StatsCard
          icon={<CreditCard size={26} />}
          title="Sales"
          value={`TND ${totalSales.toFixed(2)}`}
        />
      </div>

      {/* Chart + Recent Sales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        {/* Overview Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 col-span-1 lg:col-span-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={overviewData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke={theme === 'light' ? '#475569' : '#94a3b8'}
              />
              <YAxis
                stroke={theme === 'light' ? '#475569' : '#94a3b8'}
                tickFormatter={(v) => `TND ${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'light' ? 'white' : '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                formatter={(value, name) => [`TND ${value}`, name === 'total' ? 'Price' : 'Sales']}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#60a5fa"
                fill="url(#colorTotal)"
                name="Price"
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#34D399"
                fill="url(#colorSales)"
                name="Sales"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status PieChart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 col-span-1 lg:col-span-3">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Order Status
          </h2>
          <Box sx={{ 
            flexGrow: 1, 
            minHeight: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            '& .MuiChartsLegend-mark': {
              rx: '8px',
              ry: '8px'
            }
          }}>
            {totalOrders > 0 ? (
              <PieChart
                series={[
                  {
                    data: orderStatusData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                    valueFormatter: (item) => 
                      `${item.label}: ${((item.value / totalOrders) * 100).toFixed(1)}%`,
                  },
                ]}
                height={200}
                margin={{ right: 5 }}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                  },
                }}
              />
            ) : (
              <Typography color="textSecondary" sx={{ mt: 2 }}>
                No Orders Available
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

// StatsCard Component
const StatsCard = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
      {title}
    </h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

export default DashboardPage;