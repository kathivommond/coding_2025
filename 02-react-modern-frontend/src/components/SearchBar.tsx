import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Enter city name... (Try Paris, Tokyo, NYC!)"
        value={city}
        onChange={handleChange}
        aria-label="City search"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <span className="search-button-emoji">✨</span>
      </button>
    </form>
  );
};

export default SearchBar;

