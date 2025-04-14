 'use client'
 import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Fetch SubCategories from the backend
    axios.get('http://localhost:4000/api/subcategories')
      .then((response) => {
        setSubCategories(response.data); // assuming your subcategories are returned here
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!productName || !productPrice || !productImage || !productSize || !productColor || !productSubCategory) {
      alert('Please fill all required fields.');
      setLoading(false);
      return;
    }

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', productImage);
    formData.append('upload_preset', 'testtheupload'); // Replace with your upload preset
    formData.append('cloud_name', 'dbtchbjtz'); // Replace with your cloud name

    try {
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dbtchbjtz/image/upload`,
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Save product details with the image URL
      const productData = {
        name: productName,
        price: productPrice,
        description: productDescription,
        stock: productStock,
        size: productSize,
        color: productColor,
        SubCategoryId: productSubCategory,
        image: imageUrl,
      };

      // Send product data to your backend
      const backendResponse = await axios.post('http://localhost:4000/api/products/add', productData);
      console.log('Backend Response:', backendResponse.data);

      alert('Product added successfully!');
    } catch (error) {
      console.log(error);
      console.error('Error uploading image or saving product:', error);
      alert('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-semibold mb-6 text-slate-900 dark:text-slate-50">Add Product</h1>
      <form onSubmit={handleSubmit} className="card">
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Name:</label>
          <input
            type="text"
            className="input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Price:</label>
          <input
            type="number"
            className="input"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Description:</label>
          <input
            type="text"
            className="input"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        {/* Product Stock */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Stock:</label>
          <input
            type="number"
            className="input"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
          />
        </div>

        {/* Product Size */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Size:</label>
          <input
            type="text"
            className="input"
            value={productSize}
            onChange={(e) => setProductSize(e.target.value)}
            required
          />
        </div>

        {/* Product Color */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Color:</label>
          <input
            type="text"
            className="input"
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
            required
          />
        </div>

        {/* Product SubCategory */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product SubCategory:</label>
          <select
            className="input"
            value={productSubCategory}
            onChange={(e) => setProductSubCategory(e.target.value)}
            required
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">Product Image:</label>
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="mt-3 w-24 h-24 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded-lg`}
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
