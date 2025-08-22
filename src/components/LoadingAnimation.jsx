import React from 'react';
import { Stethoscope, Search, Activity } from 'lucide-react';

const LoadingAnimation = ({ message = "Searching for healthcare providers...", type = "search" }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Main loading animation */}
        <div className="loading-animation">
          <div className="loading-circle">
            <div className="loading-dot loading-dot-1"></div>
            <div className="loading-dot loading-dot-2"></div>
            <div className="loading-dot loading-dot-3"></div>
            <div className="loading-dot loading-dot-4"></div>
            <div className="loading-dot loading-dot-5"></div>
            <div className="loading-dot loading-dot-6"></div>
            <div className="loading-dot loading-dot-7"></div>
            <div className="loading-dot loading-dot-8"></div>
          </div>
          
          {/* Center icon */}
          <div className="loading-center-icon">
            {type === "search" && <Search className="loading-icon" />}
            {type === "location" && <Activity className="loading-icon" />}
            {type === "doctor" && <Stethoscope className="loading-icon" />}
          </div>
        </div>
        
        {/* Loading message */}
        <div className="loading-message">
          <p className="loading-text">{message}</p>
          <div className="loading-dots">
            <span className="loading-dot-text">.</span>
            <span className="loading-dot-text">.</span>
            <span className="loading-dot-text">.</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="loading-progress">
          <div className="loading-progress-bar">
            <div className="loading-progress-fill"></div>
          </div>
        </div>
      </div>
      
      {/* Background particles */}
      <div className="loading-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="loading-particle" style={{
            '--delay': `${i * 0.1}s`,
            '--duration': `${2 + i * 0.1}s`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
