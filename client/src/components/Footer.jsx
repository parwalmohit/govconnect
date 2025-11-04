import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-700 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-start">
        
        {/* Left: About */}
        <div className="w-1/3">
          <h3 className="text-2xl font-semibold mb-3">GovConnect</h3>
          <p className="text-orange-100 leading-relaxed">
            GovConnect is a citizen-first platform that helps people report and track 
            civic issues like potholes, water leakage, and waste management. 
            Together, let’s build a cleaner, smarter India.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="w-1/4">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-orange-100">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-white transition">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-white transition">
                Help
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Contact */}
        <div className="w-1/3">
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-orange-100">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> New Delhi, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@govconnect.in
            </li>
          </ul>

          {/* Social Icons (can be plain buttons for now) */}
          <div className="flex gap-4 mt-5">
            <button className="hover:text-gray-200">
              <Facebook size={22} />
            </button>
            <button className="hover:text-gray-200">
              <Twitter size={22} />
            </button>
            <button className="hover:text-gray-200">
              <Instagram size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-500 mt-8 pt-4 text-center text-orange-100 text-sm">
        © {new Date().getFullYear()} GovConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
