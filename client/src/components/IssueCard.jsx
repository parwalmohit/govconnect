import React from "react";
import { MapPin, Calendar, AlertCircle, Clock, CheckCircle } from "lucide-react";

const IssueCard = ({ issue }) => {
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-red-100 text-red-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    return styles[status];
  };

  const getStatusIcon = (status) => {
    if (status === "resolved") return <CheckCircle size={14} />;
    if (status === "in-progress") return <Clock size={14} />;
    return <AlertCircle size={14} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-800 flex-1 pr-2">{issue.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadge(
              issue.status
            )}`}
          >
            {getStatusIcon(issue.status)}
            {issue.status === "in-progress"
              ? "In Progress"
              : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{issue.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
