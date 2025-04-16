'use client';

import Link from 'next/link';
import { useAuth } from '../Contexts/AuthContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Features', href: '/features' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Website
          </h1>
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-base font-medium transition-all duration-300 
                  ${pathname === link.href
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-500'}
                  after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px]
                  ${pathname === link.href
                    ? 'after:bg-indigo-600'
                    : 'after:bg-transparent group-hover:after:bg-indigo-300'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isMounted && isAuthenticated ? (
            <>
              <span className="text-gray-700 font-medium">Hi, {user?.fullname}</span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-sm transition-transform duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : isMounted && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-white hover:bg-indigo-500 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-transform duration-200 transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
