import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay, { WeatherData } from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import { getMockWeatherData, getRandomWeatherData } from './data/mockWeatherData';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

  const handleSearch = (city: string) => {
    console.log('Searching for:', city);
    
    // Try to get specific mock data for known cities
    const mockData = getMockWeatherData(city);
    
    if (mockData) {
      // Use predefined mock data for known cities
      setWeatherData(mockData);
      console.log(`✨ Loaded mock data for ${city}`);
    } else {
      // Generate random weather data for unknown cities
      const randomData = getRandomWeatherData(city);
      setWeatherData(randomData);
      console.log(`🎲 Generated random weather for ${city}`);
    }
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
