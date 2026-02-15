// WeatherDetails.jsx
import { useContext } from "react";
import { weatherContext } from "../context";

const WeatherCondtion = () => {
  const { weatherData } = useContext(weatherContext);
  const {
    climate,
    maxTemperature,
    minTemperature,
    humidity,
    cloudPercentage,
    wind,
  } = weatherData;

  const conditions = [
    { label: "Temp max", value: `${Math.round(maxTemperature)}°C`, icon: "/assets/icons/temp-max.svg" },
    { label: "Temp min", value: `${Math.round(minTemperature)}°C`, icon: "/assets/icons/temp-min.svg" },
    { label: "Humidity", value: `${humidity}%`, icon: "/assets/icons/humidity.svg" },
    { label: "Cloudy", value: `${cloudPercentage}%`, icon: "/assets/icons/cloud.svg" },
    { label: "Wind", value: `${wind} m/s`, icon: "/assets/icons/wind.svg" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-white/60 rounded-full"></div>
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80">
          {climate || "--"} conditions
        </p>
      </div>

      <div className="space-y-3 stagger-children">
        {conditions.map((item, idx) => (
          <div
            key={idx}
            className="glass-card-light flex items-center justify-between px-4 py-3 md:py-3.5 animate-fade-in-up hover:bg-white/15 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <img src={item.icon} alt={item.label} className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-sm md:text-base text-white/70 font-medium">{item.label}</span>
            </div>
            <span className="text-sm md:text-base font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCondtion;
