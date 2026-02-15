import { useContext, useState, useEffect } from "react";
import { addTofavContext, weatherContext } from "../context";

const AddToFavourite = () => {
  const [isFav, setIsFav] = useState(false);
  const { handleAddToFav, handleRemoveFromFav, favourites } =
    useContext(addTofavContext);
  const { weatherData } = useContext(weatherContext);
  const { location, latitude, longitude } = weatherData;

  // Check if current location is already a favourite
  useEffect(() => {
    const found = favourites.some((fav) => fav.location === location);
    setIsFav(found);
  }, [favourites, location]);

  const handleFav = () => {
    if (!location) return;

    if (isFav) {
      handleRemoveFromFav({ location });
    } else {
      handleAddToFav({ location, lat: latitude, lon: longitude });
    }

    setIsFav(!isFav);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleFav}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${
          isFav
            ? "bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30"
            : "glass-card-light text-white/80 hover:text-white hover:bg-white/20"
        }`}
      >
        {/* Heart icon inline SVG for smooth color transitions */}
        <svg
          className={`w-4 h-4 transition-colors duration-300 ${isFav ? "text-red-400 fill-red-400" : "text-white/60 fill-none"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>{isFav ? "Saved" : "Add to Favourites"}</span>
      </button>
    </div>
  );
};

export default AddToFavourite;
