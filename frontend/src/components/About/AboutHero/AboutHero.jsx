import React from 'react';
import { motion } from 'framer-motion';
import './AboutHero.css';

const AboutHero = () => {
  return (
    <section className="feature-hero">
      <div className="feature-hero-container">
        <motion.h1 
          className="feature-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Ultimate Health & Fitness Companion
        </motion.h1>
        
        <motion.p 
          className="feature-hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          At NuHealth, we believe that health is a journey, not a destination. Our mission is to empower you with the right tools, insights, and motivation to take charge of your fitness, nutrition, hydration, and sleep—all in one place. Whether you're looking to lose weight, build muscle, improve endurance, or simply maintain a healthier lifestyle, we've got you covered.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;