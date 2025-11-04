import React, { useState } from "react";
import {
  Upload,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Help = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "roads",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert("Issue reported successfully! You will receive updates on your registered email.");
    setFormData({ title: "", description: "", location: "", category: "roads" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Report a Civic Issue</h1>
          <p className="text-gray-600 text-lg">
            Help us serve you better by reporting issues in your area
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="roads">Roads & Potholes</option>
                <option value="streetlights">Street Lights</option>
                <option value="garbage">Garbage & Sanitation</option>
                <option value="water">Water Supply</option>
                <option value="drainage">Drainage & Sewage</option>
                <option value="parks">Parks & Public Spaces</option>
                <option value="traffic">Traffic & Parking</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Large pothole on MG Road"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the issue, when it started, and how it's affecting you..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., MG Road, near Metro Station, Bangalore"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Be as specific as possible with landmarks
              </p>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Photo *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-orange-500 transition cursor-pointer bg-gray-50">
                <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-700 font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 5MB (Clear photo helps faster resolution)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition font-semibold text-lg"
            >
              Submit Report
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-600" />
              <span>
                Helpline: <strong>1800-123-4567</strong> (Toll Free)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>
                Email: <strong>support@govconnect.gov.in</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
