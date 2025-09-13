import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/portfolios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolios(res.data);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Portfolios</h1>
      {portfolios.map((p) => (
        <div key={p._id} className="bg-gray-800 p-4 mb-3 rounded-lg">
          <h2 className="font-semibold">{p.user?.name || "Unknown User"}</h2>
          <ul className="ml-4">
            {p.funds.map((fund) => (
              <li key={fund._id}>
                {fund.name} – ₹{fund.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Portfolios;
