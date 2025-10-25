import './FavoriteCities.css';

const FavoriteCities = () => {
  return (
    <aside className="favorite-cities">
      <h2 className="favorite-cities-title">💖 Favorite Cities</h2>
      <div className="favorite-cities-empty">
        <div className="favorite-cities-empty-emoji">🌟</div>
        <p>No favorite cities yet! 🗺️</p>
        <span className="favorite-cities-hint">✨ Search for cities to add them to your favorites ⭐</span>
      </div>
    </aside>
  );
};

export default FavoriteCities;

