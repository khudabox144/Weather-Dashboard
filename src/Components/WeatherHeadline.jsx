// WeatherHeadline.jsx
import { useContext } from "react";
import { weatherContext } from "../context";
import { getFormattedDate } from "../utils/timezone";

const WeatherHeadline = () => {
  const { weatherData } = useContext(weatherContext)

  const getWeatherIcon = (climate) => {
    switch (climate) {
      case "Rain":
        return "/assets/rainy.svg";
      case "Clouds":
        return "/assets/cloud.svg";
      case "Clear":
        return "/assets/icons/sunny.svg";
      case "Snow":
        return "/assets/icons/snow.svg";
      case "Thunder":
        return "/assets/thunder.svg";
      case "Fog":
      case "Haze":
      case "Mist":
        return "/assets/haze.svg";
      default:
        return "/assets/icons/sunny.svg";
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Weather icon + temperature */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex-shrink-0 glass-card-light !rounded-2xl p-3 md:p-4">
          <img
            src={getWeatherIcon(weatherData.climate)}
            alt={weatherData.climate}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight">
            {Math.round(weatherData.temperature)}<span className="text-3xl sm:text-4xl md:text-5xl font-light align-top ml-1">°C</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-1 font-medium uppercase tracking-wider">
            {weatherData.climate || "--"}
          </p>
        </div>
      </div>

      {/* Location & date */}
      <div className="mt-6 md:mt-8">
        <div className="flex items-center gap-2">
          <img src="/assets/pin.svg" className="w-5 h-5 opacity-70" alt="location" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{weatherData.location}</h2>
        </div>
        <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
          {getFormattedDate(weatherData.time, "time", false)} &mdash; {getFormattedDate(weatherData.time, "date", false)}
        </p>
      </div>
    </div>
  );
};

export default WeatherHeadline;
