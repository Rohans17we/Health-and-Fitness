import React from 'react';
import './LandingPageReviews.css';

const LandingPageReviews = () => {
  const testimonials = [
    {
      id: 1,
      text: "I've tried countless fitness apps, but this one is a game-changer. The personalized workout plans keep me motivated, and I love the real-time feedback from my virtual coach. My fitness journey has never been smoother!",
      name: "Sarah L",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      text: "The meal plans are fantastic! I finally have a diet that fits my lifestyle and helps me reach my goals. Plus, tracking my progress is so easy with the app's intuitive interface.",
      name: "James R",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      text: "I appreciate how secure my data is with this app. It's not just about the workouts; it's about feeling confident that my information is protected while I focus on my fitness goals.",
      name: "John P",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 4,
      text: "As a busy professional, I needed a fitness app that could adapt to my schedule. The flexible workout plans and easy-to-follow routines fit perfectly into my life. Highly recommend!",
      name: "Michael B",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: 5,
      text: "The integration with my smartwatch is seamless, and I love seeing my progress in real-time. The expert tips and personalized advice have made a huge difference in my workouts.",
      name: "Lisa T",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      id: 6,
      text: "This app transformed how I approach fitness. The community support is amazing, and the challenges keep me engaged. I've never felt more motivated to stay on track with my health goals!",
      name: "Emily K",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-heading">What our happy user says</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img 
                  className="author-avatar" 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                />
                <span className="author-name">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageReviews;