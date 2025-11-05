import React, { useState } from "react";
import { Upload, MapPin, Phone, Mail, Trash } from "lucide-react";
import axios from "axios";

const Help = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "roads",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    e.preventDefault(); 

    // Validation
    if (
      !formData.category ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.state ||
      !formData.location.trim() ||
      !formData.image
    ) {
      alert("Please fill out all required fields and upload a photo.");
      return;
    }

    const token = localStorage.getItem("token"); // token from login
    if (!token) {
      alert("Please log in first to report an issue.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("state", formData.state);
      data.append("location", formData.location);
      data.append("image", formData.image);

      const res = await axios.post("http://localhost:3000/api/issues", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        alert("✅ Issue reported successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          category: "roads",
          state: "",
          image: null,
        });
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to report issue. Please try again later.");
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Report a Civic Issue
          </h1>
          <p className="text-gray-600 text-lg">
            Help us serve you better by reporting issues in your area
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents page reload
            handleSubmit(); // calls your function
          }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
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

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State / Union Territory *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select your state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
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
                  placeholder="e.g., MG Road, near Metro Station"
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

              {/* Show preview if image is uploaded */}
              {formData.image ? (
                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, image: null })}
                    className="absolute cursor-pointer top-2 right-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-lg px-2 py-2"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert("File size should be less than 5MB");
                          e.target.value = null;
                          return;
                        }
                        setFormData({ ...formData, image: file });
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-orange-500 transition cursor-pointer bg-gray-50 block"
                  >
                    <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-700 font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 5MB (Clear photo helps faster resolution)
                    </p>
                  </label>
                </>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full cursor-pointer bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition font-semibold text-lg"
            >
              Submit Report
            </button>
          </div>
        </div>
        </form>

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
