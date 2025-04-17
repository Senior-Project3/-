'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users/getall");
      const filtered = response.data.filter((u) => u && typeof u === "object" && u.username);
      setData(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const currentUsers = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleBanClick = (user) => {
    setSelectedUser(user);
    setBanReason("");
    setShowModal(true);
  };

  const confirmBan = async () => {
    try {
      await axios.put(`http://localhost:4000/api/users/ban/${selectedUser.id}`, {
        banReason
      });
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to ban user", error);
    }
  };

  return (
    <div className="overflow-x-auto p-4 pt-2">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>

      <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {currentUsers.map((user, index) => (
            <tr key={user.id || index} className="border-t">
              <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td className="px-4 py-3">{user.username}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                {user.isBanned ? (
                  <span className="text-red-600 font-semibold">Banned</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )}
              </td>
              <td className="px-4 py-3">
                {!user.isBanned && (
                  <button
                    onClick={() => handleBanClick(user)}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        >
          &#8592;
        </button>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`rounded px-4 py-2 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        >
          &#8594;
        </button>
      </div>

      {/* Ban Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Ban User</h2>
            <p className="mb-2 text-gray-600">
              Are you sure you want to ban <span className="font-semibold">{selectedUser.username}</span>?
            </p>
            <textarea
              className="w-full rounded border border-gray-300 p-2 text-sm text-gray-800"
              rows={3}
              placeholder="Enter ban reason..."
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmBan}
                disabled={!banReason}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
