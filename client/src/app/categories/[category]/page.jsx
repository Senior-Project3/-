import Link from 'next/link';
import { getCategoryBySlug, getProductsByCategorySlug, getSubcategoriesByCategoryId } from '../../lib/api';

// This enables dynamic server rendering
export const dynamic = 'force-dynamic';

// For debugging - log to browser console
function debugLog(message, data) {
  console.log(`[DEBUG] ${message}:`, data);
}

// Sample fallback data if API fails
const fallbackData = {
  men: {
    title: "Men's Fashion",
    description: "Discover our collection of men's clothing, from casual to formal wear.",
    products: [
      { id: 1, name: 'Classic White T-Shirt', price: 24.99, image: 'bg-gray-200', color: 'White', size: 'M' },
      { id: 3, name: 'Casual Denim Jacket', price: 89.99, image: 'bg-gray-200', color: 'Blue', size: 'L' },
      { id: 9, name: 'Slim Fit Trousers', price: 49.99, image: 'bg-gray-200', color: 'Black', size: '32' },
      { id: 10, name: 'Formal Shirt', price: 59.99, image: 'bg-gray-200', color: 'White', size: 'M' }
    ],
    subcategories: [
      { id: 1, name: 'T-Shirts' },
      { id: 2, name: 'Jackets' },
      { id: 3, name: 'Pants' },
      { id: 4, name: 'Formal Wear' }
    ]
  },
  women: {
    title: "Women's Fashion",
    description: "Explore our stunning collection of women's clothing for every occasion.",
    products: [
      { id: 2, name: 'Summer Floral Dress', price: 49.99, image: 'bg-gray-200', color: 'Floral', size: 'M' },
      { id: 7, name: 'Women\'s Sneakers', price: 69.99, image: 'bg-gray-200', color: 'White', size: '38' },
      { id: 13, name: 'Casual Blouse', price: 39.99, image: 'bg-gray-200', color: 'Blue', size: 'S' },
      { id: 14, name: 'Midi Skirt', price: 44.99, image: 'bg-gray-200', color: 'Black', size: 'M' },
      { id: 15, name: 'Formal Jumpsuit', price: 79.99, image: 'bg-gray-200', color: 'Navy', size: 'L' },
      { id: 16, name: 'Winter Coat', price: 129.99, image: 'bg-gray-200', color: 'Beige', size: 'M' }
    ],
    subcategories: [
      { id: 5, name: 'Dresses' },
      { id: 6, name: 'Tops' },
      { id: 7, name: 'Skirts' },
      { id: 8, name: 'Outerwear' }
    ]
  },
  kids: {
    title: "Kids' Fashion",
    description: "Adorable and comfortable clothing for kids of all ages.",
    products: [
      { id: 4, name: 'Kids Cartoon T-Shirt', price: 19.99, image: 'bg-gray-200', color: 'Red', size: '6Y' },
      { id: 8, name: 'Kids Winter Jacket', price: 59.99, image: 'bg-gray-200', color: 'Blue', size: '8Y' },
      { id: 17, name: 'Children\'s Jeans', price: 34.99, image: 'bg-gray-200', color: 'Denim', size: '7Y' },
      { id: 18, name: 'Baby Romper', price: 24.99, image: 'bg-gray-200', color: 'Yellow', size: '3M' }
    ],
    subcategories: [
      { id: 9, name: 'Baby Clothes' },
      { id: 10, name: 'T-Shirts' },
      { id: 11, name: 'Outerwear' },
      { id: 12, name: 'School Wear' }
    ]
  },
  accessories: {
    title: "Accessories",
    description: "Complete your look with our range of stylish accessories.",
    products: [
      { id: 5, name: 'Elegant Watch', price: 129.99, image: 'bg-gray-200', color: 'Silver', size: 'One Size' },
      { id: 6, name: 'Leather Handbag', price: 79.99, image: 'bg-gray-200', color: 'Brown', size: 'Medium' },
      { id: 21, name: 'Designer Sunglasses', price: 89.99, image: 'bg-gray-200', color: 'Black', size: 'One Size' },
      { id: 22, name: 'Statement Necklace', price: 45.99, image: 'bg-gray-200', color: 'Gold', size: 'One Size' }
    ],
    subcategories: [
      { id: 13, name: 'Jewelry' },
      { id: 14, name: 'Bags' },
      { id: 15, name: 'Watches' },
      { id: 16, name: 'Sunglasses' }
    ]
  }
};

// Color mapping for categories
const categoryColors = {
  men: "bg-blue-600",
  women: "bg-pink-600",
  kids: "bg-green-600",
  accessories: "bg-purple-600", 
  featured: "bg-teal-600"
};

export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  console.log(`Rendering category page for: ${category}`);
  
  const { subcategory, sort, priceRange, color, size } = searchParams || {};
  
  let title = '';
  let description = '';
  let products = [];
  let subcategories = [];
  const colorStyle = categoryColors[category] || "bg-gray-600";
  
  try {
    // Fetch category and products data from API
    console.log(`Fetching data for category slug: ${category}`);
    const categoryData = await getCategoryBySlug(category);
    console.log('Category data:', categoryData);
    
    let productsData = await getProductsByCategorySlug(category);
    console.log('Raw products data:', productsData);
    
    // If API returned empty results, use fallback data instead
    if (!productsData || productsData.length === 0) {
      console.log('Using fallback data due to empty API response');
      if (fallbackData[category]) {
        title = fallbackData[category].title;
        description = fallbackData[category].description;
        products = fallbackData[category].products;
        subcategories = fallbackData[category].subcategories;
      }
    } else {
      // Set title and description based on the fetched category
      title = categoryData?.name || (category === 'men' ? "Men's Fashion" : 
            category === 'women' ? "Women's Fashion" : 
            category === 'kids' ? "Kids' Fashion" : 
            category === 'accessories' ? "Accessories" : 
            "Products");
            
      description = categoryData?.description || 'Shop our collection of products.';
      
      // Fetch subcategories if we have a category ID
      if (categoryData?.id) {
        subcategories = await getSubcategoriesByCategoryId(categoryData.id);
        console.log('Subcategories:', subcategories);
      }
      
      // Transform products data to match the component structure
      products = productsData.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        color: product.color || '',
        size: product.size || '',
        stock: product.stock || 0,
        image: product.image || 'bg-gray-200',
        subcategoryId: product.SubCategoryId
      }));
      console.log(`Transformed ${products.length} products`);
    }
    
    // Apply filters
    if (subcategory) {
      products = products.filter(product => product.subcategoryId === parseInt(subcategory));
    }
    
    if (color) {
      products = products.filter(product => 
        product.color && product.color.toLowerCase().includes(color.toLowerCase())
      );
    }
    
    if (size) {
      products = products.filter(product => 
        product.size && product.size.toLowerCase() === size.toLowerCase()
      );
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        products = products.filter(product => product.price >= min && product.price <= max);
      }
    }
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }
    
  } catch (error) {
    console.error(`Error fetching data for category '${category}':`, error);
    
    // Use fallback data if API fails
    if (fallbackData[category]) {
      title = fallbackData[category].title;
      description = fallbackData[category].description;
      products = fallbackData[category].products;
      subcategories = fallbackData[category].subcategories;
    } else {
      title = category === 'men' ? "Men's Fashion" : 
            category === 'women' ? "Women's Fashion" : 
            category === 'kids' ? "Kids' Fashion" : 
            category === 'accessories' ? "Accessories" : 
            "Products";
      description = 'Shop our collection of products.';
    }
  }

  // Get unique colors and sizes for filter options
  const uniqueColors = [...new Set(products.map(p => p.color))].filter(Boolean);
  const uniqueSizes = [...new Set(products.map(p => p.size))].filter(Boolean);

  return (
    <div>
      {/* Category Header */}
      <div className={`${colorStyle} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-8">
              {/* Subcategories Filter */}
              {subcategories.length > 0 && (
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Subcategories</h3>
                  <div className="space-y-2">
                    <Link href={`/categories/${category}`} 
                      className={`block px-2 py-1 hover:bg-gray-100 rounded ${!subcategory ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                      All Items
                    </Link>
                    {subcategories.map(subcat => (
                      <Link 
                        key={subcat.id} 
                        href={`/categories/${category}?subcategory=${subcat.id}`}
                        className={`block px-2 py-1 hover:bg-gray-100 rounded ${subcategory == subcat.id ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                      >
                        {subcat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sort Filter */}
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Sort By</h3>
                <div className="space-y-2">
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}sort=price-asc`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${sort === 'price-asc' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    Price: Low to High
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}sort=price-desc`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${sort === 'price-desc' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    Price: High to Low
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}sort=name-asc`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${sort === 'name-asc' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    Name: A to Z
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}sort=name-desc`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${sort === 'name-desc' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    Name: Z to A
                  </Link>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}priceRange=0-50`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${priceRange === '0-50' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    $0 - $50
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}priceRange=50-100`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${priceRange === '50-100' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    $50 - $100
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}priceRange=100-200`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${priceRange === '100-200' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    $100 - $200
                  </Link>
                  <Link href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}priceRange=200-500`} 
                    className={`block px-2 py-1 hover:bg-gray-100 rounded ${priceRange === '200-500' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                    $200 - $500
                  </Link>
                </div>
              </div>
              
              {/* Color Filter */}
              {uniqueColors.length > 0 && (
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Colors</h3>
                  <div className="space-y-2">
                    {uniqueColors.map(colorOption => (
                      <Link 
                        key={colorOption} 
                        href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}color=${colorOption}`}
                        className={`flex items-center px-2 py-1 hover:bg-gray-100 rounded ${color === colorOption ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                      >
                        <span className={`inline-block w-4 h-4 rounded-full mr-2 border border-gray-300`} 
                              style={{ backgroundColor: colorOption.toLowerCase() }}></span>
                        {colorOption}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Filter */}
              {uniqueSizes.length > 0 && (
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Sizes</h3>
                  <div className="space-y-2">
                    {uniqueSizes.map(sizeOption => (
                      <Link 
                        key={sizeOption} 
                        href={`/categories/${category}${subcategory ? `?subcategory=${subcategory}` : ''}${subcategory ? '&' : '?'}size=${sizeOption}`}
                        className={`block px-2 py-1 hover:bg-gray-100 rounded ${size === sizeOption ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                      >
                        {sizeOption}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Clear Filters Button */}
              {(subcategory || sort || priceRange || color || size) && (
                <div className="mt-4">
                  <Link 
                    href={`/categories/${category}`}
                    className="w-full inline-block text-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Clear All Filters
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </h2>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="w-full min-h-80 aspect-square rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
                      {product.image && product.image.startsWith('/') ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className={`w-full h-full ${product.image} flex items-center justify-center`}>
                          <span className="text-gray-500">{product.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link href={`/products/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <div className="mt-1 flex items-center space-x-2">
                          {product.color && (
                            <span className="text-xs text-gray-500">
                              Color: {product.color}
                            </span>
                          )}
                          {product.size && (
                            <span className="text-xs text-gray-500">
                              Size: {product.size}
                            </span>
                          )}
                        </div>
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
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl text-gray-600">No products found matching your filters</h3>
                <p className="mt-4 text-gray-500">Try adjusting your filter criteria or browse other categories.</p>
                <Link 
                  href={`/categories/${category}`}
                  className="mt-6 inline-block py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 