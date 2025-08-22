import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Phone,
  ArrowLeft
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just redirect to dashboard
    // Later this will integrate with actual authentication
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <button className="back-button" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
              Back to Home
            </button>
            
            <div className="auth-header">
              <div className="auth-logo">
                <Heart className="logo-icon" />
                <span className="logo-text">MedKey</span>
              </div>
              <h1 className="auth-title">Create Your Account</h1>
              <p className="auth-subtitle">
                Join thousands of patients who trust MedKey for their health management needs.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <div className="input-group">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <div className="input-group">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-group">
                  <Phone className="input-icon" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="agreeToTerms"
                    className="checkbox" 
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkbox-text">
                    I agree to the{' '}
                    <a href="#terms" className="auth-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#privacy" className="auth-link">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-button auth-button-primary">
                Create Account & Continue
              </button>
            </form>

            <div className="auth-divider">
              <span>or sign up with</span>
            </div>

            <div className="social-buttons">
              <button className="social-button">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwLjI3QzIwIDkuNjkgMTkuOTUgOS4xNSAxOS44NiA4LjYzSDE2LjJWMTEuNzNIMTcuNzNDMTcuNTkgMTIuNDQgMTcuMTkgMTMuMDUgMTYuNiAxMy40NFYxNS4yNEgxOC40N0MxOS4xNyAxNC41MiAyMCAxMi44MiAyMCAxMC4yN1oiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEwIDIwQzEyLjcgMjAgMTQuOTYgMTkuMSAxNi42NCAxNy42NEwxNC43MiAxNi4wOUMxNC4wOSAxNi41IDEzLjIyIDE2Ljc3IDEwIDE2Ljc3QzcuMzkgMTYuNzcgNS4xOSAxNS45NCAzLjczIDE0LjU0TDEuNzkgMTYuMDlDMy41MSAxOS4zMyA2LjU4IDIwIDEwIDIwWiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNMy43MyAxNC41NEMzLjM5IDEzLjU4IDMuMzkgMTIuNDIgMy43MyAxMS40NkwyLjE4IDEwLjE4QzEuNTggMTEuNjggMS41OCAxMy4zMiAyLjE4IDE0LjgyTDMuNzMgMTQuNTRaIiBmaWxsPSIjRkJCQzA0Ii8+CjxwYXRoIGQ9Ik0xMCAzLjIzQzExLjMxIDMuMjMgMTIuNTIgMy42OSAxMy40NiA0LjU5TDE1LjE0IDIuOTFDMTMuNTQgMS40MSAxMS40OSAwLjc3IDEwIDAuNzdDNi41OCAwLjc3IDMuNTEgMS40NCAyLjE4IDMuNjhMMy43MyA1LjQ2QzUuMTkgNC4wNiA3LjM5IDMuMjMgMTAgMy4yM1oiIGZpbGw9IiNFQTQzMzUiLz4KPC9zdmc+" alt="Google" />
                Continue with Google
              </button>
              <button className="social-button">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzIwIDQuNDc3IDE1LjUyMyAwIDEwIDAgQzQuNDc3IDAgMCA0LjQ3NyAwIDEwQzAgMTQuOTkxIDMuNjU3IDE5LjEyOCA4LjQzOCAxOS44NzhWMTIuODlINS44OThWMTBIOC40MzhWNy43OTdDOC40MzggNS4yOTEgOS45MyAzLjkwNiAxMi4yMTUgMy45MDZDMTMuMzA5IDMuOTA2IDE0LjQ1MyA0LjEwMiAxNC40NTMgNC4xMDJWNi41NjJIMTMuMTkzQzExLjk1IDYuNTYyIDExLjU2MyA3LjMzMyAxMS41NjMgOC4xMjNWMTBIMTQuMzM2TDEzLjg5MyAxMi44OUgxMS41NjNWMTkuODc4QzE2LjM0MyAxOS4xMjggMjAgMTQuOTkxIDIwIDEwWiIgZmlsbD0iIzE4NzdGMiIvPgo8L3N2Zz4=" alt="Facebook" />
                Continue with Facebook
              </button>
            </div>

            <p className="auth-footer">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="auth-visual-section">
          <div className="visual-content">
            <div className="visual-icon">
              <Heart size={60} />
            </div>
            <h2 className="visual-title">Your Health Journey Starts Here</h2>
            <p className="visual-description">
              Take the first step towards better health management. Join our community of 
                              patients and healthcare providers who trust MedKey.
            </p>
            <div className="visual-features">
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Free to Get Started</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Secure & Private</span>
              </div>
              <div className="visual-feature">
                <div className="feature-check">✓</div>
                <span>Easy Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;