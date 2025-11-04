import React, { useState } from 'react';
import { Home, LogIn, HelpCircle, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">GovConnect</h1>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <Home size={20} />
              Home
            </a>
            
            {isLoggedIn ? (
              <>
                <a
                  href="/admin"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  <User size={20} />
                  Admin
                </a>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
              >
                <LogIn size={20} />
                Login
              </a>
            )}
            
            <a
              href="/help"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <HelpCircle size={20} />
              Help
            </a>
          </div>
        </div>
      </div>

      {/* Demo Toggle */}
      <div className="bg-gray-100 px-4 py-2 text-center border-t">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Demo: Click to toggle {isLoggedIn ? 'Logout' : 'Login'} state
        </button>
      </div>
    </nav>
  );
}