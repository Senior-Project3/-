const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper methods for making API requests
const api = {
  // Categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Products
  getProducts: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add any filters to the query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const url = `${API_URL}/products?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProductsByCategory: async (categorySlug) => {
    try {
      const response = await fetch(`${API_URL}/categories/${categorySlug}/products`);
      if (!response.ok) throw new Error(`Failed to fetch products for category: ${categorySlug}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${categorySlug}:`, error);
      return [];
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) throw new Error(`Failed to fetch product: ${productId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  },

  // Cart
  getCart: async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { items: [] };
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to add item to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return { success: false, error: error.message };
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to update cart item');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart item:', error);
      return { success: false, error: error.message };
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove item from cart');
      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return { success: false, error: error.message };
    }
  },
};

export default api;