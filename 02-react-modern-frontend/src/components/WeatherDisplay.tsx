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
}

const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
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

  return (
    <div className="weather-display weather-card">
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
          <span className="weather-detail-emoji">🌡️</span>
          <div className="weather-detail-content">
            <span className="weather-detail-label">Feels Like</span>
            <span className="weather-detail-value">{Math.round(feelsLike)}°C</span>
          </div>
        </div>

        <div className="weather-detail-item">
          <span className="weather-detail-emoji">💧</span>
          <div className="weather-detail-content">
            <span className="weather-detail-label">Humidity</span>
            <span className="weather-detail-value">{humidity}%</span>
          </div>
        </div>

        <div className="weather-detail-item">
          <span className="weather-detail-emoji">💨</span>
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

