'use client';
import Link from 'next/link';
import '../../app/css/css.Home.css';

const ProductCard = ({ product, isNew = false }) => {
  return (
    <div className="product-card">
      {isNew && <span className="product-card-badge">New</span>}
      <div className="product-card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {product.name}
          </div>
        )}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="product-card-category">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button className="btn-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 