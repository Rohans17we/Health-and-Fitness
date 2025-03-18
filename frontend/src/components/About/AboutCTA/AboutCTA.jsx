import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutCTA.css';

const AboutCTA = () => {
  return (
    <section className="features-cta-section">
      <div className="features-cta-container">
        <motion.h2 
          className="features-cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Fitness Journey?
        </motion.h2>
        
        <motion.p 
          className="features-cta-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join thousands of users who have already taken control of their health and fitness goals with NutHealth. Start your journey today!
        </motion.p>
        
        <motion.div 
          className="features-cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/signup" className="cta-button-primary">
            Get Started Free
          </Link>
          <Link to="/pricing" className="cta-button-secondary">
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;