import React from 'react';
import './PricingHeader.css';

const PricingHeader = ({ title, description }) => {
  return (
    <div className="pricing-header">
      <h1 className="pricing-title">💲 {title}</h1>
      <p className="pricing-description">{description}</p>
    </div>
  );
};

export default PricingHeader;