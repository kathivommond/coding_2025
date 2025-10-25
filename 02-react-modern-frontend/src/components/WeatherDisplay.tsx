import { Thermometer, Droplets, Wind, Heart } from 'lucide-react';
import './WeatherDisplay.css';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherDisplayProps {
  weatherData?: WeatherData;
  onToggleFavorite?: (city: string, country: string) => void;
  isFavorite?: boolean;
}

const WeatherDisplay = ({ weatherData, onToggleFavorite, isFavorite = false }: WeatherDisplayProps) => {
  if (!weatherData) {
    return (
      <div className="weather-display weather-placeholder-container">
        <div className="weather-placeholder">
          <div className="weather-emoji-placeholder">🌍✨</div>
          <h2 className="weather-placeholder-title">Search for a city to see weather! 🔮</h2>
          <p className="weather-placeholder-text">✈️ Enter a city name above and discover the current conditions 🌤️</p>
        </div>
      </div>
    );
  }

  const { city, country, temperature, feelsLike, description, humidity, windSpeed, icon } = weatherData;

  // Determine which bear to show based on temperature
  const getBearCharacter = () => {
    if (temperature <= 15) {
      return {
        emoji: '🐻‍❄️',
        accessories: '🧣🎩',
        text: 'Brrr! Bundle up!',
        className: 'cold-bear'
      };
    } else if (temperature >= 20) {
      return {
        emoji: '🐻',
        accessories: '😎🍦',
        text: 'Stay cool!',
        className: 'warm-bear'
      };
    }
    return null;
  };

  const bear = getBearCharacter();

  return (
    <div className="weather-display weather-card">
      {bear && (
        <div className={`weather-bear ${bear.className}`}>
          <div className="bear-character">
            <span className="bear-emoji">{bear.emoji}</span>
            <span className="bear-accessories">{bear.accessories}</span>
          </div>
          <div className="bear-text">{bear.text}</div>
        </div>
      )}

      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        onClick={() => onToggleFavorite && onToggleFavorite(city, country)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className="heart-icon" 
          size={32}
          fill={isFavorite ? '#ff69b4' : 'none'}
          strokeWidth={2.5}
        />
      </button>

      <div className="weather-card-header">
        <h2 className="weather-location">
          {city}, {country}
        </h2>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
            alt={description}
            className="weather-icon"
          />
        </div>
        <div className="weather-temp-container">
          <div className="weather-temperature">{Math.round(temperature)}°</div>
          <div className="weather-description">✨ {description} ✨</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <Thermometer className="weather-detail-icon icon-thermometer" size={32} strokeWidth={2} />
          <div className="weather-detail-content">
            <span className="weather-detail-label">Feels Like</span>
            <span className="weather-detail-value">{Math.round(feelsLike)}°C</span>
          </div>
        </div>

        <div className="weather-detail-item">
          <Droplets className="weather-detail-icon icon-droplets" size={32} strokeWidth={2} />
          <div className="weather-detail-content">
            <span className="weather-detail-label">Humidity</span>
            <span className="weather-detail-value">{humidity}%</span>
          </div>
        </div>

        <div className="weather-detail-item">
          <Wind className="weather-detail-icon icon-wind" size={32} strokeWidth={2} />
          <div className="weather-detail-content">
            <span className="weather-detail-label">Wind Speed</span>
            <span className="weather-detail-value">{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

