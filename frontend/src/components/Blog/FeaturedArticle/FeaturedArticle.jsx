import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFolder, FaArrowRight, FaDownload, FaStar, FaBookmark } from 'react-icons/fa';
import './FeaturedArticle.css';

const FeaturedArticle = ({ article }) => {
  return (
    <div className="HealthBlog-featured-article">
      <div className="HealthBlog-featured-badge">
        <FaStar /> Featured
      </div>
      
      <div className="HealthBlog-featured-content">
        <h3 className="HealthBlog-featured-title">
          <span className="HealthBlog-featured-title-text">{article.title}</span>
        </h3>
        
        <div className="HealthBlog-featured-meta">
          <span className="HealthBlog-featured-date">
            <FaCalendarAlt className="HealthBlog-featured-icon" /> 
            <span>Published: {article.date}</span>
          </span>
          <span className="HealthBlog-featured-category">
            <FaFolder className="HealthBlog-featured-icon" /> 
            <span>Category: {article.category}</span>
          </span>
          <span className="HealthBlog-featured-bookmark">
            <FaBookmark className="HealthBlog-featured-icon" />
            <span>Save for later</span>
          </span>
        </div>
        
        <p className="HealthBlog-featured-description">{article.description}</p>
        
        <div className="HealthBlog-featured-points">
          <h4 className="HealthBlog-featured-points-title">What You'll Learn in This Guide:</h4>
          <ul className="HealthBlog-featured-points-list">
            {article.points.map((point, index) => (
              <li key={index} className="HealthBlog-featured-point">
                <span className="HealthBlog-featured-check">✓</span>
                <span className="HealthBlog-featured-point-text">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {article.bonus && (
          <div className="HealthBlog-featured-bonus">
            <div className="HealthBlog-featured-bonus-icon">
              <FaDownload />
            </div>
            <div className="HealthBlog-featured-bonus-content">
              <strong>Bonus:</strong> {article.bonus}
            </div>
          </div>
        )}
        
        <div className="HealthBlog-featured-actions">
          <Link to={article.link} className="HealthBlog-featured-link">
            <span>Read Full Article</span> <FaArrowRight className="HealthBlog-featured-link-icon" />
          </Link>
          <div className="HealthBlog-featured-reading-time">
            <span>10 min read</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

// Example usage
const articleData = {
  title: "10 Essential Nutrition Tips for a Healthier Lifestyle",
  date: "June 15, 2023",
  category: "Nutrition",
  description: "Discover the key nutritional strategies that can transform your health and help you achieve your fitness goals faster.",
  points: [
    "Understanding macronutrients and their role in your diet",
    "How to balance your plate for optimal nutrition",
    "The importance of meal timing for energy and recovery",
    "Hydration strategies for better performance"
  ],
  bonus: "Download our free meal planning template",
  link: "/blog/nutrition-tips"
};

export default function App() {
  return <FeaturedArticle article={articleData} />;
}