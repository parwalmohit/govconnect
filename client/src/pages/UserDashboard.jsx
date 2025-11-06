import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [userIssues, setUserIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL;

  // Fetch user's issues on component mount
  useEffect(() => {
    fetchUserIssues();
  }, []);

  const fetchUserIssues = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login first');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/issues/my`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast.error('Failed to load your issues');
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-orange-600 text-white py-10 shadow-md">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, Citizen!</h1>
          <p className="text-orange-100 text-lg">
            Track all your submitted issues and see updates in real time.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-orange-500">
          <div className="text-4xl font-bold text-orange-600 mb-2">{userIssues.length}</div>
          <div className="text-gray-600 font-medium">Total Issues</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-yellow-500">
          <div className="text-4xl font-bold text-yellow-600 mb-2">
            {userIssues.filter((i) => i.status === 'in-progress' || i.status === 'pending').length}
          </div>
          <div className="text-gray-600 font-medium">Active Issues</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {userIssues.filter((i) => i.status === 'resolved').length}
          </div>
          <div className="text-gray-600 font-medium">Resolved</div>
        </div>
      </div>

      {/* Action Button */}
      <div className="max-w-6xl mx-auto px-8 mb-8 text-right">
        <Link
          to="/help"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition"
        >
          + Report New Issue
        </Link>
      </div>

      {/* User's Issues List */}
      <div className="max-w-6xl mx-auto px-8 pb-12 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Submitted Issues</h2>

        {loading ? (
          <div className="text-center text-gray-600 bg-white p-10 rounded-lg shadow-md">
            <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading your issues...</p>
          </div>
        ) : userIssues.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-10 rounded-lg shadow-md">
            <FileText size={32} className="mx-auto mb-3 text-orange-500" />
            <p>No issues reported yet. Click "Report New Issue" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {userIssues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={`${baseURL}${issue.imageUrl}`}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1 pr-2">
                      {issue.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${getStatusBadge(issue.status)}`}
                    >
                      {getStatusIcon(issue.status)}
                      {issue.status === 'in-progress'
                        ? 'In Progress'
                        : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {issue.description}
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span>{issue.location}, {issue.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>{formatDate(issue.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;