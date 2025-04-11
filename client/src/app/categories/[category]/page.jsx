import Link from 'next/link';

// Sample data - in a real app, you would fetch this from your backend API
const getCategoryData = (category) => {
  const categoryInfo = {
    men: {
      title: "Men's Fashion",
      description: "Discover our collection of men's clothing, from casual to formal wear.",
      color: "bg-blue-600",
      products: [
        { id: 1, name: 'Classic White T-Shirt', price: 24.99, image: 'bg-gray-200' },
        { id: 3, name: 'Casual Denim Jacket', price: 89.99, image: 'bg-gray-200' },
        { id: 9, name: 'Slim Fit Trousers', price: 49.99, image: 'bg-gray-200' },
        { id: 10, name: 'Formal Shirt', price: 59.99, image: 'bg-gray-200' },
        { id: 11, name: 'Sports Shorts', price: 29.99, image: 'bg-gray-200' },
        { id: 12, name: 'Casual Hoodie', price: 45.99, image: 'bg-gray-200' },
      ]
    },
    women: {
      title: "Women's Fashion",
      description: "Explore our stunning collection of women's clothing for every occasion.",
      color: "bg-pink-600",
      products: [
        { id: 2, name: 'Summer Floral Dress', price: 49.99, image: 'bg-gray-200' },
        { id: 7, name: 'Women\'s Sneakers', price: 69.99, image: 'bg-gray-200' },
        { id: 13, name: 'Casual Blouse', price: 39.99, image: 'bg-gray-200' },
        { id: 14, name: 'Midi Skirt', price: 44.99, image: 'bg-gray-200' },
        { id: 15, name: 'Formal Jumpsuit', price: 79.99, image: 'bg-gray-200' },
        { id: 16, name: 'Winter Coat', price: 129.99, image: 'bg-gray-200' },
      ]
    },
    kids: {
      title: "Kids' Fashion",
      description: "Adorable and comfortable clothing for kids of all ages.",
      color: "bg-green-600",
      products: [
        { id: 4, name: 'Kids Cartoon T-Shirt', price: 19.99, image: 'bg-gray-200' },
        { id: 8, name: 'Kids Winter Jacket', price: 59.99, image: 'bg-gray-200' },
        { id: 17, name: 'Children\'s Jeans', price: 34.99, image: 'bg-gray-200' },
        { id: 18, name: 'Baby Romper', price: 24.99, image: 'bg-gray-200' },
        { id: 19, name: 'Kids Party Dress', price: 49.99, image: 'bg-gray-200' },
        { id: 20, name: 'School Uniform Set', price: 65.99, image: 'bg-gray-200' },
      ]
    },
    accessories: {
      title: "Accessories",
      description: "Complete your look with our range of stylish accessories.",
      color: "bg-purple-600",
      products: [
        { id: 5, name: 'Elegant Watch', price: 129.99, image: 'bg-gray-200' },
        { id: 6, name: 'Leather Handbag', price: 79.99, image: 'bg-gray-200' },
        { id: 21, name: 'Designer Sunglasses', price: 89.99, image: 'bg-gray-200' },
        { id: 22, name: 'Statement Necklace', price: 45.99, image: 'bg-gray-200' },
        { id: 23, name: 'Leather Belt', price: 29.99, image: 'bg-gray-200' },
        { id: 24, name: 'Winter Scarf', price: 24.99, image: 'bg-gray-200' },
      ]
    },
    featured: {
      title: "Featured Products",
      description: "Our selection of the best products across all categories.",
      color: "bg-teal-600",
      products: [
        { id: 1, name: 'Classic White T-Shirt', price: 24.99, image: 'bg-gray-200' },
        { id: 2, name: 'Summer Floral Dress', price: 49.99, image: 'bg-gray-200' },
        { id: 3, name: 'Casual Denim Jacket', price: 89.99, image: 'bg-gray-200' },
        { id: 4, name: 'Kids Cartoon T-Shirt', price: 19.99, image: 'bg-gray-200' },
        { id: 5, name: 'Elegant Watch', price: 129.99, image: 'bg-gray-200' },
        { id: 6, name: 'Leather Handbag', price: 79.99, image: 'bg-gray-200' },
      ]
    }
  };

  return categoryInfo[category] || {
    title: "Category Not Found",
    description: "Sorry, we couldn't find this category.",
    color: "bg-gray-600",
    products: []
  };
};

export default function CategoryPage({ params }) {
  const { category } = params;
  const categoryData = getCategoryData(category);

  return (
    <div>
      {/* Category Header */}
      <div className={`${categoryData.color} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {categoryData.title}
          </h1>
          <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryData.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 aspect-square rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
                  <div className={`w-full h-full ${product.image} flex items-center justify-center`}>
                    <span className="text-gray-500">{product.name}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <button className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No products found in this category</h3>
          </div>
        )}
      </div>
    </div>
  );
} 