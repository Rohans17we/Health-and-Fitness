import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHome from "../components/Dashboard/DashboardHome/DashboardHome";

import "../styles/Dashboard.css";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) {
      alert("❌ Session expired. Please log in again.");
      localStorage.clear();
      navigate("/login");
    } else {
      setUser(userData);
      setLoading(false);
    }
    
    // Close sidebar on mobile by default
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
    
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your health data...</div>;
  }

  return (
    <div className="Dashboard-container">
      <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
        {isMobile && sidebarOpen && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}
        

        
        <Sidebar user={user} isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        {isMobile && !sidebarOpen && (
          <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
      
        <div className="Dashboard-right-side">
          <DashboardHome/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;