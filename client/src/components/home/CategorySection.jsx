'use client';
import React from "react";
import Link from "next/link";
import "../../app/css/css.categories.css";
import { FaArrowRight, FaTag } from "react-icons/fa";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Jeans",
      slug: "jeans",
      description: "High-quality denim jeans for all styles and occasions",
      color: "#3eb9d3",
      image: "/images/categories/jeans.jpg"
    },
    {
      id: 2,
      name: "Shirts",
      slug: "shirts",
      description: "Stylish and comfortable shirts for casual and formal wear",
      color: "#e64b79",
      image: "/images/categories/shirts.jpg"
    },
    {
      id: 3,
      name: "Jackets",
      slug: "jackets",
      description: "Premium jackets to keep you warm and stylish in any weather",
      color: "#6c69e8",
      image: "/images/categories/jackets.jpg"
    },
    {
      id: 4,
      name: "Accessories",
      slug: "accessories",
      description: "Complete your look with our fashionable accessories",
      color: "#f7a440",
      image: "/images/categories/accessories.jpg"
    },
  ];

  return (
    <section className="category-section">
      <div className="section-container">
        <div className="section-header">
          <h3 className="section-subtitle">Shop By Category</h3>
          <h2 className="section-title">Browse Our Collections</h2>
          <p className="section-description">
            Discover our carefully curated collections featuring the latest trends and timeless classics.
          </p>
        </div>
        
        <div className="category-grid">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.slug}`} 
              className="category-card" 
              key={category.id}
              style={{ animationDelay: `${0.1 * category.id}s` }}
            >
              <div className="category-card-image" style={{ backgroundColor: category.color }}>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                <div className="category-card-overlay" style={{ backgroundColor: `${category.color}40` }}></div>
                <div className="category-icon">
                  <FaTag />
                </div>
              </div>
              
              <div className="category-card-content">
                <h3 className="category-card-title">{category.name}</h3>
                <p className="category-card-description">{category.description}</p>
                <div className="category-item-count">24 items</div>
                
                <div className="category-card-footer">
                  <button className="btn-shop-now">
                    Shop Collection <FaArrowRight className="btn-shop-now-icon" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 