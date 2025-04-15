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


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';

// const CategoryPage = () => {
//   const { category } = useParams(); // category slug
//   console.log(category,"category");
  

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (category) {
//       const fetchProducts = async () => {
//         try {
//           const res = await axios.get(`http://localhost:4000/api/products/category/${category}`);
//         //   const res = await axios.get(`http://localhost:4000/api/products/category/mens`);

          
//           const data =res.data
//           console.log('Fetched products:', res.data);
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
//         } 
//         finally {
//           setLoading(false);
//         }
//       };

//       fetchProducts();
//     }
//  }, [category]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-4 capitalize">
//           {category} Products
//         </h1>

//         {!loading && Array.isArray(products) && (
//           <p className="text-gray-600 text-lg mb-8">
//             {products.length} product{products.length !== 1 && 's'} found in <span className="capitalize">{category}</span>
//           </p>
//         )}

//         {loading ? (
//           <p className="text-gray-600 text-lg">Loading products...</p>
//         ) : products.length === 0 ? (
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
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams(); // category slug
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/products/category/${category}`);
          const data = res.data;
          setProducts(Array.isArray(data) ? data : data.products || []);
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
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>{category} Products</h1>

        {!loading && Array.isArray(products) && (
          <p style={styles.subtitle}>
            {products.length} product{products.length !== 1 && 's'} found in <span style={styles.categoryName}>{category}</span>
          </p>
        )}

        {loading ? (
          <p style={styles.loadingText}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={styles.loadingText}>No products found in this category.</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                  />
                  <div style={styles.priceBadge}>${product.price.toFixed(2)}</div>
                </div>
                <div style={styles.cardContent}>
                  <h2 style={styles.productName}>{product.name}</h2>
                  <p style={styles.productDescription}>{product.description}</p>
                  <div style={styles.cardFooter}>
                    <Link href={`/products/${product.id}`} style={styles.detailsLink}>
                      View Details
                    </Link>
                    <button style={styles.addToCartButton}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    padding: '2rem 0',
  },
  contentContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: '1rem',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    marginBottom: '2rem',
  },
  categoryName: {
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: '1.125rem',
    color: '#4b5563',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '2rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    position: 'relative',
    height: '12rem',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  priceBadge: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#14b8a6',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
  },
  cardContent: {
    padding: '1rem',
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsLink: {
    fontSize: '0.875rem',
    color: '#14b8a6',
    textDecoration: 'none',
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#14b8a6',
    color: '#fff',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default CategoryPage;