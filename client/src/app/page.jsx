'use client';

import { useAuth } from './Contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">My Website</h1>
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700 mr-4">Welcome, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-x-4">
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            {isAuthenticated ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Welcome to Your Home Page</h2>
                <p className="text-gray-600">
                  You are logged in as {user?.name} ({user?.email})
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">
                    This is your personalized home page. You can add more content here.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Welcome to Our Website</h2>
                <p className="text-gray-600">
                  Please login or register to access your personalized content.
                </p>
                <div className="mt-4 space-x-4">
                  <Link
                    href="/login"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 