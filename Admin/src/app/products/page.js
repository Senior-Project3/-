'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Products = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
    const [refetch, setRefetch] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, [refetch]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products/`);
            const filtered = response.data.filter((p) => p && typeof p === "object" && p.name);
            setData(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    const currentProducts = data
        .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter products by search query
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleEditClick = (product) => {
        setEditProduct(product);
        setForm({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
        });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditProduct(null);
        setForm({ name: "", description: "", price: "", stock: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/products/update/${editProduct.id}`, form);
            fetchData();
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:4000/api/products/deleteone/${id}`);
            setRefetch(!refetch);
        } catch (err) {
            console.error(err);
        }
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="overflow-x-auto p-4 pt-2">
            {/* Search input */}
            <div className="mb-4 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border p-2"
                />
            </div>

            <h1 className="mb-4 text-2xl font-bold">Product List</h1>
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                <thead className="bg-gray-100 text-sm text-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left">#</th>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                    {currentProducts.map((product, index) => (
                        <tr key={product.id || index} className="border-t">
                            <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className="flex items-center gap-4 px-4 py-3">
                                <img
                                    src={product.image || "https://via.placeholder.com/50"}
                                    alt={product.name}
                                    className="h-12 w-12 rounded object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.description}</p>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium">TND {parseFloat(product.price).toFixed(2)}</td>
                            <td className="px-4 py-3">
                                <span className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-semibold`}>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </td>
                            <td className="space-x-2 px-4 py-3">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => handleEditClick(product)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination with Arrows */}
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
                >
                    <FaArrowLeft />
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
                    <FaArrowRight />
                </button>
            </div>
            {/* Modal */}
            {showModal && editProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">Edit Product</h2>
                        <label className="mb-2 block">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-2 block">
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-2 block">
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-4 block">
                            Stock:
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </label>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleModalClose}
                                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
