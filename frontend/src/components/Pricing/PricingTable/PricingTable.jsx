import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './PricingTable.css'; 

const PricingTable = () => {
  const features = [
    { name: 'Workout & Exercise Logging', free: 'Unlimited Logging', pro: 'Unlimited Logging', premium: 'Unlimited Logging' },
    { name: 'Calorie & Nutrition Tracking', free: 'Basic Logging', pro: 'Macro & Goal-Based', premium: 'AI Meal Suggestions' },
    { name: 'Water & Sleep Tracking', free: 'Basic Logging', pro: 'Smart Hydration Reminders', premium: 'Sleep Optimization Insights' },
    { name: 'Goal Setting & Reminders', free: 'Standard Goals', pro: 'Customizable Goals', premium: 'AI-Generated Plans' },
    { name: 'Workout Video Tutorials', free: false, pro: true, premium: 'Premium Content & Coaching' },
    { name: 'Fitness Analytics & Insights', free: 'Basic Stats', pro: 'Advanced Graphs', premium: 'AI-Powered Insights' },
    { name: 'Dark Mode & Custom Themes', free: false, pro: true, premium: 'Premium Themes' },
    { name: 'Integration with Google Fit & Apple Health', free: false, pro: true, premium: 'Priority Syncing' },
    { name: 'Ad-Free Experience', free: false, pro: true, premium: 'No Ads + Exclusive Content' },
    { name: 'Exclusive 24/7 Support', free: 'Community Support', pro: 'Email Support', premium: 'Priority Support & Live Chat' },
    { name: 'Price', free: 'FREE', pro: '$9.99/month', premium: '$19.99/month' }
  ];

  return (
    <div className="pricing-table-container">
      <h2 className="pricing-table-title">Plan Comparison</h2>
      <div className="pricing-table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>Free Plan 🎉</th>
              <th>Pro Plan 💪</th>
              <th>Premium Plan 🚀</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td>{feature.name}</td>
                <td>
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? <FaCheck className="check-icon" /> : <FaTimes className="times-icon" />
                  ) : (
                    feature.free
                  )}
                </td>
                <td>
                  {typeof feature.pro === 'boolean' ? (
                    feature.pro ? <FaCheck className="check-icon" /> : <FaTimes className="times-icon" />
                  ) : (
                    feature.pro
                  )}
                </td>
                <td>
                  {typeof feature.premium === 'boolean' ? (
                    feature.premium ? <FaCheck className="check-icon" /> : <FaTimes className="times-icon" />
                  ) : (
                    feature.premium
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;