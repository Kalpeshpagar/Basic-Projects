import React from "react";
import { useState,useEffect } from "react";
import { useWeather } from "./useWeather";
import WeatherCard from "./WeatherCard";
import './weather.css'

const Weather = () => {
    const [city, setCity] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    
  const { weather, loading, error, fetchWeather } = useWeather();

  // 🔹 Debounce logic
  useEffect(() => {
    if (!city.trim()) return;

    const timer = setTimeout(() => {
      fetchWeather(city);
    }, 700); // debounce delay (700ms)

    return () => clearTimeout(timer); // cleanup
  }, [city, fetchWeather]);
    
     useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
        <button
  onClick={() => setDarkMode(prev => !prev)}
  style={{ marginBottom: "12px" }}
>
  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <WeatherCard
        loading={loading}
        error={error}
        weather={weather}
      />
    </div>
  );
};

export default Weather;