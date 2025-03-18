import React from 'react';
import { motion } from 'framer-motion';
import './AboutWhy.css';

const FeatureWhy = () => {
  return (
    <section className="feature-why-section">
      <div className="feature-why-container">
        <motion.h2 
          className="feature-why-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌟 Why We Built This?
        </motion.h2>
        
        <motion.div 
          className="feature-why-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="feature-why-text">
            We understand how challenging it can be to stay on top of your health goals. From tracking workouts to monitoring calorie intake, staying hydrated, and ensuring quality sleep, managing all aspects of fitness can feel overwhelming.
          </p>
          <p className="feature-why-text">
            That's why we created NuHealth—a powerful yet easy-to-use fitness tracking solution designed for real people with real goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureWhy;