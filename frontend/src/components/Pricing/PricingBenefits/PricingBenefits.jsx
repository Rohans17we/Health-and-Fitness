import React from 'react';
import './PricingBenefits.css';

const PricingBenefits = ({ benefits }) => {
  return (
    <div className="pricing-benefits">
      {benefits.map((benefit, index) => (
        <div key={index} className="pricing-benefit">
          <h3>🔹 {benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PricingBenefits;