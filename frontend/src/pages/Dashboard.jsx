import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHome from "../components/Dashboard/DashboardHome/DashboardHome";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        // Check if the API endpoint is correct - make sure it matches your backend route
        // You might need to adjust this URL based on your actual backend API structure
        const response = await fetch("http://localhost:5057/api/User/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response status:", response.status); // Log the response status

        if (!response.ok) {
          // Try to get more detailed error information
          const errorText = await response.text();
          console.error("API Error response:", errorText);
          throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
        }

        // Get the basic user data from the backend
        const basicUserData = await response.json();
        console.log("User data received:", basicUserData);
        
        // Create an enhanced user object with the available data
        // and default values for missing fields
        const enhancedUser = {
          // Data we know is available from backend - check property names!
          // If your backend returns properties with capital first letters (e.g., FirstName),
          // make sure to use those exact property names here
          id: basicUserData.Id || basicUserData.id || 0,
          firstName: basicUserData.FirstName || basicUserData.firstName || "User",
          lastName: basicUserData.LastName || basicUserData.lastName || "",
          email: basicUserData.Email || basicUserData.email || "N/A",
          
          // Default values for fields not provided by backend
          fitnessGoal: "N/A",
          activityLevel: "N/A",
          healthMetrics: {
            heartRate: "N/A",
            steps: "N/A",
            caloriesBurned: "N/A"
          },
          waterIntake: {
            current: 0,
            goal: 2.5
          },
          nutrition: {
            calories: {
              current: 0,
              goal: 2200
            },
            protein: {
              current: 0,
              goal: 120
            },
            carbs: {
              current: 0,
              goal: 250
            },
            fat: {
              current: 0,
              goal: 70
            }
          },
          activityData: [],
          recentActivities: [],
          weight: "N/A",
          height: "N/A",
          bmi: "N/A",
          bodyFat: "N/A",
          goalWeight: "N/A"
        };
        
        setUser(enhancedUser);
      } catch (error) {
        console.error("Profile fetch error:", error);
        // Create a minimal user object with default values
        setUser({
          id: 0,
          firstName: "Guest",
          lastName: "",
          email: "N/A",
          fitnessGoal: "N/A",
          activityLevel: "N/A",
          healthMetrics: {
            heartRate: "N/A",
            steps: "N/A",
            caloriesBurned: "N/A"
          },
          waterIntake: {
            current: 0,
            goal: 2.5
          },
          nutrition: {
            calories: {
              current: 0,
              goal: 2200
            },
            protein: {
              current: 0,
              goal: 120
            },
            carbs: {
              current: 0,
              goal: 250
            },
            fat: {
              current: 0,
              goal: 70
            }
          },
          activityData: [],
          recentActivities: [],
          weight: "N/A",
          height: "N/A",
          bmi: "N/A",
          bodyFat: "N/A",
          goalWeight: "N/A"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // ✅ Handle Sidebar for Window Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
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
          <DashboardHome user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;