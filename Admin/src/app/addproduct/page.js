"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2, Upload, Check, AlertCircle } from "lucide-react"

export default function AddProduct() {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productStock, setProductStock] = useState("")
  const [productSize, setProductSize] = useState("")
  const [productColor, setProductColor] = useState("")
  const [productSubCategory, setProductSubCategory] = useState("")
  const [productImage, setProductImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [subCategories, setSubCategories] = useState([])
  const [notification, setNotification] = useState({ show: false, type: "", message: "" })

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/subcategories")
      .then((response) => {
        setSubCategories(response.data)
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error)
        showNotification("error", "Failed to load subcategories")
      })
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!productName || !productPrice || !productImage || !productSize || !productColor || !productSubCategory) {
      showNotification("error", "Please fill all required fields")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("file", productImage)
    formData.append("upload_preset", "testtheupload")
    formData.append("cloud_name", "dbtchbjtz")

    try {
      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dbtchbjtz/image/upload`, formData)
      const imageUrl = cloudinaryResponse.data.secure_url

      const productData = {
        name: productName,
        price: productPrice,
        description: productDescription,
        stock: productStock,
        size: productSize,
        color: productColor,
        SubCategoryId: productSubCategory,
        image: imageUrl,
      }

      const backendResponse = await axios.post("http://localhost:4000/api/products/add", productData)
      console.log("Backend Response:", backendResponse.data)
      showNotification("success", "Product added successfully!")

      // Reset form
      setProductName("")
      setProductPrice("")
      setProductDescription("")
      setProductStock("")
      setProductSize("")
      setProductColor("")
      setProductSubCategory("")
      setProductImage(null)
      setImagePreview("")
    } catch (error) {
      console.error("Error uploading image or saving product:", error)
      showNotification("error", "Failed to add product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4 sm:p-6">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
            notification.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <p>{notification.message}</p>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-teal-600 p-6 text-white">
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-teal-100 mt-1">Fill in the details to add a new product to your inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="Enter product name"
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Product Stock */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                required
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>

            {/* Product Size */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Size <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                required
                placeholder="S, M, L, XL, etc."
              />
            </div>

            {/* Product Color */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Color <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                value={productColor}
                onChange={(e) => setProductColor(e.target.value)}
                required
                placeholder="Red, Blue, Black, etc."
              />
            </div>

            {/* Product SubCategory */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none appearance-none"
                value={productSubCategory}
                onChange={(e) => setProductSubCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 focus:outline-none"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter product description (optional)"
                rows="3"
              />
            </div>

            {/* Product Image */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center w-full sm:w-1/2 h-48 transition-all duration-200 ${
                    imagePreview ? "border-teal-200 bg-teal-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {!imagePreview ? (
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Check className="mx-auto h-8 w-8 text-teal-500 mb-1" />
                      <p className="text-sm text-teal-600">Image uploaded</p>
                      <p className="text-xs text-teal-500 mt-1">Click to change</p>
                    </div>
                  )}
                </div>

                {imagePreview && (
                  <div className="w-full sm:w-1/2 h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl text-white font-medium text-base transition-all duration-300 ${
                loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  <span>Adding Product...</span>
                </div>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
