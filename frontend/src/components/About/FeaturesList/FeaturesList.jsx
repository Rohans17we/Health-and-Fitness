import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaAppleAlt, FaChartLine, FaWater, FaBed, FaBullseye, FaCog, FaLock } from 'react-icons/fa';
import './FeaturesList.css';

const FeaturesList = () => {
  const features = [
    {
      id: 1,
      icon: <FaDumbbell />,
      title: "Smart Workout Tracking",
      items: [
        "Log daily workouts (Strength, Cardio, Yoga & more)",
        "Track reps, sets, duration, and calories burned",
        "View progress history & performance insights"
      ]
    },
    {
      id: 2,
      icon: <FaAppleAlt />,
      title: "Personalized Nutrition & Calorie Management",
      items: [
        "Log daily meals & calorie intake",
        "Set custom calorie goals (Lose, Maintain, Gain)",
        "Get macro breakdowns (Proteins, Carbs, Fats)"
      ]
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: "Advanced Fitness Analytics",
      items: [
        "Visualize calories burned vs. consumed",
        "Monitor workout progress over time",
        "Weight tracking to see real results"
      ]
    },
    {
      id: 4,
      icon: <FaWater />,
      title: "Hydration Tracking",
      items: [
        "Set daily water intake goals",
        "Get reminders to stay hydrated",
        "Track your progress throughout the day"
      ]
    },
    {
      id: 5,
      icon: <FaBed />,
      title: "Sleep Tracking for Recovery",
      items: [
        "Log sleep duration & quality",
        "Get insights into your sleep trends",
        "Receive personalized recommendations"
      ]
    },
    {
      id: 6,
      icon: <FaBullseye />,
      title: "Smart Goal Setting & Reminders",
      items: [
        "Define your fitness milestones",
        "Get reminders for workouts, meals & hydration",
        "Stay consistent & motivated"
      ]
    },
    {
      id: 7,
      icon: <FaCog />,
      title: "Intuitive & Personalized Experience",
      items: [
        "Choose between Light & Dark Mode",
        "Customize measurement units (Kg/Lbs, Km/Miles)",
        "Designed to be simple, clean, and responsive"
      ]
    },
    {
      id: 8,
      icon: <FaLock />,
      title: "Secure & Private – Your Data, Your Control",
      items: [
        "JWT-based authentication",
        "Encrypted data storage",
        "User privacy controls"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="features-list-section">
      <div className="features-container">
        <div className="features-intro">
          <motion.h2 
            className="features-intro-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🔥 What We Offer?
          </motion.h2>
          <motion.p 
            className="features-intro-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We've packed everything you need into a seamless, data-driven experience:
          </motion.p>
        </div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="feature-card-header">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
              </div>
              <ul className="feature-list">
                {feature.items.map((item, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-check">✔</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesList;