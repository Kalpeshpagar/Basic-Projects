// hooks/useWeather.js
import { useState, useCallback } from "react";

const BASE_URL = "http://api.weatherapi.com/v1/current.json";
const API_ID = import.meta.env.VITE_API_ID
console.log(API_ID)
export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}?key=${API_ID}&q=${city}&aqi=no`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
};
