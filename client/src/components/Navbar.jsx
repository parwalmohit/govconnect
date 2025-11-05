import React, { useState, useEffect, useRef } from "react";
import { Home, User, Shield, ChevronDown, HelpCircle } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Reactive check: reads from localStorage whenever component mounts
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role || "");
  };

  useEffect(() => {
    checkLogin();
    // Listen for storage changes (cross-tab)
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Active link styling function
  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-2 font-medium transition ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;
  };

  return (
    <nav className="bg-white shadow-md mt-2">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - clickable only for non-admin */}
          {userRole === "admin" ? (
            <div>
              <img
                className="w-30 h-15"
                src="https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg"
                alt="MyGov Logo"
              />
            </div>
          ) : (
            <Link to="/">
              <img
                className="w-30 h-15"
                src="https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg"
                alt="MyGov Logo"
              />
            </Link>
          )}

          {/* Menu */}
          <div className="flex items-center gap-8">
            {/* Home - visible for guest and users only (NOT admin) */}
            {userRole !== "admin" && (
              <NavLink to="/" className={getNavLinkClass}>
                <Home size={20} /> Home
              </NavLink>
            )}

            {/* Help - visible for guest and users only (NOT admin) */}
            {userRole !== "admin" && (
              <NavLink to="/help" className={getNavLinkClass}>
                <HelpCircle size={20} /> Help
              </NavLink>
            )}

            {/* Login/Profile */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  <div className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-blue-600">
                    {userRole === "admin" ? (
                      <Shield size={20} className="text-white" />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                  <ChevronDown className="cursor-pointer" size={16} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {/* Dashboard - only for user (not admin) */}
                    {userRole === "user" && (
                      <Link
                        to="/user-dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    )}

                    {/* Logout - for both user and admin */}
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <User size={20} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;