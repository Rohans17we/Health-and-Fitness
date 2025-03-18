import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ArticleCard from "../components/Blog/ArticleCard/ArticleCard";
import FeaturedArticle from "../components/Blog/FeaturedArticle/FeaturedArticle";
import SubscribeForm from "../components/Blog/SubscribeForm/SubscribeForm";
import '../styles/Blog.css';

const Blog = () => {
  const featuredArticle = {
    title: "How to Stay Consistent with Your Fitness Goals - The 30-Day Challenge",
    date: "March 2025",
    category: "Motivation & Productivity",
    description: "Consistency is the key to fitness success, but staying motivated can be tough. That's why we created the 30-Day Fitness Challenge—a simple yet powerful method to build lasting habits.",
    points: [
      "The Psychology Behind Habit Formation - Why most people quit and how you can stay on track.",
      "How to Overcome Common Barriers - Lack of time, low energy, and distractions.",
      "The Power of Small Wins - How short, consistent efforts lead to big results.",
      "Custom 30-Day Workout & Nutrition Plan - Tailored for beginners, intermediate, and advanced levels."
    ],
    bonus: "Download our FREE 30-Day Fitness Planner to track your progress!",
    link: "/blog/fitness-consistency-challenge"
  };

  const articles = [
    {
      id: 1,
      title: "The Ultimate Guide to Balanced Nutrition – Eat Smart, Live Strong!",
      date: "March 2025",
      category: "Nutrition",
      description: "Nutrition is more than just counting calories—it's about fueling your body with the right nutrients for optimal performance and health. In this in-depth guide, we explore:",
      points: [
        "The role of proteins, carbs, and fats in your diet.",
        "How to create a meal plan tailored to your fitness goals.",
        "The truth about processed foods, sugar, and artificial ingredients.",
        "Easy & healthy meal ideas to keep you energized throughout the day."
      ],
      link: "/blog/balanced-nutrition-guide",
      icon: "🥗"
    },
    {
      id: 2,
      title: "Strength Training vs. Cardio – Which One Should You Prioritize?",
      date: "March 2025",
      category: "Workouts",
      description: "If you've ever wondered whether lifting weights or running on a treadmill is better for your fitness, you're not alone! In this article, we break down the science behind strength training and cardiovascular exercise, including:",
      points: [
        "How strength training boosts metabolism and builds muscle.",
        "The benefits of cardio for heart health and fat loss.",
        "Finding the right balance based on your goals (fat loss, muscle gain, endurance).",
        "Example workout plans that combine both effectively."
      ],
      bonus: "Sample 3-day & 5-day workout routines for beginners and advanced athletes!",
      link: "/blog/strength-vs-cardio",
      icon: "🏋️‍♂️"
    },
    {
      id: 3,
      title: "Hydration Myths Busted – How Much Water Do You Really Need?",
      date: "March 2025",
      category: "Hydration",
      description: "We always hear \"Drink 8 glasses of water a day\", but is that really enough? In this myth-busting article, we discuss:",
      points: [
        "How to calculate your ideal daily water intake based on weight & activity level.",
        "The effects of dehydration on workouts, brain function, and metabolism.",
        "Signs you're not drinking enough water (beyond just feeling thirsty).",
        "Smart hydration habits to improve digestion, skin health, and energy levels."
      ],
      tip: "Learn how to use our Water Intake Tracker to stay hydrated effortlessly!",
      link: "/blog/hydration-myths",
      icon: "💧"
    },
    {
      id: 4,
      title: "Sleep & Recovery – The Secret Weapon to Better Performance",
      date: "March 2025",
      category: "Sleep & Recovery",
      description: "Did you know that lack of sleep can hinder weight loss, muscle growth, and mental clarity? Sleep is just as important as exercise and nutrition for overall well-being. In this article, we cover:",
      points: [
        "The connection between sleep and muscle recovery.",
        "How poor sleep affects weight gain and metabolism.",
        "Proven strategies to improve sleep quality (bedtime routines, avoiding blue light, etc.).",
        "How our Sleep Tracking Feature can help you optimize your rest."
      ],
      bonus: "A 7-day Sleep Challenge to help you establish a healthier sleep schedule!",
      link: "/blog/sleep-recovery",
      icon: "😴"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="HealthBlog-container">
        <div className="HealthBlog-hero">
          <div className="HealthBlog-hero-content">
            <h1 className="HealthBlog-title">Blog Page – Your Go-To Source for Health & Fitness Insights</h1>
            <p className="HealthBlog-description">
              Welcome to the NutHealth Blog, where we bring you the latest health tips, workout advice, and nutrition insights to help you stay on track with your fitness journey. Whether you're looking to burn fat, build muscle, improve sleep, or stay hydrated, our expert-backed content has you covered.
            </p>
            <p className="HealthBlog-tagline">
              Stay informed, stay inspired, and take control of your health!
            </p>
          </div>
        </div>

        <div className="HealthBlog-content">
          <section className="HealthBlog-featured-section">
            <h2 className="HealthBlog-section-title">Featured Article</h2>
            <FeaturedArticle article={featuredArticle} />
          </section>

          <section className="HealthBlog-articles-section">
            <h2 className="HealthBlog-section-title">Latest Articles & Insights</h2>
            <div className="HealthBlog-articles-grid">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <section className="HealthBlog-cta-section">
            <div className="HealthBlog-cta-content">
              <h2 className="HealthBlog-cta-title">More Health & Fitness Tips Await You!</h2>
              <p className="HealthBlog-cta-text">
                We update our blog weekly with expert advice, in-depth guides, and actionable tips. Whether you're a beginner or a fitness pro, there's something for everyone.
              </p>
              <SubscribeForm />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;