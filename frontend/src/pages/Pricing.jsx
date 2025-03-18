import React from 'react';
import { FaRocket, FaDumbbell, FaRegLightbulb } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';

import Navbar from "/src/components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer";

import PricingHeader from '../components/Pricing/PricingHeader/PricingHeader';
import PricingPlan from '../components/Pricing/PricingPlan/PricingPlan';
import PricingTable from '../components/Pricing/PricingTable/PricingTable';
import PricingBenefits from '../components/Pricing/PricingBenefits/PricingBenefits';
import '../styles/Pricing.css';

const Pricing = () => {
  const freePlanFeatures = [
    { text: 'Log unlimited workouts', included: true },
    { text: 'Track basic calorie intake', included: true },
    { text: 'Set fitness goals & reminders', included: true },
    { text: 'Monitor sleep & water intake', included: true },
    { text: 'Access to video tutorials', included: false },
    { text: 'Advanced analytics', included: false },
  ];

  const proPlanFeatures = [
    { text: 'Advanced analytics & graphs for progress tracking', included: true },
    { text: 'Customizable calorie & workout goals', included: true },
    { text: 'Full access to video tutorials & training plans', included: true },
    { text: 'Integration with Google Fit & Apple Health', included: true },
    { text: 'No ads experience', included: true },
    { text: 'Email support', included: true },
  ];

  const premiumPlanFeatures = [
    { text: 'AI-powered meal & workout suggestions', included: true },
    { text: 'Premium fitness coaching & personalized insights', included: true },
    { text: 'Exclusive access to expert-led training videos', included: true },
    { text: '24/7 priority customer support', included: true },
    { text: 'Custom themes and premium features', included: true },
    { text: 'Priority syncing across all devices', included: true },
  ];

  const benefits = [
    {
      title: 'More Insights, More Control',
      description: 'Get advanced analytics to see real progress.'
    },
    {
      title: 'Smarter Tracking',
      description: 'AI-powered recommendations tailored to your body.'
    },
    {
      title: 'No Ads, No Distractions',
      description: 'Stay focused on your fitness.'
    },
    {
      title: 'Premium Support',
      description: 'Get priority help when you need it.'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="pricing-container">
        <PricingHeader 
          title="Pricing Plans – Choose What Fits You Best"
          description="At NutHealth, we believe that everyone should have access to tools that help them lead a healthier, more active life. That's why we offer flexible pricing plans designed to fit your fitness needs—whether you're just starting or looking for advanced features."
        />

        <div className="pricing-plans">
          <PricingPlan
            title="Free Plan"
            subtitle="Get Started for Free!"
            price="FREE"
            description="Perfect for beginners who want to track their workouts, calories, and hydration at no cost."
            features={freePlanFeatures}
            ctaText="Sign Up for Free"
            ctaLink="/signup"
            icon={<FaRegLightbulb />}
            bestFor="Casual users & those just starting their fitness journey."
            highlight={false}
          />
          
          <PricingPlan
            title="Pro Plan"
            subtitle="Unlock More Insights & Customization"
            price="$9.99"
            period="/month"
            description="For fitness enthusiasts who want deeper tracking, better insights, and no ads."
            features={proPlanFeatures}
            ctaText="Upgrade to Pro"
            ctaLink="/signup?plan=pro"
            icon={<FaDumbbell />}
            bestFor="Dedicated users who want a data-driven fitness experience."
            highlight={true}
          />
          
          <PricingPlan
            title="Premium Plan"
            subtitle="The Ultimate Fitness Experience"
            price="$19.99"
            period="/month"
            description="For those who want the best of everything with AI-powered tracking, exclusive content, and priority support."
            features={premiumPlanFeatures}
            ctaText="Go Premium Now"
            ctaLink="/signup?plan=premium"
            icon={<FaRocket />}
            bestFor="Athletes, professionals, and anyone serious about fitness."
            highlight={false}
          />
        </div>

        <PricingTable />

        <div className="pricing-why-upgrade">
          <h2><MdStars className="pricing-icon" /> Why Upgrade?</h2>
          <PricingBenefits benefits={benefits} />
          <p className="pricing-investment-note">
            ✅ Your health is an investment, not an expense. Choose the plan that works best for you and take control of your fitness journey today!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;