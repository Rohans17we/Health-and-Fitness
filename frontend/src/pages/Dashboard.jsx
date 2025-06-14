import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHome from "../components/Dashboard/DashboardHome/DashboardHome";
import DashboardWorkout from "../components/Dashboard/DashboardWorkout/DashboardWorkout";
import DashboardFood from "../components/Dashboard/DashboardFood/DashboardFood";
import DashboardAnalytics from "../components/Dashboard/DashboardAnalytics/DashboardAnalytics";
import DashboardWater from "../components/Dashboard/DashboardWater/DashboardWater";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
      setLoading(false);
    } catch (err) {
      console.error("Error parsing user data:", err);
      setError("Invalid user data. Please log in again.");
      setLoading(false);
    }
  }, [navigate]);

  // Function to handle sidebar collapse
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Function to render the appropriate component based on the current path
  const renderDashboardContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case "/dashboard":
        return <DashboardHome user={user} />;
      case "/dashboard/workout":
        return <DashboardWorkout />;
      case "/dashboard/food":
        return <DashboardFood />;
      case "/dashboard/water":
        return <DashboardWater />;
      case "/dashboard/sleep":
        return <div className="coming-soon">Sleep Record tracking coming soon!</div>;
      case "/dashboard/analytics":
        return <DashboardAnalytics />;
      case "/dashboard/themes":
        return <div className="coming-soon">Themes customization coming soon!</div>;
      case "/dashboard/settings":
        return <div className="coming-soon">Settings coming soon!</div>;
      default:
        return <DashboardHome user={user} />;
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <button 
        className={`mobile-menu-toggle ${sidebarOpen ? 'hidden' : ''}`}
        onClick={() => setSidebarOpen(true)}
      >
      </button>
      
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <Sidebar 
        user={user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onCollapse={handleSidebarCollapse}
        collapsed={sidebarCollapsed}
      />
      
      <div className={`dashboard-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="dashboard-right-side">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;