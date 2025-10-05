// WeatherApp.jsx
import React from "react";
import WeatherHeadline from "./WeatherHeadline";
import AddToFavourite from "./AddToFavourite";
import WeatherCondtion from "./WeatherCondtion";

const WeatherBoard = () => {

	

	return (
    <div className="container mx-auto px-4">
      <div className="grid bg-black/20 rounded-xl backdrop-blur-md border border-white/20 px-4 md:px-8 lg:px-14 py-6 md:py-10 min-h-[520px] max-w-[1058px] mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <AddToFavourite />
          <WeatherHeadline />
          <WeatherCondtion />
        </div>
      </div>
    </div>
  );
};

export default WeatherBoard;
