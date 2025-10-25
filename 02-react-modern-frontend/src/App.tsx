import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import FavoriteCities from './components/FavoriteCities';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import useWeather from './hooks/useWeather';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

interface FavoriteCity {
  city: string;
  country: string;
}

const App = () => {
  const { weatherData, forecast, loading, error, searchCity, currentCity } = useWeather();
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('favoriteCities', []);

  const handleSearch = async (city: string) => {
    console.log('🔍 Searching for:', city);
    await searchCity(city);
  };

  const handleRetry = () => {
    if (currentCity) {
      handleSearch(currentCity);
    }
  };

  const handleToggleFavorite = (city: string, country: string) => {
    const cityKey = `${city}-${country}`;
    const existingIndex = favorites.findIndex(
      (fav) => `${fav.city}-${fav.country}` === cityKey
    );

    if (existingIndex >= 0) {
      // Remove from favorites
      const newFavorites = favorites.filter((_, index) => index !== existingIndex);
      setFavorites(newFavorites);
      console.log('💔 Removed from favorites:', city);
    } else {
      // Add to favorites
      const newFavorites = [...favorites, { city, country }];
      setFavorites(newFavorites);
      console.log('💖 Added to favorites:', city);
    }
  };

  const handleSelectCity = (city: string) => {
    handleSearch(city);
  };

  const handleRemoveCity = (city: string) => {
    const newFavorites = favorites.filter((fav) => fav.city !== city);
    setFavorites(newFavorites);
    console.log('💔 Removed from favorites:', city);
  };

  const isCityFavorite = weatherData
    ? favorites.some((fav) => fav.city === weatherData.city && fav.country === weatherData.country)
    : false;

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <main className="main-content">
          <SearchBar onSearch={handleSearch} />
          
          {loading && <LoadingSpinner />}
          
          {!loading && error && (
            <ErrorDisplay message={error} onRetry={currentCity ? handleRetry : undefined} />
          )}
          
          {!loading && !error && (
            <>
              <WeatherDisplay 
                weatherData={weatherData}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isCityFavorite}
              />
              <ForecastDisplay forecast={forecast} />
            </>
          )}
        </main>
        <FavoriteCities 
          favorites={favorites}
          onSelectCity={handleSelectCity}
          onRemoveCity={handleRemoveCity}
        />
      </div>
    </div>
  );
};

export default App;
