'use client';

import { useState, useEffect } from 'react';

export default function ApiTestPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [apiUrl, setApiUrl] = useState('http://localhost:4000/api');

  async function testApi() {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test the categories endpoint
      console.log(`Testing API: ${apiUrl}/categories`);
      const categoriesResponse = await fetch(`${apiUrl}/categories`, {
        cache: 'no-store'
      });
      
      if (!categoriesResponse.ok) {
        throw new Error(`Categories API returned ${categoriesResponse.status}`);
      }
      
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
      console.log('Categories:', categoriesData);
      
      // Test the products endpoint
      console.log(`Testing API: ${apiUrl}/products`);
      const productsResponse = await fetch(`${apiUrl}/products`, {
        cache: 'no-store'
      });
      
      if (!productsResponse.ok) {
        throw new Error(`Products API returned ${productsResponse.status}`);
      }
      
      const productsData = await productsResponse.json();
      setProducts(productsData);
      console.log('Products:', productsData);
      
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    testApi();
  }, []);

  const handleChangeApiUrl = (e) => {
    setApiUrl(e.target.value);
  };

  const handleRetry = () => {
    testApi();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API URL:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={apiUrl}
            onChange={handleChangeApiUrl}
            className="flex-1 p-2 border rounded"
          />
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Testing API connection...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <h3 className="font-bold text-red-700">Connection Failed</h3>
          <p className="text-red-700">{error}</p>
          <p className="mt-2 text-sm text-gray-600">
            Make sure your backend server is running at {apiUrl} and CORS is properly configured.
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-bold text-green-700">Connection Successful!</h3>
            <p className="text-green-700">
              Successfully connected to your backend API.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Categories ({categories.length})</h2>
              {categories.length > 0 ? (
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id} className="p-2 bg-gray-50 rounded">
                      <strong>{category.name}</strong> - {category.gender}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No categories found in the database</p>
              )}
            </div>
            
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
              {products.length > 0 ? (
                <ul className="space-y-2">
                  {products.slice(0, 5).map(product => (
                    <li key={product.id} className="p-2 bg-gray-50 rounded">
                      <strong>{product.name}</strong> - ${product.price}
                    </li>
                  ))}
                  {products.length > 5 && (
                    <li className="text-gray-500 text-center">
                      + {products.length - 5} more products
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No products found in the database</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 