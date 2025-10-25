import './ErrorDisplay.css';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  // Determine if it's a "city not found" error
  const isCityNotFound = message.toLowerCase().includes('not found');
  const isAPIKeyError = message.toLowerCase().includes('api key');
  
  return (
    <div className="error-container">
      <div className="error-icon">{isCityNotFound ? '🗺️' : isAPIKeyError ? '🔑' : '😔'}</div>
      <h2 className="error-title">
        {isCityNotFound ? 'City Not Found!' : isAPIKeyError ? 'API Key Issue' : 'Oops! Something went wrong'}
      </h2>
      <p className="error-message">{message}</p>
      <div className="error-hints">
        {isCityNotFound && (
          <p className="error-hint">💡 Try checking the spelling or search for a different city!</p>
        )}
        {isAPIKeyError && (
          <p className="error-hint">💡 Make sure to restart your dev server after adding the API key!</p>
        )}
      </div>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          <span className="retry-icon">🔄</span>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;

