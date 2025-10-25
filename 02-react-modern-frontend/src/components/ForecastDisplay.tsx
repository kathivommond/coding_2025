import './ForecastDisplay.css';

export interface DayForecast {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  description: string;
  icon: string;
}

interface ForecastDisplayProps {
  forecast: DayForecast[];
}

const ForecastDisplay = ({ forecast }: ForecastDisplayProps) => {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">📅 5-Day Forecast</h3>
      <div className="forecast-scroll">
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-date">{day.date}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="forecast-icon"
              />
              <div className="forecast-temps">
                <span className="forecast-high">{Math.round(day.highTemp)}°</span>
                <span className="forecast-separator">/</span>
                <span className="forecast-low">{Math.round(day.lowTemp)}°</span>
              </div>
              <div className="forecast-description">{day.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastDisplay;

