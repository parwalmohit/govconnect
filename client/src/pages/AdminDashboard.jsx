import React from "react";
import { CheckCircle, Clock, AlertCircle, MapPin, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const reports = [
    {
      id: 1,
      title: "Water Leakage in Sector 12",
      reporter: "Ravi Sharma",
      location: "Gurgaon, Haryana",
      date: "04 Nov 2025",
      status: "pending",
    },
    {
      id: 2,
      title: "Broken Street Light",
      reporter: "Anjali Mehta",
      location: "Bandra West, Mumbai",
      date: "02 Nov 2025",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Garbage Overflowing",
      reporter: "Vikram Das",
      location: "Salt Lake, Kolkata",
      date: "01 Nov 2025",
      status: "resolved",
    },
  ];

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-red-100 text-red-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    return map[status];
  };

  const getStatusIcon = (status) => {
    if (status === "resolved") return <CheckCircle size={14} />;
    if (status === "in-progress") return <Clock size={14} />;
    return <AlertCircle size={14} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Reporter</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4 font-medium text-gray-700">{r.id}</td>
              <td className="py-3 px-4">{r.title}</td>
              <td className="py-3 px-4">{r.reporter}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <MapPin size={14} className="text-gray-500" /> {r.location}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{r.date}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusBadge(
                    r.status
                  )}`}
                >
                  {getStatusIcon(r.status)}
                  {r.status === "in-progress"
                    ? "In Progress"
                    : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700 text-sm">
                  Mark Resolved
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
