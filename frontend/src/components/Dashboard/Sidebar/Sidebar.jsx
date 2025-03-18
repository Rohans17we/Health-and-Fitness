// Update the Sidebar component to accept isOpen prop
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaDumbbell, 
  FaUtensils, 
  FaWater, 
  FaBed, 
  FaChartLine, 
  FaPalette, 
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ user, isOpen, onClose }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = window.innerWidth <= 768;

  // Add this function to handle sidebar close
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Log Workout", icon: <FaDumbbell />, path: "/dashboard/workout" },
    { name: "Log Food", icon: <FaUtensils />, path: "/dashboard/food" },
    { name: "Water Intake", icon: <FaWater />, path: "/dashboard/water" },
    { name: "Sleep Record", icon: <FaBed />, path: "/dashboard/sleep" },
    { name: "Analytics", icon: <FaChartLine />, path: "/dashboard/analytics" },
    { name: "Themes", icon: <FaPalette />, path: "/dashboard/themes" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className={`sidebar ${collapsed && !isMobile ? "collapsed" : ""} ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {collapsed && !isMobile ? "NH" : "NuHealth"}
        </div>
        {isMobile ? (
          <button className="sidebar-close" onClick={handleClose}>
            <FaTimes />
          </button>
        ) : (
          <button 
            className="sidebar-toggle" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </button>
        )}
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <div className="sidebar-icon">{item.icon}</div>
            {(!collapsed || isMobile) && <span className="sidebar-text">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-icon">
            <FaUser />
          </div>
          {(!collapsed || isMobile) && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.firstName || "User"}</div>
              <div className="sidebar-user-email">{user?.email || "user@example.com"}</div>
            </div>
          )}
        </div>

        <div className="sidebar-actions">
          <Link to="/dashboard/settings" className="sidebar-action-item">
            <FaCog />
            {(!collapsed || isMobile) && <span>Settings</span>}
          </Link>
          <button onClick={handleLogout} className="sidebar-action-item">
            <FaSignOutAlt />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;