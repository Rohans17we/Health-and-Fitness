import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import AboutHero from '../components/About/AboutHero/AboutHero.jsx';
import AboutWhy from '../components/About/AboutWhy/AboutWhy.jsx';
import FeaturesList from '../components/About/FeaturesList/FeaturesList.jsx';
import AboutCTA from '../components/About/AboutCTA/AboutCTA.jsx';
// Removed the single CSS import

const Features = () => {
  return (
    <div className="features-page">
      <Navbar />
      <AboutHero />
      <AboutWhy />
      <FeaturesList />
      <AboutCTA />
      <Footer />
    </div>
  );
};

export default Features;