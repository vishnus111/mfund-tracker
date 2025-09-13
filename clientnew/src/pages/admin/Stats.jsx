import React, { useEffect, useState } from "react";
import axios from "axios";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, [token]);

  if (!stats) return <p className="text-gray-400 p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Platform Stats</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Portfolios: {stats.totalPortfolios}</p>
        <p>Total Funds: {stats.totalFunds}</p>
      </div>
    </div>
  );
};

export default Stats;
