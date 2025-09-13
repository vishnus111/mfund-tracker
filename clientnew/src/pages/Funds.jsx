import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Funds() {
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFunds = async () => {
    try {
      const res = await API.get(`/funds?search=${search}&page=${page}&limit=10`);
      if (res.data.success) {
        setFunds(res.data.data.funds);
        setTotalPages(res.data.data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFunds();
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFunds();
  };

  const addToPortfolio = async (schemeCode) => {
    const units = prompt("Enter number of units to add:");
    if (!units || isNaN(units) || units <= 0) return;
    try {
      const res = await API.post("/portfolio/add", { schemeCode, units: parseFloat(units) });
      alert(res.data.message || "Added successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add fund");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Search Mutual Funds</h3>
        <form className="flex mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 p-2 rounded-l bg-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-yellow-500 px-4 rounded-r hover:bg-yellow-600">Search</button>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-yellow-400">
              <tr>
                <th className="p-2">Code</th>
                <th className="p-2">Name</th>
                <th className="p-2">Fund House</th>
                <th className="p-2">Category</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {funds.map((fund) => (
                <tr key={fund.schemeCode} className="border-b border-gray-700">
                  <td className="p-2">{fund.schemeCode}</td>
                  <td className="p-2">{fund.schemeName}</td>
                  <td className="p-2">{fund.fundHouse}</td>
                  <td className="p-2">{fund.schemeCategory}</td>
                  <td className="p-2">
                    <button
                      className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                      onClick={() => addToPortfolio(fund.schemeCode)}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="text-yellow-400">Page {page} of {totalPages}</span>
          <button
            className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
