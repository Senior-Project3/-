'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InventoryPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [isPieChart, setIsPieChart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch subcategories
        const subcategoriesResponse = await axios.get('http://localhost:4000/api/subcategories/');
        const subcategoriesData = subcategoriesResponse.data || [];

        // Fetch products with images
        const productsResponse = await axios.get('http://localhost:4000/api/products/');
        const productsData = productsResponse.data || [];

        // Map products to subcategories based on SubCategoryId and include images
        const enrichedSubcategories = subcategoriesData.map(sub => {
          const subItems = productsData.filter(product => product.SubCategoryId === sub.id) || [];
          return {
            ...sub,
            items: subItems,
            image: subItems.length > 0 ? subItems[0].image : '/placeholder.svg', // Use first product's image or placeholder
          };
        });

        setSubcategories(enrichedSubcategories);
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch inventory data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle cases where data might be empty or malformed
  const safeSubcategories = subcategories || [];
  const totalItems = safeSubcategories.reduce((acc, sub) => acc + (sub.items?.length || 0), 0);
  const totalStock = safeSubcategories.reduce((acc, sub) => {
    return acc + (sub.items?.reduce((sum, item) => sum + (item.stock || 0), 0) || 0);
  }, 0);
  const totalInventoryValue = safeSubcategories.reduce((acc, sub) => {
    return acc + (sub.items?.reduce((sum, item) => sum + (item.price || 0) * (item.stock || 0), 0) || 0);
  }, 0);

  const chartData = safeSubcategories.map(sub => ({
    name: sub.name,
    stock: sub.items?.reduce((sum, item) => sum + (item.stock || 0), 0) || 0,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  const filteredSubcategories = safeSubcategories.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-green-50 p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-gray-600">Total Subcategories</p>
            <h3 className="text-2xl font-bold text-gray-800">{subcategories.length}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-gray-600">Total Items</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalItems}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-gray-600">Total Stock</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalStock}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-4 flex flex-col items-center">
            <p className="text-sm text-gray-600">Total Inventory Value</p>
            <h3 className="text-2xl font-bold text-gray-800">${totalInventoryValue.toFixed(2)}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Chart Toggle */}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Chart</h2>
        <Button
          onClick={() => setIsPieChart(prev => !prev)}
          className="bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
        >
          Toggle {isPieChart ? 'Bar Chart' : 'Pie Chart'}
        </Button>
      </div>

      <div className="w-full h-[300px] bg-white rounded-xl shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          {isPieChart ? (
            <PieChart>
              <Pie
                dataKey="stock"
                data={chartData}
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Search + View Toggle */}
      <div className="flex items-center justify-between mt-8">
        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-sm"
        />
        <Button
          onClick={() => setIsGridView(prev => !prev)}
          className="ml-4 bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
        >
          {isGridView ? 'List View' : 'Grid View'}
        </Button>
      </div>

      {/* Subcategory Cards */}
      <div className={`mt-6 grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {filteredSubcategories.map((sub) => (
          <Card key={sub.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-4 space-y-4">
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="font-semibold text-lg text-gray-800">{sub.name}</h3>
              <p className="text-gray-600">Total Items: {sub.items?.length || 0}</p>
              <p className="text-gray-600">
                Stock: {sub.items?.reduce((sum, item) => sum + (item.stock || 0), 0) || 0}
              </p>
              <p className="text-gray-600">
                Value: $
                {sub.items?.reduce((sum, item) => sum + (item.stock || 0) * (item.price || 0), 0).toFixed(2) || 0}
              </p>
              {sub.items.length > 0 && (
                <p className="text-gray-600">
                  Price Example: ${typeof sub.items[0].price === 'number' ? sub.items[0].price.toFixed(2) : 'N/A'}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;