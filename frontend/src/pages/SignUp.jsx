import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SignUpForm from "../components/Auth/SignUpForm/SignUpForm";

const SignUp = () => {
  return (
    <div className="SignUp">
      <Navbar />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUp;