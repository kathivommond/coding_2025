import { MapPin, Key, AlertCircle, RotateCw, Lightbulb } from 'lucide-react';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  // Determine if it's a "city not found" error
  const isCityNotFound = message.toLowerCase().includes('not found');
  const isAPIKeyError = message.toLowerCase().includes('api key');
  
  const ErrorIcon = isCityNotFound ? MapPin : isAPIKeyError ? Key : AlertCircle;
  
  return (
    <div className="error-container">
      <ErrorIcon className="error-icon-svg" size={80} strokeWidth={2} />
      <h2 className="error-title">
        {isCityNotFound ? 'City Not Found!' : isAPIKeyError ? 'API Key Issue' : 'Oops! Something went wrong'}
      </h2>
      <p className="error-message">{message}</p>
      <div className="error-hints">
        {isCityNotFound && (
          <p className="error-hint">
            <Lightbulb size={18} className="hint-icon" />
            Try checking the spelling or search for a different city!
          </p>
        )}
        {isAPIKeyError && (
          <p className="error-hint">
            <Lightbulb size={18} className="hint-icon" />
            Make sure to restart your dev server after adding the API key!
          </p>
        )}
      </div>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          <RotateCw className="retry-icon" size={20} strokeWidth={2.5} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;

