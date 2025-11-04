import React, { useState } from "react";
import { Search } from "lucide-react";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";

const Issues = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const issues = [
    {
      id: 1,
      title: "Pothole on MG Road",
      description: "Large pothole causing traffic issues near metro station",
      location: "MG Road, Bangalore",
      date: "03 Nov 2025",
      status: "pending",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    },
    {
      id: 2,
      title: "Street Light Not Working",
      description: "Street light broken for last 5 days creating safety issues",
      location: "Connaught Place, Delhi",
      date: "02 Nov 2025",
      status: "in-progress",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400",
    },
    {
      id: 3,
      title: "Garbage Not Collected",
      description: "Municipal garbage not picked up for 3 days",
      location: "Bandra West, Mumbai",
      date: "01 Nov 2025",
      status: "resolved",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
    },
  ];

  const filteredIssues = issues.filter(
    (i) =>
      (filter === "all" || i.status === filter) &&
      i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Community Issues</h1>
        <p className="text-orange-100 text-lg">
          Browse and track ongoing civic reports from citizens
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-3">
            {["all", "pending", "in-progress", "resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-lg font-medium ${
                  filter === f
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {f === "in-progress"
                  ? "In Progress"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredIssues.length === 0 ? (
            <div className="col-span-3 text-center text-gray-600 py-12 text-lg">
              No issues found for this filter.
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Issues;
