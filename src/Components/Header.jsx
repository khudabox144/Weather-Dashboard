import React, { useContext, useState } from 'react';
import { addTofavContext, searchLocationContext } from '../context';
import { getLocationByName } from '../data/location-data';


const Header = ({climateImage}) => {
    const [showFav, setShowFav] = useState(false);
    const [search, setSearch] = useState("");
    const { favourites } = useContext(addTofavContext);
    const { setSelectedLocation } = useContext(searchLocationContext);

    const handleClick = () => {
        setShowFav(!showFav);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

   
    const handleSearch = (e) => {

        if (e && e.preventDefault) e.preventDefault();

        const name = getLocationByName(search?.trim());

        // console.log(name);
        setSelectedLocation({ name });
    }


    return (
        <header style={{ backgroundImage: `url('${climateImage}')` }} className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/60 to-black/0 pb-6 md:pb-10">
  <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 md:py-6 px-4 md:px-0">
    <a href="./index.html">
      <img className="h-8 md:h-9" src="/public/assets/logo.svg" alt="Weather App" />
    </a>

    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mt-3 md:mt-0 relative w-full md:w-auto">
      <form className="w-full md:w-auto" onSubmit={handleSearch}>
        <div className="flex items-center w-full md:w-auto space-x-2 py-2 px-3 border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md focus-within:bg-black/30 transition-all">
          <input
            type="search"
            value={search}
            onChange={handleChange}
            placeholder="Search Location"
            className="bg-transparent text-white w-full text-xs md:text-base outline-none border-none placeholder:text-white"
            required
          />
          <button type="submit">
            <img src="../assets/search.svg" className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 md:gap-4 p-2 hover:bg-black/30 cursor-pointer rounded-md transition-all">
        <img src="../assets/heart-red.svg" alt="" className="w-5 h-5 md:w-6 md:h-6" />
        <button onClick={handleClick} className="text-xs md:text-sm font-semibold">Favourite Locations</button>
      </div>

      {showFav && (
        <div className="absolute right-0 top-full mt-2 w-full md:w-64 bg-white rounded-md border border-gray-300 shadow-lg z-50 text-black p-4">
          <h3 className="text-lg font-bold mb-2">Favourite Locations</h3>
          <ul className="flex flex-col space-y-2">
            {favourites.map((fav, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLocation({ name: fav })}
                className="hover:bg-sky-100 text-violet-600 font-semibold text-sm md:text-base text-left px-2 py-1 rounded"
              >
                {fav.location}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  </nav>
</header>

    );
};

export default Header;