import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await API.get("/portfolio/value");
        if (res.data.success) setPortfolio(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">My Portfolio</h3>
        {portfolio ? (
          <>
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <p>Total Investment: ₹{portfolio.totalInvestment}</p>
              <p>Current Value: ₹{portfolio.currentValue}</p>
              <p>
                Profit/Loss:{" "}
                <span className={portfolio.profitLoss >= 0 ? "text-green-400" : "text-red-400"}>
                  ₹{portfolio.profitLoss} ({portfolio.profitLossPercent}%)
                </span>
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-700 text-yellow-400">
                  <tr>
                    <th className="p-2">Scheme</th>
                    <th className="p-2">Units</th>
                    <th className="p-2">Current NAV</th>
                    <th className="p-2">Value</th>
                    <th className="p-2">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((h) => (
                    <tr key={h.schemeCode} className="border-b border-gray-700">
                      <td className="p-2">{h.schemeName}</td>
                      <td className="p-2">{h.units}</td>
                      <td className="p-2">{h.currentNav}</td>
                      <td className="p-2">{h.currentValue}</td>
                      <td className={`p-2 ${h.profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {h.profitLoss}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading portfolio...</p>
        )}
      </div>
    </>
  );
}
