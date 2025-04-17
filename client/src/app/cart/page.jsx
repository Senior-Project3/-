'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import Cookies from 'js-cookie';
import Link from 'next/link';
import axios from 'axios';

export default function CartPage() {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(Cookies.get('token'));
  const [refresh,setrefresh]=useState(true)

  useEffect(() => {
    // If no token, don't try to fetch the cart
    if (!isAuthenticated || !user ) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.data) {
          throw new Error('No cart data found');
        }

        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError(error.response?.data?.error || error.message || 'Failed to fetch cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, user, token,refresh]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/cart/update/${productId}`,
        {  quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data) {
        throw new Error('Failed to update cart');
      }

      setCart(response.data);
      setrefresh(!refresh)
    } catch (error) {
      console.error('Error updating cart:', error);
      alert(error.response?.data?.error || error.message || 'Failed to update cart');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data) {
        throw new Error('Failed to remove item');
      }

      setCart(response.data);
      setrefresh(!refresh)

    } catch (error) {
      console.error('Error removing item:', error);
      alert(error.response?.data?.error || error.message || 'Failed to remove item from cart');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please login to view your cart</h2>
            <Link href="/login" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Error</h2>
            <p className="mt-2 text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <Link href="/products" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            {cart.CartItems.map((item) => (
              <div key={item.id} className="px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="col-span-2 flex items-center">
                    <img
                      src={item.Product?.image || '/placeholder-product.jpg'}
                      alt={item.Product?.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.Product?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.Product?.SubCategory?.Category?.name || 'Uncategorized'}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-900">${Number(item.Product?.price).toFixed(2)}</div>
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.ProductId, parseInt(e.target.value))}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">${(item.Product?.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => handleRemoveItem(item.ProductId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Total</h3>
              <span className="text-xl font-bold text-gray-900">${Number(cart.total).toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

