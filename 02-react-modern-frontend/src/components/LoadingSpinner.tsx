import { CloudSun, Sparkles } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <CloudSun className="spinner-icon" size={64} strokeWidth={2} />
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <h2 className="loading-title">
        Fetching weather data... <Sparkles size={24} className="inline-icon" />
      </h2>
      <p className="loading-text">Hang tight! Checking the skies for you!</p>
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

