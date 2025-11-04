import React, { useState } from 'react';
import { Upload, MapPin, Calendar, CheckCircle, Clock, AlertCircle, FileText, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  const recentIssues = [
    {
      id: 1,
      title: 'Pothole on MG Road',
      description: 'Large pothole causing traffic issues near metro station',
      location: 'MG Road, Bangalore',
      date: '03 Nov 2025',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: 2,
      title: 'Street Light Not Working',
      description: 'Street light broken for last 5 days creating safety issues',
      location: 'Connaught Place, Delhi',
      date: '02 Nov 2025',
      status: 'in-progress',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400'
    },
    {
      id: 3,
      title: 'Garbage Not Collected',
      description: 'Municipal garbage not picked up for 3 days',
      location: 'Bandra West, Mumbai',
      date: '01 Nov 2025',
      status: 'resolved',
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400'
    },
    {
      id: 4,
      title: 'Broken Water Pipeline',
      description: 'Water leakage on main road causing waterlogging',
      location: 'Salt Lake, Kolkata',
      date: '31 Oct 2025',
      status: 'in-progress',
      image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=400'
    },
    {
      id: 5,
      title: 'Illegal Parking Issue',
      description: 'Vehicles blocking pedestrian walkway daily',
      location: 'Anna Nagar, Chennai',
      date: '30 Oct 2025',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400'
    },
    {
      id: 6,
      title: 'Park Maintenance Required',
      description: 'Children park equipment broken and needs repair',
      location: 'Koregaon Park, Pune',
      date: '29 Oct 2025',
      status: 'resolved',
      image: 'https://plus.unsplash.com/premium_photo-1663045375281-cf037f967bda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    };
    return styles[status];
  };

  const getStatusIcon = (status) => {
    if (status === 'resolved') return <CheckCircle size={14} />;
    if (status === 'in-progress') return <Clock size={14} />;
    return <AlertCircle size={14} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-600 to-orange-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Your Voice, Your City</h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Report civic issues in your locality and help make India better. Track real-time status updates from your municipal authorities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/help"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition text-lg"
            >
              Report an Issue
            </Link>
            <Link
              to="/issues"
              className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition border-2 border-white text-lg"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-orange-500">
            <div className="text-4xl font-bold text-orange-600 mb-2">12,847</div>
            <div className="text-gray-600 font-medium">Issues Reported</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 mb-2">9,234</div>
            <div className="text-gray-600 font-medium">Issues Resolved</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-yellow-500">
            <div className="text-4xl font-bold text-yellow-600 mb-2">3,613</div>
            <div className="text-gray-600 font-medium">In Progress</div>
          </div>
        </div>

        {/* Recent Issues Section */}
        <div id="issues">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Recent Reports from Your Community</h2>
            <p className="text-gray-600">Real-time updates from citizens across India</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1 pr-2">{issue.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${getStatusBadge(issue.status)}`}>
                      {getStatusIcon(issue.status)}
                      {issue.status === 'in-progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {issue.description}
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>{issue.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Report Issue</h3>
              <p className="text-gray-600 text-sm">Submit your complaint with a photo and location details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">2. AI Prioritizes</h3>
              <p className="text-gray-600 text-sm">Our system analyzes and prioritizes urgent issues</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Get Resolved</h3>
              <p className="text-gray-600 text-sm">Municipal authorities take action and update status</p>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>

);
}

export default Home