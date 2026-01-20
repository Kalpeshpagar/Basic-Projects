import React from 'react'
const WeatherCard = ({ loading, error, weather }) => {
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h3>{weather.location.name}</h3>

      <img
        src={`https:${weather.current.condition.icon}`}
        alt={weather.current.condition.text}
        style={{ width: "64px", margin: "8px auto", display: "block" }}
      />

      <div className="weather-details">
        <p>🌡 {weather.current.temp_c}°C</p>
        <p>💨 {weather.current.wind_kph} km/h</p>
        <p>💧 {weather.current.humidity}%</p>
        <p>{weather.current.condition.text}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
