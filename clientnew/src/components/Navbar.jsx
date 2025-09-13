import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-md px-6 py-3 flex justify-between items-center">
      <Link className="text-yellow-400 font-bold text-xl" to="/dashboard">
        MF Tracker
      </Link>
      <div className="flex space-x-4">
        <Link className="hover:text-yellow-400" to="/dashboard">Portfolio</Link>
        <Link className="hover:text-yellow-400" to="/funds">Funds</Link>
        <button
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
