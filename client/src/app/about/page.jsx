'use client';

import { useAuth } from '../Contexts/AuthContext';

export default function AboutPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* About Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Learn more about our company, our mission, and the team behind our success.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">Our Mission</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xl text-gray-500">
                To provide innovative solutions that empower businesses and individuals to achieve their goals through cutting-edge technology and exceptional service.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-900">Our Team</h3>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team Member 1 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-white rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mx-auto">
                    <span className="text-xl font-bold">JD</span>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900 text-center">John Doe</h4>
                  <p className="mt-2 text-base text-gray-500 text-center">CEO & Founder</p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-white rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mx-auto">
                    <span className="text-xl font-bold">AS</span>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900 text-center">Alice Smith</h4>
                  <p className="mt-2 text-base text-gray-500 text-center">CTO</p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-white rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mx-auto">
                    <span className="text-xl font-bold">RJ</span>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900 text-center">Robert Johnson</h4>
                  <p className="mt-2 text-base text-gray-500 text-center">Lead Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company History */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-900">Our Story</h3>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25"></div>
                <div className="relative p-6 bg-white rounded-lg">
                  <p className="text-base text-gray-500">
                    Founded in 2024, our company started with a simple mission: to make technology accessible and beneficial for everyone. 
                    Over the years, we've grown from a small startup to a leading provider of innovative solutions, helping businesses 
                    and individuals achieve their goals through cutting-edge technology and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 My Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}