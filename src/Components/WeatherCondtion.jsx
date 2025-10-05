// WeatherDetails.jsx
import React, { useContext } from "react";
import { weatherContext } from "../context";

const WeatherCondtion = () => {
  const {weatherData}=useContext(weatherContext);
  const {
    climate,
    maxTemperature,
    minTemperature,
    humidity,
    cloudPercentage,
    wind,
  }=weatherData;
//   console.log(weatherData);
  return (
   <div>
  <p className="text-sm md:text-base lg:text-lg font-bold uppercase mb-4 md:mb-6">
    The climate is <u>{climate}</u>
  </p>
  <ul className="space-y-4 md:space-y-6">
    {[
      { label: "Temp max", value: maxTemperature, icon: "./assets/icons/temp-max.svg" },
      { label: "Temp min", value: minTemperature, icon: "./assets/icons/temp-min.svg" },
      { label: "Humidity", value: humidity + "%", icon: "./assets/icons/humidity.svg" },
      { label: "Cloudy", value: cloudPercentage + "%", icon: "./assets/icons/cloud.svg" },
      { label: "Wind", value: wind, icon: "./assets/icons/wind.svg" }
    ].map((item, idx) => (
      <li key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm md:text-base lg:text-lg space-y-1 sm:space-y-0">
        <span className="font-medium">{item.label}</span>
        <div className="flex items-center space-x-2">
          <p>{item.value}</p>
          <img src={item.icon} alt={item.label} className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default WeatherCondtion;
