import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Men's Fashion",
      slug: "men",
      description: "Discover our collection of men's clothing, from casual to formal wear.",
      color: "bg-blue-600",
      items: "42 items"
    },
    {
      id: 2,
      name: "Women's Fashion",
      slug: "women",
      description: "Explore our stunning collection of women's clothing for every occasion.",
      color: "bg-pink-600",
      items: "56 items"
    },
    {
      id: 3,
      name: "Kids' Fashion",
      slug: "kids",
      description: "Adorable and comfortable clothing for kids of all ages.",
      color: "bg-green-600",
      items: "38 items"
    },
    {
      id: 4,
      name: "Accessories",
      slug: "accessories",
      description: "Complete your look with our range of stylish accessories.",
      color: "bg-purple-600",
      items: "27 items"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Shop By Category
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our wide range of clothing and accessories for the whole family
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="block">
              <div className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                <div className={`${category.color} w-full md:w-1/3 p-8 flex items-center justify-center`}>
                  <h2 className="text-2xl font-bold text-white text-center">{category.name}</h2>
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.items}</span>
                    <span className="text-teal-600 font-medium flex items-center">
                      Shop Now
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/categories/featured"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
            View Featured Items
          </Link>
        </div>
      </div>
    </div>
  );
} 