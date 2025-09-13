import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Funds from "./pages/Funds.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Portfolios from "./pages/admin/Portfolios";
import PopularFunds from "./pages/admin/PopularFunds";
import Stats from "./pages/admin/Stats";


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/funds" element={<Funds />} />

        {/* admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/portfolios" element={<Portfolios />} />
        <Route path="/admin/popular-funds" element={<PopularFunds />} />
        <Route path="/admin/stats" element={<Stats />} />
      </Routes>
   
  );
}

export default App;
