import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginForm from "../components/Auth/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="Login">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;