import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/compte"); 
    }
  }, [navigate, role, token]);

  return <div>Bienvenue sur le tableau de bord Admin !</div>;
};

export default AdminDashboard;
