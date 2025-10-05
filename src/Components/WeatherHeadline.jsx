// WeatherHeadline.jsx
import React, { useContext } from "react";
import { weatherContext } from "../context";

import CloudIcon from "/public/assets/cloud.svg";
import HazeIcon from "/public/assets/haze.svg";
import SnowIcon from "/public/assets/icons/snow.svg";
import SunnyIcon from "/public/assets/icons/sunny.svg";
import RainIcon from "/public/assets/rainy.svg";
import ThunderIcon from "/public/assets/thunder.svg";
import { getFormattedDate } from "../utils/timezone";

const WeatherHeadline = () => {
  const { weatherData } = useContext(weatherContext)
  // console.log(weatherData);
  const getWeatherIcon = (climate) => {
    switch (climate) {
      case "Rain":
        return RainIcon;
      case "Clouds":
        return CloudIcon;
      case "Clear":
        return SunnyIcon;
      case "Snow":
        return SnowIcon;
      case "Thunder":
        return ThunderIcon;
      case "Fog":
        return HazeIcon;
      case "Haze":
        return HazeIcon;
      case "Mist":
        return HazeIcon;

      default:
        return SunnyIcon;
    }
  }

  return (
    <div>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between max-md:space-y-4">
    <img src={getWeatherIcon(weatherData.climate)} alt="cloud" className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
      <h1 className="text-[48px] md:text-[60px] lg:text-[80px] xl:text-[100px] leading-none font-bold">{Math.round(weatherData.temperature)}°</h1>
      <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
        <img src="./assets/pin.svg" className="w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">{weatherData.location}</h2>
      </div>
    </div>
  </div>
  <p className="text-xs md:text-sm lg:text-base mt-2">{getFormattedDate(weatherData.time, "time", false)} - {getFormattedDate(weatherData.time, "date", false)}</p>
</div>

  );
};

export default WeatherHeadline;
