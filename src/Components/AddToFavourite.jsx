import React, { useContext, useState, useEffect } from "react";
import { addTofavContext, weatherContext } from "../context";
import redIcon from "/assets/heart-red.svg";
import whiteIcon from "/assets/heart.svg";

const AddToFavourite = () => {
  const [favIcon, setFavIcon] = useState(false);
  const { handleAddToFav, handleRemoveFromFav, favourites } =
    useContext(addTofavContext);
  const { weatherData } = useContext(weatherContext);
  const { location, latitude, longitude } = weatherData;

  // Check if current location is already a favourite
  useEffect(() => {
    const found = favourites.some((fav) => fav.location === location);
    setFavIcon(found);
  }, [favourites, location]);

  const handleFav = () => {
    if (!location) return; // guard against undefined data

    if (favIcon) {
      handleRemoveFromFav({ location });
    } else {
      handleAddToFav({ location, lat: latitude, lon: longitude });
    }

    setFavIcon(!favIcon);
  };

  return (
    <div className="md:col-span-2">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-end space-y-2 md:space-y-0 md:space-x-6">
    <button
      onClick={handleFav}
      className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D] transition-all hover:bg-[#c5c5c57a]">
      <span>{favIcon ? "Remove from Favourite" : "Add to Favourite"}</span>
      <img
        src={favIcon ? redIcon : whiteIcon}
        alt="favourite icon"
        className="h-5 w-5"
      />
    </button>
  </div>
</div>

  );
};

export default AddToFavourite;
