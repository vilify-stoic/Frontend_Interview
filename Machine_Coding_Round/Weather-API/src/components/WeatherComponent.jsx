import React from "react";

const WeatherComponent = ({ weatherData }) => {
  const { wind, main, dt_txt, weather } = weatherData;

  return (
    <>
      <div className="weather-card">
        <div className="weather-card-top">
          <p>
            {" "}
            Time{" "}
            {weatherData.dt_txt == null
              ? new Date().toLocaleTimeString()
              : new Date(dt_txt).toLocaleTimeString()}
          </p>
        </div>
        <div className="weather-card-left">
          <p>Weather Description: {weather ? weather[0]?.main : "None"}</p>
          <p>Current Temp: {main?.temp}</p>
          <p>Max Temp: {main?.temp_max}</p>
          <p>Min Temp: {main?.temp_min}</p>
        </div>
        <div className="weather-card-right">
          <p>FeelsLike: {main?.feels_like}</p>
          <p>Humidity: {main?.humidity}%</p>
          <p>Pressure: {main?.pressure} mb</p>
          <p>Wind Speed: {wind?.speed} km/h</p>
        </div>
      </div>
      <div className="weather-card-bottom"></div>
    </>
  );
};

export default WeatherComponent;
