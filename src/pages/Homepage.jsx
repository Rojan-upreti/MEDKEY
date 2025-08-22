import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  ChevronRight, 
  Play,
  Star,
  ArrowRight,
  Activity,
  Calendar,
  FileText,
  Menu,
  X
} from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Heart,
      title: "Unified Health Records",
      description: "Access all your medical information in one secure, integrated platform"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "HIPAA-compliant platform with end-to-end encryption"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "View your health data anytime, anywhere from any device"
    },
    {
      icon: Users,
      title: "Care Team Integration",
      description: "Connect with your healthcare providers seamlessly"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "MedKey has revolutionized how I manage my health information. Everything is so organized and easy to access.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Physician",
      content: "The integration with our practice has been seamless. Patients are more engaged in their care.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      content: "I love being able to track my medications and appointments all in one place. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "500+", label: "Healthcare Providers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="homepage-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Heart className="logo-icon" />
            <span className="logo-text">MedKey</span>
          </div>
          <div className="nav-menu">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="nav-btn nav-btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-links">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
            <div className="mobile-nav-buttons">
              <button className="nav-btn nav-btn-secondary" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="nav-btn nav-btn-primary" onClick={() => navigate('/signup')}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Unified Health System,
              <span className="hero-highlight"> Powered by MedKey</span>
            </h1>
            <p className="hero-subtitle">
              Experience the future of healthcare with our comprehensive Unified Health System. 
              Access all your medical information, connect with providers, and manage your care in one secure, integrated platform.
            </p>
            <div className="hero-actions">
              <button className="hero-btn hero-btn-primary" onClick={() => navigate('/signup')}>
                Start Your Health Journey
                <ArrowRight size={20} />
              </button>
              <button className="hero-btn hero-btn-secondary">
                <Play size={18} />
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-title">MedKey Health Dashboard</div>
              </div>
              <div className="preview-content">
                <div className="preview-sidebar">
                  <div className="sidebar-item active">
                    <Activity size={16} />
                    <span>Dashboard</span>
                  </div>
                  <div className="sidebar-item">
                    <Calendar size={16} />
                    <span>Appointments</span>
                  </div>
                  <div className="sidebar-item">
                    <FileText size={16} />
                    <span>Records</span>
                  </div>
                </div>
                <div className="preview-main">
                  <div className="preview-cards">
                    <div className="preview-card">
                      <div className="card-header">Health Overview</div>
                      <div className="card-metrics">
                        <div className="metric">
                          <div className="metric-value">8</div>
                          <div className="metric-label">Medications</div>
                        </div>
                        <div className="metric">
                          <div className="metric-value">3</div>
                          <div className="metric-label">Conditions</div>
                        </div>
                      </div>
                    </div>
                    <div className="preview-card">
                      <div className="card-header">Recent Activity</div>
                      <div className="activity-list">
                        <div className="activity-item"></div>
                        <div className="activity-item"></div>
                        <div className="activity-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Unified Health System Features</h2>
            <p className="section-subtitle">
              MedKey brings together all aspects of your healthcare in one secure, integrated platform designed for modern healthcare delivery.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <button className="feature-link">
                    Learn More <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trusted by Patients and Providers</h2>
            <p className="section-subtitle">
              See what our users are saying about their experience with MedKey.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Take Control of Your Health?</h2>
            <p className="cta-subtitle">
              Join thousands of patients and healthcare providers who trust MedKey for their health management needs.
            </p>
            <div className="cta-actions">
              <button className="cta-btn cta-btn-primary" onClick={() => navigate('/signup')}>
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className="cta-btn cta-btn-secondary" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Heart className="logo-icon" />
                <span className="logo-text">MedKey</span>
              </div>
                          <p className="footer-description">
              Empowering patients and providers with our Unified Health System platform.
            </p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#security">Security</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#docs">Documentation</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MedKey. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#hipaa">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;