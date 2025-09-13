import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/users" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
          👤 Manage Users
        </Link>
        <Link to="/admin/portfolios" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
          💼 View Portfolios
        </Link>
        <Link to="/admin/popular-funds" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
          ⭐ Popular Funds
        </Link>
        <Link to="/admin/stats" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
          📊 Stats
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
