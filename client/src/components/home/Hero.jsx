'use client';
import Link from 'next/link';
import '../../app/css/css.Home.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span>LABESNI</span> - Your Style, Your Way
        </h1>
        <p className="hero-description">
          Discover the latest fashion trends and premium quality clothing for the entire family. From casual wear to formal attire, we have everything you need.
        </p>
        <div className="hero-actions">
          <Link href="/categories" className="btn btn-primary">
            Explore Collections
          </Link>
          <Link href="/categories/featured" className="btn btn-secondary">
            Featured Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 