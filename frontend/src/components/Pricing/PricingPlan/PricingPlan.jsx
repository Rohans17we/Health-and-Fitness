import React from 'react';
import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PricingPlan.css';

const PricingPlan = ({ 
  title, 
  subtitle, 
  price, 
  period = "", 
  description, 
  features,  
  ctaText, 
  ctaLink, 
  icon, 
  bestFor,
  highlight 
}) => {
  return (
    <div className={`pricing-plan ${highlight ? 'pricing-plan-highlight' : ''}`}>
      {highlight && <div className="pricing-plan-ribbon">Most Popular</div>}
      
      <div className="pricing-plan-header">
        <h2 className="pricing-plan-title">{title}</h2>
        <p className="pricing-plan-subtitle">{subtitle}</p>
      </div>
      
      <div className="pricing-plan-price">
        <span className="pricing-amount">{price}</span>
        <span className="pricing-period">{period}</span>
      </div>
      
      <p className="pricing-plan-description">{description}</p>
      
      <ul className="pricing-plan-features">
        {features.map((feature, index) => (
          <li key={index} className={feature.included ? 'feature-included' : 'feature-excluded'}>
            {feature.included ? 
              <FaCheck size={"1.4rem"} className="included" /> : 
              <FaTimes size={"1.4rem"}  className="excluded" />
            }
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <div className="pricing-plan-best-for">
        <strong>💡 Best for:</strong> {bestFor}
      </div>
      
      <Link to={ctaLink} className="pricing-plan-cta">
        <span>{ctaText}</span> <FaArrowRight className="cta-arrow" />
      </Link>
    </div>
  );
};

export default PricingPlan;