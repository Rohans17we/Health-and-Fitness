import { Routes, Route } from 'react-router-dom';
import DarkModeButton from './components/DarkModeButton/DarkModeButton.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import Pricing from './pages/Pricing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <DarkModeButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;