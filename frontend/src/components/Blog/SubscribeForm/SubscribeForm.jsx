import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import './SubscribeForm.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    setIsSubmitted(true);
    setEmail('');
    
    // Reset the success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="HealthBlog-subscribe">
      <div className="HealthBlog-subscribe-header">
        <FaBell className="HealthBlog-subscribe-icon" />
        <h3 className="HealthBlog-subscribe-title">Subscribe Now</h3>
      </div>
      <p className="HealthBlog-subscribe-text">
        Get exclusive health tips, workout plans, and motivation straight to your inbox!
      </p>
      
      {isSubmitted ? (
        <div className="HealthBlog-subscribe-success">
          Thanks for subscribing! You'll receive our next update soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="HealthBlog-subscribe-form">
          <div className="HealthBlog-form-group">
            <FaEnvelope className="HealthBlog-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="HealthBlog-subscribe-input"
            />
          </div>
          <button type="submit" className="HealthBlog-subscribe-button">
            Join Our Community <FaArrowRight />
          </button>
        </form>
      )}
    </div>
  );
};

export default SubscribeForm;