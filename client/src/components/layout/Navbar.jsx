'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../../app/css/css.Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-text">LABESNI</span>
        </Link>
        
        <div className="navbar-links">
        <Link href="/categories/men" className="navbar-link">
  Men
</Link>
<Link href="/categories/women" className="navbar-link">
  Women
</Link>
<Link href="/categories/kids" className="navbar-link">
  Kids
</Link>
<Link href="/categories/accessories" className="navbar-link">
  Accessories
</Link>
          <Link href="/cart" className="navbar-cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="navbar-cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Uncomment when you have cart functionality */}
            {/* <span className="navbar-cart-count">3</span> */}
          </Link>
        </div>
        
        <button onClick={toggleMobileMenu} className="navbar-toggle">
          <svg className="navbar-toggle-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      <div className={`navbar-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link href="/" className="navbar-mobile-link">
          Home
        </Link>
        <Link href="/categories/men" className="navbar-mobile-link">
          Men
        </Link>
        <Link href="/categories/women" className="navbar-mobile-link">
          Women
        </Link>
        <Link href="/categories/kids" className="navbar-mobile-link">
          Kids
        </Link>
        <Link href="/categories/accessories" className="navbar-mobile-link">
          Accessories
        </Link>
        <Link href="/cart" className="navbar-mobile-link">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 