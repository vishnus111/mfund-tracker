import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularFunds = () => {
  const [funds, setFunds] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/popular-funds", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFunds(res.data);
      } catch (err) {
        console.error("Error fetching funds:", err);
      }
    };
    fetchFunds();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Popular Funds</h1>
      <ul>
        {funds.map((f) => (
          <li key={f._id} className="bg-gray-800 p-3 mb-2 rounded-lg">
            {f.name} – {f.count} users invested
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularFunds;
