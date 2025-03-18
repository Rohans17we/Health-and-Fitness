import "./HeroScrollBar.css";
import { motion } from "framer-motion";

const activities = [
  "CYCLING", "RUNNING", "WALKING", "HIKING", "TRAINING", "YOGA", 
  "CYCLING", "RUNNING", "WALKING", "HIKING", "TRAINING", "YOGA"
];

const HeroScrollBar = () => {
  return (
    <div className="scroll-container">
      <motion.div
        className="scroll-content"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {activities.map((activity, index) => (
          <span key={index} className="scroll-item">● {activity} ●</span>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroScrollBar;