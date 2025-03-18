import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFolder, FaArrowRight, FaDownload, FaLightbulb } from 'react-icons/fa';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="HealthBlog-article-card">
      <div className="HealthBlog-article-number">{article.id}</div>
      
      <h3 className="HealthBlog-article-title">{article.title}</h3>
      
      <div className="HealthBlog-article-meta">
        <span className="HealthBlog-article-date">
          <FaCalendarAlt /> {article.date}
        </span>
        <span className="HealthBlog-article-category">
          <FaFolder /> {article.category}
        </span>
      </div>
      
      <p className="HealthBlog-article-description">{article.description}</p>
      
      <ul className="HealthBlog-article-points">
        {article.points.map((point, index) => (
          <li key={index} className="HealthBlog-article-point">
            <span className="HealthBlog-article-check">✓</span> {point}
          </li>
        ))}
      </ul>
      
      {article.bonus && (
        <div className="HealthBlog-article-bonus">
          <FaDownload /> <strong>Bonus:</strong> {article.bonus}
        </div>
      )}
      
      {article.tip && (
        <div className="HealthBlog-article-tip">
          <FaLightbulb /> <strong>Pro Tip:</strong> {article.tip}
        </div>
      )}
      
      <Link to={article.link} className="HealthBlog-article-link">
        Read More <FaArrowRight />
      </Link>
    </div>
  );
};

export default ArticleCard;