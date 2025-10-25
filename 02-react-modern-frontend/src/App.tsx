import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay, { WeatherData } from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

  const handleSearch = (city: string) => {
    console.log('Searching for:', city);
    // Weather search functionality will be implemented later
    // For now, here's mock data to demonstrate the card design
    setWeatherData({
      city: city,
      country: 'Demo',
      temperature: 22,
      feelsLike: 20,
      description: 'partly cloudy',
      humidity: 65,
      windSpeed: 3.5,
      icon: '02d'
    });
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <main className="main-content">
          <SearchBar onSearch={handleSearch} />
          <WeatherDisplay weatherData={weatherData} />
        </main>
        <FavoriteCities />
      </div>
    </div>
  );
};

export default App;
