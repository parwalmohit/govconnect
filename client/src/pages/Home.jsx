import React, { useState, useEffect } from 'react';
import { Upload, MapPin, Calendar, CheckCircle, Clock, AlertCircle, FileText, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

function Home() {
  const [recentIssues, setRecentIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0
  });
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/issues/all`);
      
      // Get only the 6 most recent issues
      const recent = data.slice(0, 6);
      setRecentIssues(recent);

      // Calculate stats
      const total = data.length;
      const resolved = data.filter(i => i.status === 'resolved').length;
      const inProgress = data.filter(i => i.status === 'in-progress').length;
      
      setStats({ total, resolved, inProgress });
    } catch (error) {
      console.error('Error fetching issues:', error);
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-24">
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
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {loading ? '...' : stats.total}
            </div>
            <div className="text-gray-600 font-medium">Issues Reported</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {loading ? '...' : stats.resolved}
            </div>
            <div className="text-gray-600 font-medium">Issues Resolved</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-yellow-500">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {loading ? '...' : stats.inProgress}
            </div>
            <div className="text-gray-600 font-medium">In Progress</div>
          </div>
        </div>

        {/* Recent Issues Section */}
        <div id="issues">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Recent Reports from Your Community</h2>
            <p className="text-gray-600">Real-time updates from citizens across India</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recent issues...</p>
            </div>
          ) : recentIssues.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No issues reported yet. Be the first to report!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {recentIssues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                >
                  <img
                    src={`${baseURL}${issue.imageUrl || issue.image}`}
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

export default Home;