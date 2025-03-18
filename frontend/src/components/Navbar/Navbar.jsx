import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/">NuHealth</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
      </ul>

      {/* Login Buttons */}
      <div className="nav-buttons">
        <Link to="/signup">
          <button className="btn-outline">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn-primary">Login</button>
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(true)}>
        <FaBars size={28} />
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div 
              className="close-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes size={32} />
            </motion.div>

            <motion.ul 
              className="mobile-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              {["Home", "About us", "Blog", "Pricing"].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5, duration: 1.0 }}
                >
                  <Link to={`/${item.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>
                    {item}
                  </Link>
                </motion.li>
              ))}
              
              {/* Mobile Login/Signup Buttons */}
              <motion.div 
                className="mobile-auth-buttons"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1.0 }}
              >
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="mobile-btn-outline">Sign Up</button>
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="mobile-btn-primary">Login</button>
                </Link>
              </motion.div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;