import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const Issues = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/issues/all`);
      console.log('Fetched issues:', data);
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast.error('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = issues.filter((i) => {
  const matchesFilter = filter === "all" || i.status === filter;
  const matchesSearch =
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase()) ||
    i.state.toLowerCase().includes(search.toLowerCase());
  return matchesFilter && matchesSearch;
});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Transform data to match IssueCard expected format
  const transformedIssues = filteredIssues.map(issue => ({
    id: issue._id,
    title: issue.title,
    description: issue.description,
    location: `${issue.location}, ${issue.state}`,
    date: formatDate(issue.createdAt),
    status: issue.status,
    image: `${baseURL}${issue.imageUrl || issue.image}`
  }));

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
          <div className="cursor-pointer flex gap-3">
            {["all", "pending", "in-progress", "resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 cursor-pointer rounded-lg font-medium transition ${
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-600 py-12">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading issues...</p>
          </div>
        ) : (
          /* Issues Grid */
          <div className="grid grid-cols-3 gap-6">
            {transformedIssues.length === 0 ? (
              <div className="col-span-3 text-center text-gray-600 py-12 text-lg">
                No issues found for this filter.
              </div>
            ) : (
              transformedIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Issues;