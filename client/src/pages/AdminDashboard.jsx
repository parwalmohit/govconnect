import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Trash2,
  TrendingUp,
  Users,
  FileText,
  Filter,
  Search,
  Eye,
  Calendar,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/issues`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${baseURL}/issues/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Status updated to ${newStatus}`);
      fetchAllReports();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${baseURL}/issues/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Issue deleted successfully");
      fetchAllReports();
      setShowModal(false);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting issue:", error);
      toast.error("Failed to delete issue");
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-red-100 text-red-800 border-red-200",
      "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
    };
    return map[status];
  };

  const getStatusIcon = (status) => {
    if (status === "resolved") return <CheckCircle size={16} />;
    if (status === "in-progress") return <Clock size={16} />;
    return <AlertCircle size={16} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate statistics - treat missing status as pending
  const stats = {
    total: reports.length,
    pending: reports.filter((r) => !r.status || r.status === "pending").length,
    inProgress: reports.filter((r) => r.status === "in-progress").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  };

  // Filter reports - treat missing status as pending, search includes location and state
  const filteredReports = reports.filter((r) => {
    const issueStatus = r.status || "pending"; // Treat missing status as pending
    const matchesStatus =
      filterStatus === "all" || issueStatus === filterStatus;
    const matchesCategory =
      filterCategory === "all" || r.category === filterCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const categories = [
    "all",
    "roads",
    "streetlights",
    "garbage",
    "water",
    "drainage",
    "parks",
    "traffic",
    "other",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-orange-700 text-white py-8 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 font-medium">Total Issues</div>
              <FileText className="text-orange-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {stats.total}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 font-medium">Pending</div>
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {stats.pending}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 font-medium">In Progress</div>
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {stats.inProgress}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 font-medium">Resolved</div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {stats.resolved}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Issues Table */}
        {loading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reports...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              No reports found matching your filters.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-linear-to-r from-orange-600 to-orange-700 text-white">
                <tr>
                  <th className="py-4 px-4 text-left font-semibold">ID</th>
                  <th className="py-4 px-4 text-left font-semibold">
                    Issue Details
                  </th>
                  <th className="py-4 px-4 text-left font-semibold">
                    Category
                  </th>
                  <th className="py-4 px-4 text-left font-semibold">
                    Priority
                  </th>
                  <th className="py-4 px-4 text-left font-semibold">
                    Reporter
                  </th>
                  <th className="py-4 px-4 text-left font-semibold">
                    Location
                  </th>
                  <th className="py-4 px-4 text-left font-semibold">Date</th>
                  <th className="py-4 px-4 text-left font-semibold">Status</th>
                  <th className="py-4 px-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((r, index) => (
                  <tr
                    key={r._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-700">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-800">
                        {r.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {r.description}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {r.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          r.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : r.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {r.priority?.charAt(0).toUpperCase() +
                          r.priority?.slice(1) || "Medium"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {r.user?.name || r.user?.email || "Unknown"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-xs">
                          {r.location}, {r.state}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {formatDate(r.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit border ${getStatusBadge(
                          r.status || "pending"
                        )}`}
                      >
                        {getStatusIcon(r.status || "pending")}
                        {(r.status || "pending") === "in-progress"
                          ? "In Progress"
                          : (r.status || "pending").charAt(0).toUpperCase() +
                            (r.status || "pending").slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedIssue(r);
                            setShowModal(true);
                          }}
                          className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Issue Detail Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-orange-600 to-orange-700 text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold mb-2">{selectedIssue.title}</h2>
              <div className="flex items-center gap-4 text-sm text-orange-100">
                <span>
                  Reported by:{" "}
                  {selectedIssue.user?.name || selectedIssue.user?.email}
                </span>
                <span>•</span>
                <span>{formatDate(selectedIssue.createdAt)}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <img
                    src={`${baseURL}${
                      selectedIssue.imageUrl || selectedIssue.image
                    }`}
                    alt={selectedIssue.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Category
                    </label>
                    <div className="mt-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg inline-block">
                      {selectedIssue.category}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Current Status
                    </label>
                    <div
                      className={`mt-1 px-3 py-2 rounded-lg inline-flex items-center gap-2 border ${getStatusBadge(
                        selectedIssue.status || "pending"
                      )}`}
                    >
                      {getStatusIcon(selectedIssue.status || "pending")}
                      {(selectedIssue.status || "pending") === "in-progress"
                        ? "In Progress"
                        : (selectedIssue.status || "pending")
                            .charAt(0)
                            .toUpperCase() +
                          (selectedIssue.status || "pending").slice(1)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Location
                    </label>
                    <div className="mt-1 flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-gray-400" />
                      {selectedIssue.location}, {selectedIssue.state}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-600">
                  Description
                </label>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {selectedIssue.description}
                </p>
              </div>

              <div className="border-t pt-6 flex items-center justify-between">
                <div className="space-x-2">
                  {(!selectedIssue.status ||
                    selectedIssue.status === "pending") && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedIssue._id, "in-progress")
                      }
                      className="cursor-pointer bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
                    >
                      Mark In Progress
                    </button>
                  )}
                  {selectedIssue.status === "in-progress" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedIssue._id, "resolved")
                      }
                      className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Mark Resolved
                    </button>
                  )}
                  {selectedIssue.status === "resolved" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedIssue._id, "in-progress")
                      }
                      className="cursor-pointer bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
                    >
                      Reopen Issue
                    </button>
                  )}
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
                  >
                    Delete Issue
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Issue</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this issue? This action cannot be
              undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedIssue._id)}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
