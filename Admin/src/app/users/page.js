'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CustomersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/users/getall');
      const userData = Array.isArray(res.data) ? res.data : [];
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((user) =>
        statusFilter === 'active' ? !user.isBanned : user.isBanned
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, statusFilter, users]);

  const handleBan = async (id) => {
    try {
      // First confirm with the user
      const { value: reason } = await Swal.fire({
        title: 'Ban User',
        input: 'text',
        inputLabel: 'Reason for banning',
        inputPlaceholder: 'Enter reason...',
        showCancelButton: true,
        confirmButtonText: 'Ban User',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (!reason) return; // If user cancels or doesn't provide a reason

      // Send the ban request
      const response = await axios.put(`http://localhost:4000/api/users/ban/${id}`, {
        reason,
        isBanned: true,
      });

      if (response.status === 200) {
        // Refresh the users list
        fetchUsers();
      }
    } catch (err) {
      console.error('Error banning user:', err);
      // Show error message with more detail
      let errorMessage = 'Failed to ban user. Please try again.';
      if (err.response?.status === 404) {
        errorMessage = 'Ban endpoint not found. Please check the API route.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  const handleUnban = async (id) => {
    try {
      // First confirm with the user
      const result = await Swal.fire({
        title: 'Unban User',
        text: 'Are you sure you want to unban this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unban user',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      });

      if (!result.isConfirmed) return;

      // Send the unban request
      const response = await axios.put(`http://localhost:4000/api/users/unban/${id}`, {
        isBanned: false,
      });

      if (response.status === 200) {
        // Show success message
        await Swal.fire({
          icon: 'success',
          title: 'User Unbanned',
          text: 'The user has been successfully unbanned.',
        });
        // Refresh the users list
        fetchUsers();
      }
    } catch (err) {
      console.error('Error unbanning user:', err);
      // Show error message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to unban user. Please try again.',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!result.isConfirmed) return;

      await axios.delete(`http://localhost:4000/api/users/${id}`);

      await Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'User has been deleted.',
      });

      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to delete user. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e6f7f2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6f7f2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
            <p className="text-sm text-gray-500">{filteredUsers.length} customers found</p>
          </div>
          <button 
            onClick={() => fetchUsers()}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by customer name or email..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <select 
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fullname</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-medium">
                          {user.fullname.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullname}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isBanned 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.isBanned ? (
                          <button
                            onClick={() => handleUnban(user.id)}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Unban
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBan(user.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Ban
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}