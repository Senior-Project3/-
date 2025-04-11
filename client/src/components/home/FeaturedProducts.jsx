'use client';
import Link from 'next/link';
import ProductCard from '../products/ProductCard';
import '../../app/css/css.Home.css';

const FeaturedProducts = () => {
  // Placeholder data - in real app, this would come from your API
  const products = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      category: 'men',
      price: 24.99,
      image: '',
      isNew: true
    },
    {
      id: 2,
      name: 'Summer Floral Dress',
      category: 'women',
      price: 49.99,
      image: '',
    },
    {
      id: 3,
      name: 'Casual Denim Jacket',
      category: 'men',
      price: 89.99,
      image: '',
      isNew: true
    },
    {
      id: 4,
      name: 'Kids Cartoon T-Shirt',
      category: 'kids',
      price: 19.99,
      image: '',
    }
  ];

  return (
    <section className="product-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-description">
            Check out our latest arrivals and bestsellers
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isNew={product.isNew} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-primary btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 