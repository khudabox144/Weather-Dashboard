import { useContext, useEffect, useState } from "react";
import { searchLocationContext } from "../context";
// const {selectedLocation}=useContext(searchLocationContext);
const useWeather = () => {
  const { selectedLocation } = useContext(searchLocationContext);
  const latitude = selectedLocation?.name?.latitude ?? null;
  const longitude = selectedLocation?.name?.longitude ?? null;

  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    setLoading({
      ...loading,
      state: true,
      message: "Trying to fetch the weather data...",
    });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }
      const data = await response.json();
      const updateWeatherData = {
        location: data?.name,
        climate: data?.weather?.[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        longitude: lon,
        latitude: lat,
      };

      setWeatherData(updateWeatherData);
      setError(null); // clear old error if success
    } catch (err) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    setLoading({
      ...loading,
      state: true,
      message: "Finding location...",
    });

    if (selectedLocation) {
      console.log(selectedLocation.latitude);
      if (!ignore) {
        fetchWeatherData(latitude, longitude);
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!ignore) {
            fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
          }
        },
        (err) => {
          setError("Geolocation failed: " + err.message);
          setLoading({
            state: false,
            message: "",
          });
        }
      );
    }

    return () => (ignore = true);
  }, [latitude, longitude, selectedLocation]);

  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
