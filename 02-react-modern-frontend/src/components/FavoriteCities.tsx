import './FavoriteCities.css';

interface FavoriteCity {
  city: string;
  country: string;
}

interface FavoriteCitiesProps {
  favorites: FavoriteCity[];
  onSelectCity: (city: string) => void;
  onRemoveCity: (city: string) => void;
}

const FavoriteCities = ({ favorites, onSelectCity, onRemoveCity }: FavoriteCitiesProps) => {
  return (
    <aside className="favorite-cities">
      <h2 className="favorite-cities-title">💖 Favorite Cities</h2>
      
      {favorites.length === 0 ? (
        <div className="favorite-cities-empty">
          <div className="favorite-cities-empty-emoji">🌟</div>
          <p>No favorite cities yet! 🗺️</p>
          <span className="favorite-cities-hint">✨ Click the heart button on weather cards to save your favorites! ⭐</span>
        </div>
      ) : (
        <ul className="favorite-cities-list">
          {favorites.map((fav) => (
            <li key={`${fav.city}-${fav.country}`} className="favorite-city-item">
              <button
                className="favorite-city-button"
                onClick={() => onSelectCity(fav.city)}
              >
                <span className="favorite-city-name">{fav.city}</span>
                <span className="favorite-city-country">{fav.country}</span>
              </button>
              <button
                className="remove-favorite-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCity(fav.city);
                }}
                aria-label="Remove from favorites"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FavoriteCities;

