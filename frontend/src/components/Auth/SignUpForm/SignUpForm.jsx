import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUpForm.css';


// Calculate the date for 18 years ago
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 16);

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .matches(/^[A-Za-z\s]+$/, 'First name should only contain letters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .matches(/^[A-Za-z\s]+$/, 'Last name should only contain letters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least 1 number and 1 special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  dateOfBirth: Yup.date()
    .max(eighteenYearsAgo, 'You must be at least 16 years old')
    .nullable(),
  gender: Yup.string(),
  height: Yup.number()
    .positive('Height must be positive')
    .nullable(),
  weight: Yup.number()
    .positive('Weight must be positive')
    .nullable(),
  fitnessGoal: Yup.string(),
  activityLevel: Yup.string(),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  receiveNotifications: Yup.boolean(),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationMessage, setValidationMessage] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
  
    const requestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      PasswordHash: values.password,
      dateOfBirth: values.dateOfBirth || null,
      gender: values.gender || null,
      height: values.height || null,
      weight: values.weight || null,
      fitnessGoal: values.fitnessGoal || null,
      activityLevel: values.activityLevel || null,
      receiveNotifications: values.receiveNotifications,
      termsAccepted: values.termsAccepted,
    };
  
    try {
      const response = await fetch("http://localhost:5057/api/User/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const responseData = await response.text(); 
  
      if (response.ok) {
        alert("✅ You have registered successfully! Please LogIn to Continue.");
        navigate("/login");
      } else {
        // ✅ Handle duplicate email message
        if (responseData.includes("Email is already in use")) {
          alert("❌ This email is already registered. Please use a different email.");
        } else {
          alert("❌ Registration failed: " + responseData);
        }
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  
    setSubmitting(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    setShowValidationMessage(false);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setShowValidationMessage(false);
  };

  const validateAndProceed = (errors, touched, values) => {
    if (currentStep === 1) {
      if (!values.firstName || !values.lastName || !values.email || !values.password || !values.confirmPassword) {
        setValidationMessage('Please fill in all required fields before proceeding.');
        setShowValidationMessage(true);
        return;
      }
      
      if (errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword) {
        setValidationMessage('Please correct the errors before proceeding.');
        setShowValidationMessage(true);
        return;
      }
    } else if (currentStep === 2) {
      // For step 2, we only validate dateOfBirth if it's provided
      if (values.dateOfBirth && errors.dateOfBirth) {
        setValidationMessage('You must be at least 18 years old to register.');
        setShowValidationMessage(true);
        return;
      }
    }
    
    nextStep();
  };

  return (
    <div className="SignUpForm-container">
      <div className="SignUpForm-wrapper">
        <h2 className="SignUpForm-title">Create Your Account</h2>
        <p className="SignUpForm-subtitle">Start your fitness journey today</p>
        
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
            gender: '',
            height: '',
            weight: '',
            fitnessGoal: '',
            activityLevel: '',
            termsAccepted: false,
            receiveNotifications: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="SignUpForm-form">
              {currentStep === 1 && (
                <div className="SignUpForm-step">
                  <h3 className="SignUpForm-stepTitle">Basic Information</h3>
                  
                  <div className="SignUpForm-row">
                    <div className="SignUpForm-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={`SignUpForm-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                        placeholder="Enter your first name"
                      />
                      <ErrorMessage name="firstName" component="div" className="SignUpForm-errorMessage" />
                    </div>
                    
                    <div className="SignUpForm-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={`SignUpForm-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                        placeholder="Enter your last name"
                      />
                      <ErrorMessage name="lastName" component="div" className="SignUpForm-errorMessage" />
                    </div>
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`SignUpForm-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="SignUpForm-errorMessage" />
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="password">Password</label>
                    <div className="SignUpForm-passwordField">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className={`SignUpForm-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        placeholder="Create a password"
                      />
                      <button 
                        type="button" 
                        className="SignUpForm-passwordToggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="SignUpForm-errorMessage" />
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="SignUpForm-passwordField">
                      <Field
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`SignUpForm-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
                      />
                      <button 
                        type="button" 
                        className="SignUpForm-passwordToggle"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="SignUpForm-errorMessage" />
                  </div>
                  
                  <div className={`SignUpForm-validationMessage ${showValidationMessage ? 'visible' : ''}`}>
                    {validationMessage}
                  </div>
                  
                  <button 
                    type="button" 
                    className="SignUpForm-nextButton" 
                    onClick={() => validateAndProceed(errors, touched, values)}
                  >
                    Next
                  </button>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="SignUpForm-step">
                  <h3 className="SignUpForm-stepTitle">Fitness Details</h3>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className={`SignUpForm-control ${errors.dateOfBirth && touched.dateOfBirth ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="SignUpForm-errorMessage" />
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label>Gender</label>
                    <div className="SignUpForm-radioGroup">
                      <label className="SignUpForm-radioLabel">
                        <Field type="radio" name="gender" value="male" />
                        Male
                      </label>
                      <label className="SignUpForm-radioLabel">
                        <Field type="radio" name="gender" value="female" />
                        Female
                      </label>
                      <label className="SignUpForm-radioLabel">
                        <Field type="radio" name="gender" value="other" />
                        Other
                      </label>
                    </div>
                  </div>
                  
                  <div className="SignUpForm-row">
                    <div className="SignUpForm-group">
                      <label htmlFor="height">Height (cm)</label>
                      <Field
                        type="number"
                        name="height"
                        id="height"
                        className={`SignUpForm-control ${errors.height && touched.height ? 'is-invalid' : ''}`}
                        placeholder="Enter your height"
                      />
                      <ErrorMessage name="height" component="div" className="SignUpForm-errorMessage" />
                    </div>
                    
                    <div className="SignUpForm-group">
                      <label htmlFor="weight">Weight (kg)</label>
                      <Field
                        type="number"
                        name="weight"
                        id="weight"
                        className={`SignUpForm-control ${errors.weight && touched.weight ? 'is-invalid' : ''}`}
                        placeholder="Enter your weight"
                      />
                      <ErrorMessage name="weight" component="div" className="SignUpForm-errorMessage" />
                    </div>
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="fitnessGoal">Fitness Goal</label>
                    <Field
                      as="select"
                      name="fitnessGoal"
                      id="fitnessGoal"
                      className="SignUpForm-control"
                    >
                      <option value="">Select your goal</option>
                      <option value="loseWeight">Lose Weight</option>
                      <option value="maintain">Maintain</option>
                      <option value="gainMuscle">Gain Muscle</option>
                    </Field>
                  </div>
                  
                  <div className="SignUpForm-group">
                    <label htmlFor="activityLevel">Activity Level</label>
                    <Field
                      as="select"
                      name="activityLevel"
                      id="activityLevel"
                      className="SignUpForm-control"
                    >
                      <option value="">Select your activity level</option>
                      <option value="sedentary">Sedentary</option>
                      <option value="lightlyActive">Lightly Active</option>
                      <option value="active">Active</option>
                      <option value="veryActive">Very Active</option>
                    </Field>
                  </div>
                  
                  <div className="SignUpForm-buttons">
                    <button 
                      type="button" 
                      className="SignUpForm-backButton" 
                      onClick={prevStep}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="SignUpForm-nextButton" 
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="SignUpForm-step">
                  <h3 className="SignUpForm-stepTitle">Preferences & Agreements</h3>
                  
                  <div className="SignUpForm-group SignUpForm-checkboxGroup">
                    <label className="SignUpForm-checkboxLabel">
                      <Field type="checkbox" name="termsAccepted" />
                      <span>I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                    </label>
                    <ErrorMessage name="termsAccepted" component="div" className="SignUpForm-errorMessage" />
                  </div>
                  
                  <div className="SignUpForm-group SignUpForm-checkboxGroup">
                    <label className="SignUpForm-checkboxLabel">
                      <Field type="checkbox" name="receiveNotifications" />
                      <span>I would like to receive notifications, updates, and promotional emails</span>
                    </label>
                  </div>
                  
                  <div className="SignUpForm-buttons">
                    <button 
                      type="button" 
                      className="SignUpForm-backButton" 
                      onClick={prevStep}
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className="SignUpForm-submitButton" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
        
        <div className="SignUpForm-footer">
          <p>Already have an account? <Link to="/login" className="SignUpForm-loginLink">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;