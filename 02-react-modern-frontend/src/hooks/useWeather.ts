import { useState } from 'react';
import { WeatherData } from '../components/WeatherDisplay';
import { DayForecast } from '../components/ForecastDisplay';

interface UseWeatherReturn {
  weatherData: WeatherData | undefined;
  forecast: DayForecast[];
  loading: boolean;
  error: string;
  searchCity: (city: string) => Promise<void>;
  currentCity: string;
}

interface OpenWeatherAPIResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastAPIResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentCity, setCurrentCity] = useState('');

  const searchCity = async (city: string): Promise<void> => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    console.log('🔑 API Key status:', apiKey ? 'Found' : 'Missing');
    console.log('🏙️ City to search:', city);

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.error('❌ API key not configured');
      setError('⚠️ API key not configured! Please add your OpenWeatherMap API key to the .env file.');
      setLoading(false);
      setWeatherData(undefined);
      return;
    }

    // Reset previous states
    setError('');
    setLoading(true);
    setCurrentCity(city);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    console.log('📡 API URL:', apiUrl.replace(apiKey, 'API_KEY_HIDDEN'));

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${city}" not found. Please check the spelling and try again! 🗺️`);
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your .env file! 🔑');
        } else {
          throw new Error(`Failed to fetch weather data (${response.status}). Please try again! 🌐`);
        }
      }

      const data: OpenWeatherAPIResponse = await response.json();
      console.log('✅ API Response received:', data);

      // Transform API response to our WeatherData format
      const transformedData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      };

      console.log('🎉 Weather data transformed:', transformedData);
      setWeatherData(transformedData);
      setError('');

      // Fetch 5-day forecast
      await fetchForecast(city, apiKey);

    } catch (err) {
      console.error('❌ Error fetching weather:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong! Please try again. 😔');
      }
      setWeatherData(undefined);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city: string, apiKey: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const data: ForecastAPIResponse = await response.json();
      console.log('📅 Forecast API Response:', data);

      // Group forecast data by day
      const dailyForecasts = processForecastData(data);
      setForecast(dailyForecasts);
      console.log('📊 Processed forecast:', dailyForecasts);

    } catch (err) {
      console.error('⚠️ Error fetching forecast:', err);
      // Don't set error - forecast is optional, we still have current weather
      setForecast([]);
    }
  };

  const processForecastData = (data: ForecastAPIResponse): DayForecast[] => {
    const dailyData: { [key: string]: any } = {};

    // Group by date
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: date,
          temps: [],
          descriptions: [],
          icons: []
        };
      }

      dailyData[dateKey].temps.push(item.main.temp);
      dailyData[dateKey].descriptions.push(item.weather[0].description);
      dailyData[dateKey].icons.push(item.weather[0].icon);
    });

    // Convert to array and get next 5 days
    const days = Object.keys(dailyData)
      .slice(0, 5)
      .map((dateKey) => {
        const dayData = dailyData[dateKey];
        const date = dayData.date;

        // Get high and low temps
        const highTemp = Math.max(...dayData.temps);
        const lowTemp = Math.min(...dayData.temps);

        // Get most common description and icon
        const description = getMostCommon(dayData.descriptions);
        const icon = getMostCommon(dayData.icons);

        // Format day name
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return {
          day: dayName,
          date: dateStr,
          highTemp,
          lowTemp,
          description,
          icon
        };
      });

    return days;
  };

  const getMostCommon = (arr: string[]): string => {
    const counts: { [key: string]: number } = {};
    arr.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  };

  return {
    weatherData,
    forecast,
    loading,
    error,
    searchCity,
    currentCity
  };
};

export default useWeather;

