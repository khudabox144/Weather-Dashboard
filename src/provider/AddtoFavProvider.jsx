import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { addTofavContext } from "../context";

const AddtoFavProvider = ({ children }) => {
  // Local storage state for favourites
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  // Add location to favourites
  const handleAddToFav = ({ location, lat, lon }) => {
    // Prevent duplicates
    if (favourites.some((fav) => fav.location === location)) return;

    setFavourites([
      ...favourites,
      {
        location,
        latitude: lat,
        longitude: lon,
      },
    ]);
  };

  // Remove location from favourites
  const handleRemoveFromFav = ({ location }) => {
    const updatedFav = favourites.filter(
      (val) => val.location !== location
    );
    setFavourites(updatedFav);
  };

  return (
    <addTofavContext.Provider
      value={{ handleAddToFav, handleRemoveFromFav, favourites }}
    >
      {children}
    </addTofavContext.Provider>
  );
};

export default AddtoFavProvider;
