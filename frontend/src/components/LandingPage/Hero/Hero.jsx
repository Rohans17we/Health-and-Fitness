import "./Hero.css";
import HeroText from "./HeroText/HeroText";
import HeroWidget from "./HeroWidget/HeroWidget.jsx";
import HeroScrollBar from "./HeroScrollBar/HeroScrollBar";

const Hero = () => {
  return (
    <div className="hero">
      <HeroText />
      <HeroWidget />
      <HeroScrollBar />
    </div>
  );
};

export default Hero;