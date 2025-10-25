import { WeatherData } from '../components/WeatherDisplay';

// Mock weather data for testing different scenarios
export const mockWeatherData: Record<string, WeatherData> = {
  // Sunny day
  paris: {
    city: 'Paris',
    country: 'FR',
    temperature: 24,
    feelsLike: 22,
    description: 'clear sky',
    humidity: 45,
    windSpeed: 3.2,
    icon: '01d' // Clear sky day
  },

  // Rainy weather
  london: {
    city: 'London',
    country: 'GB',
    temperature: 15,
    feelsLike: 13,
    description: 'light rain',
    humidity: 85,
    windSpeed: 5.8,
    icon: '10d' // Rain day
  },

  // Snowy conditions
  moscow: {
    city: 'Moscow',
    country: 'RU',
    temperature: -5,
    feelsLike: -10,
    description: 'snow',
    humidity: 75,
    windSpeed: 4.5,
    icon: '13d' // Snow
  },

  // Hot and sunny
  dubai: {
    city: 'Dubai',
    country: 'AE',
    temperature: 38,
    feelsLike: 42,
    description: 'clear sky',
    humidity: 30,
    windSpeed: 2.1,
    icon: '01d' // Clear sky
  },

  // Cloudy
  tokyo: {
    city: 'Tokyo',
    country: 'JP',
    temperature: 18,
    feelsLike: 17,
    description: 'few clouds',
    humidity: 60,
    windSpeed: 4.2,
    icon: '02d' // Few clouds
  },

  // Thunderstorm
  'new york': {
    city: 'New York',
    country: 'US',
    temperature: 21,
    feelsLike: 19,
    description: 'thunderstorm',
    humidity: 90,
    windSpeed: 7.5,
    icon: '11d' // Thunderstorm
  },

  // Foggy
  'san francisco': {
    city: 'San Francisco',
    country: 'US',
    temperature: 16,
    feelsLike: 14,
    description: 'mist',
    humidity: 88,
    windSpeed: 3.8,
    icon: '50d' // Mist
  },

  // Night time clear
  sydney: {
    city: 'Sydney',
    country: 'AU',
    temperature: 19,
    feelsLike: 18,
    description: 'clear sky',
    humidity: 55,
    windSpeed: 2.9,
    icon: '01n' // Clear sky night
  },

  // Partly cloudy night
  berlin: {
    city: 'Berlin',
    country: 'DE',
    temperature: 12,
    feelsLike: 10,
    description: 'scattered clouds',
    humidity: 70,
    windSpeed: 4.1,
    icon: '03n' // Scattered clouds night
  },

  // Broken clouds
  rome: {
    city: 'Rome',
    country: 'IT',
    temperature: 26,
    feelsLike: 25,
    description: 'broken clouds',
    humidity: 50,
    windSpeed: 3.5,
    icon: '04d' // Broken clouds
  },

  // Heavy rain
  mumbai: {
    city: 'Mumbai',
    country: 'IN',
    temperature: 28,
    feelsLike: 32,
    description: 'heavy intensity rain',
    humidity: 95,
    windSpeed: 6.2,
    icon: '10d' // Rain
  },

  // Very cold
  reykjavik: {
    city: 'Reykjavik',
    country: 'IS',
    temperature: -2,
    feelsLike: -7,
    description: 'light snow',
    humidity: 80,
    windSpeed: 8.5,
    icon: '13d' // Snow
  }
};

// Function to get mock data by city name
export const getMockWeatherData = (cityName: string): WeatherData | undefined => {
  const normalizedCity = cityName.toLowerCase().trim();
  return mockWeatherData[normalizedCity];
};

// Random weather data for any city not in the list
export const getRandomWeatherData = (cityName: string): WeatherData => {
  const conditions = [
    { description: 'clear sky', icon: '01d', humidity: 40 },
    { description: 'few clouds', icon: '02d', humidity: 50 },
    { description: 'scattered clouds', icon: '03d', humidity: 60 },
    { description: 'broken clouds', icon: '04d', humidity: 65 },
    { description: 'shower rain', icon: '09d', humidity: 85 },
    { description: 'rain', icon: '10d', humidity: 80 },
    { description: 'thunderstorm', icon: '11d', humidity: 90 },
    { description: 'snow', icon: '13d', humidity: 75 },
    { description: 'mist', icon: '50d', humidity: 88 }
  ];

  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temperature = Math.floor(Math.random() * 40) - 5; // -5 to 35°C
  const windSpeed = Math.random() * 10; // 0 to 10 m/s

  return {
    city: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    country: 'XX',
    temperature,
    feelsLike: temperature + Math.floor(Math.random() * 6) - 3,
    description: condition.description,
    humidity: condition.humidity,
    windSpeed: Math.round(windSpeed * 10) / 10,
    icon: condition.icon
  };
};

