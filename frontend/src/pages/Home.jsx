import Hero from "../components/LandingPage/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LandingPageReviews from "../components/LandingPage/LandingPageReviews/LandingPageReviews";
import LandingPageFeatures from "../components/LandingPage/LandingPageFeatures/LandingPageFeatures";
import LandingPageDownloadApp from "../components/LandingPage/LandingPageDownloadApp/LandingPageDownloadApp";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <LandingPageFeatures />
      <LandingPageReviews />
      <LandingPageDownloadApp />
      <Footer />
    </div>
  );
};

export default Home;