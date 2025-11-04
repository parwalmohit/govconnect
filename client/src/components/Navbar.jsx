import React, { useState } from 'react';
import { Home, LogIn, HelpCircle, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-md mt-2">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
            <img
              className="w-30 h-15"
              src="https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg"
              alt="MyGov Logo"
              />
            </Link>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <Home size={20} />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  <User size={20} />
                  Admin
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}

            <Link
              to="/help"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              <HelpCircle size={20} />
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
