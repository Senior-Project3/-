// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// const CategoryPage = () => {
//   const router = useRouter();
//   const { category } = router.query; // Get category slug from the URL
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     if (category) {
//       const fetchProducts = async () => {
//         const res = await fetch(`http://localhost:4000/api/products/category/${category}`);
//         const data = await res.json();
//         setProducts(data);
//       };

//       fetchProducts();
//     }
//   }, [category]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-8 capitalize">
//           {category} Products
//         </h1>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h2 className="text-xl font-bold">{product.name}</h2>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-teal-600 font-bold mt-2">${product.price}</p>
//               <Link
//                 href={`/products/${product.id}`}
//                 className="text-teal-600 hover:underline mt-4 block"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// const CategoryPage = () => {
//   const params = useParams();
//   const category = params.category; // Get category slug from the URL

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     if (category) {
//       const fetchProducts = async () => {
//         const res = await fetch(`http://localhost:4000/api/products/category/${category}`);
//         const data = await res.json();
//         console.log('Fetched products:', data);
//         // setProducts(data);
//         setProducts(data.products);
//       };

//       fetchProducts();
//     }
//   }, [category]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-8 capitalize">
//           {category} Products
//         </h1>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h2 className="text-xl font-bold">{product.name}</h2>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-teal-600 font-bold mt-2">${product.price}</p>
//               <Link
//                 href={`/products/${product.id}`}
//                 className="text-teal-600 hover:underline mt-4 block"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// const CategoryPage = () => {
//   const params = useParams();
//   const category = params.CategoryId;

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (category) {
//       const fetchProducts = async () => {
//         try {
//           const res = await fetch(`http://localhost:4000/api/products/${category}`);
//           const data = await res.json();
//           console.log('Fetched products:', data);

//           // Handle different API shapes
//           if (Array.isArray(data)) {
//             setProducts(data);
//           } else if (Array.isArray(data.products)) {
//             setProducts(data.products);
//           } else {
//             setProducts([]);
//           }
//         } catch (error) {
//           console.error('Error fetching products:', error);
//           setProducts([]);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProducts();
//     }
//   }, [category]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-8 capitalize">
//           {category} Products
//         </h1>

//         {loading ? (
//           <p className="text-gray-600 text-lg">Loading products...</p>
//         ) : !Array.isArray(products) || products.length === 0 ? (
//           <p className="text-gray-600 text-lg">No products found in this category.</p>
//         ) : (
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {products.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-md mb-4"
//                 />
//                 <h2 className="text-xl font-bold">{product.name}</h2>
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="text-teal-600 font-bold mt-2">${product.price}</p>
//                 <Link
//                   href={`/products/${product.id}`}
//                   className="text-teal-600 hover:underline mt-4 block"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;


'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const CategoryPage = () => {
  const { category } = useParams(); // category slug

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`http://localhost:4000/api/products/category/${category}`);
          const data = await res.json();

          if (Array.isArray(data)) {
            setProducts(data);
          } else if (Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 capitalize">
          {category} Products
        </h1>

        {!loading && Array.isArray(products) && (
          <p className="text-gray-600 text-lg mb-8">
            {products.length} product{products.length !== 1 && 's'} found in <span className="capitalize">{category}</span>
          </p>
        )}

        {loading ? (
          <p className="text-gray-600 text-lg">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-teal-600 font-bold mt-2">${product.price}</p>
                <Link
                  href={`/products/${product.id}`}
                  className="text-teal-600 hover:underline mt-4 block"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
