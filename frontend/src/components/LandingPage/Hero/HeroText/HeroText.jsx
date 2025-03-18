import "./HeroText.css";
import { motion } from "framer-motion";

const HeroText = () => {
  return (
    <div className="hero-text">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Your One-Stop Health <br /> and Fitness Buddy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        Track daily routines, assess health, and experiment with training plans all while 
        managing your smart fitness gear.
      </motion.p>

      <motion.button
        className="cta-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        Get Started →
      </motion.button>
    </div>
  );
};

export default HeroText;