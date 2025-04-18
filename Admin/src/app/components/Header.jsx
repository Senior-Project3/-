'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, ChevronsLeft, Moon, Sun, Package } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readOrderIds, setReadOrderIds] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readOrderIds');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const fetchNotifications = async (retryCount = 3, delay = 1000) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/orders/', {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      const orders = Array.isArray(response.data) ? response.data : [];
      const newOrders = orders.filter(
        (order) =>
          order.status?.toLowerCase() === 'pending' &&
          !readOrderIds.includes(order.id)
      );
      setNotifications(newOrders);
    } catch (err) {
      console.error('Error fetching orders:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (retryCount > 0 && err.code === 'ERR_NETWORK') {
        console.log(`Retrying... (${retryCount} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchNotifications(retryCount - 1, delay * 2);
      }

      let errorMessage = 'Failed to fetch order notifications';
      if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Unable to connect to the server. Please check if the server is running.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Unauthorized. Please log in again.';
        window.location.href = '/login';
      } else if (err.response?.status === 403) {
        errorMessage = 'Access denied. You do not have permission to view orders.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 30000);
    return () => clearInterval(interval);
  }, [readOrderIds]);

  useEffect(() => {
    localStorage.setItem('readOrderIds', JSON.stringify(readOrderIds));
  }, [readOrderIds]);

  useEffect(() => {
    const handleOrderEvents = () => {
      fetchNotifications();
    };

    const handleOrderDeleted = (event) => {
      const { orderId } = event.detail;
      setReadOrderIds((prev) => {
        const updated = prev.filter((id) => id !== orderId);
        localStorage.setItem('readOrderIds', JSON.stringify(updated));
        return updated;
      });
      fetchNotifications();
    };

    window.addEventListener('orderCreated', handleOrderEvents);
    window.addEventListener('orderUpdated', handleOrderEvents);
    window.addEventListener('orderDeleted', handleOrderDeleted);

    return () => {
      window.removeEventListener('orderCreated', handleOrderEvents);
      window.removeEventListener('orderUpdated', handleOrderEvents);
      window.removeEventListener('orderDeleted', handleOrderDeleted);
    };
  }, [fetchNotifications]);

  const handleMarkAsRead = (orderId) => {
    setReadOrderIds((prev) => [...prev, orderId]);
    setNotifications(notifications.filter((order) => order.id !== orderId));
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? 'rotate-180' : ''} />
        </button>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>
        <div className="relative">
          <button
            className="btn-ghost size-10"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          {showDropdown && (
            <Card className="absolute right-0 top-12 w-80 z-20 shadow-lg">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  New Orders ({notifications.length})
                </h3>
                {loading && <p className="text-gray-600 text-sm">Loading...</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {notifications.length === 0 && !loading && !error && (
                  <p className="text-gray-600 text-sm">No new orders</p>
                )}
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((order) => (
                    <li
                      key={order.id}
                      className="flex justify-between items-center border-b border-gray-100 pb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-teal-600" />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-gray-600">
                            {order.customerName || 'Unknown'}
                          </p>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            {order.status || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(order.id)}
                        className="text-teal-600 border-teal-600 hover:bg-teal-50"
                      >
                        Mark as Read
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        <button className="size-10 overflow-hidden rounded-full">
          <Image
            src="/profile-image.jpg"
            alt="profile image"
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};