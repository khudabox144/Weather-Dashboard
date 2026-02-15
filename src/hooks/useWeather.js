import { useCallback, useContext, useEffect, useState } from "react";
import { searchLocationContext } from "../context";

const processWeatherResponse = (data) => ({
  location: data?.name,
  climate: data?.weather?.[0]?.main,
  temperature: data?.main?.temp,
  maxTemperature: data?.main?.temp_max,
  minTemperature: data?.main?.temp_min,
  humidity: data?.main?.humidity,
  cloudPercentage: data?.clouds?.all,
  wind: data?.wind?.speed,
  time: data?.dt,
  longitude: data?.coord?.lon,
  latitude: data?.coord?.lat,
});

const useWeather = () => {
  const { selectedLocation } = useContext(searchLocationContext);

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

  const fetchWeatherData = useCallback(async (lat, lon) => {
    setLoading({ state: true, message: "Fetching weather data..." });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(processWeatherResponse(data));
      setError(null);
    } catch (err) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading({ state: false, message: "" });
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (cityName) => {
    setLoading({ state: true, message: "Fetching weather data..." });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${cityName}" not found. Please try another location.`);
        }
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(processWeatherResponse(data));
      setError(null);
    } catch (err) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading({ state: false, message: "" });
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    if (selectedLocation?.name) {
      const { latitude, longitude } = selectedLocation.name;
      if (latitude && longitude && !ignore) {
        fetchWeatherData(latitude, longitude);
      }
    } else if (selectedLocation?.cityName) {
      if (!ignore) fetchWeatherByCity(selectedLocation.cityName);
    } else {
      setLoading({ state: true, message: "Finding location..." });
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
          setLoading({ state: false, message: "" });
        }
      );
    }

    return () => {
      ignore = true;
    };
  }, [selectedLocation, fetchWeatherData, fetchWeatherByCity]);

  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
