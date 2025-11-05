import React, { useState, useEffect } from "react";
import { LogIn, Eye, EyeOff, Lock, Mail, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ isAdminLogin = false }) => {
  const [view, setView] = useState(isAdminLogin ? "admin" : "user");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_URL;

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const url =
        view === "user"
          ? `${baseURL}/auth/login`
          : `${baseURL}/auth/admin/login`;

      const { data } = await axios.post(url, formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success(
        `${data.role === "user" ? "User" : "Admin"} login successful`
      );
      if (data.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 ${
        view === "user"
          ? "bg-linear-to-br from-blue-50 to-blue-100"
          : "bg-linear-to-br from-red-50 to-red-100"
      }`}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                view === "user" ? "bg-blue-600" : "bg-red-600"
              }`}
            >
              {view === "user" ? (
                <User className="text-white" size={32} />
              ) : (
                <Shield className="text-white" size={32} />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {view === "user" ? "Welcome Back" : "Admin Portal"}
            </h2>
            <p className="text-gray-600">
              {view === "user"
                ? "Sign in to track your reports"
                : "Authorized access only"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {view === "user" ? "Email Address" : "Admin Email"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    view === "user" ? "your@email.com" : "admin@gov.in"
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <Eye
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                      size={20}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                      size={20}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Extra Options */}
            {view === "user" ? (
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Keep me signed in
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                view === "user"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white cursor-pointer py-3 rounded-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {view === "user" ? "Signing in..." : "Authenticating..."}
                </>
              ) : (
                <>
                  {view === "user" ? <LogIn size={20} /> : <Shield size={20} />}
                  {view === "user" ? "Sign In" : "Admin Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Footer for users only */}
          {view === "user" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Demo Switcher */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setView("user")}
            className={`px-4 cursor-pointer py-2 rounded ${
              view === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setView("admin")}
            className={`cursor-pointer px-4 py-2 rounded ${
              view === "admin"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
