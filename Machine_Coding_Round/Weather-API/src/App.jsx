import "./styles.css";
import ButtonList from "./components/Button";
import WeatherComponent from "./components/WeatherComponent";
import { useEffect, useState } from "react";
import cityData from "./utils/CityData";
import { apiKey, todayAPI, hourlyAPI } from "./utils/UrlTimeDetails";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState(cityData[0]);
  const [timeDetails, setTimeDetails] = useState("Today");
  const [pageNumber, setPageNumber] = useState(1);


  const handleSetTimeDetails = (time) => {
    setTimeDetails(time);
  };

  const getWeatherData = async () => {
    const url =
      timeDetails === "Today"
        ? `${todayAPI}=${city}&appid=${apiKey}`
        : `${hourlyAPI}=${city}&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const resData = data.list ? data.list : data;
    setWeatherData(resData);
  };

  function setPage(pageNo) {
    if (pageNo >= 1 && pageNo <= weatherData.length / 4 && pageNumber != pageNo)
      setPageNumber(pageNo);
  }

  useEffect(() => {
    getWeatherData();
  }, [city, timeDetails]);

  return (
    <div className="App">
      <div className="header">
        <h3>Home.LLC Weather Forecast </h3>
        <p>{city}</p>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cityData.map((city, index) => {
            return (
              <option key={index} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <ButtonList handleSetTimeDetails={handleSetTimeDetails} />
      </div>
      <div className="weather-heading">
        <p>
          Date:{" "}
          {weatherData.dt_txt == null
            ? new Date().toLocaleDateString()
            : new Date(dt_txt).toLocaleDateString()}
        </p>
        <h3>Place: {city}</h3>
      </div>
      <div>
        {weatherData.length > 0 ? (
          weatherData.slice(pageNumber*4-4, pageNumber*4).map((data, key) => (
            <WeatherComponent index={key} weatherData={data} city={city} />
          ))
        ) : (
          <WeatherComponent weatherData={weatherData} city={city} />
        )}
      </div>

       {weatherData.length > 0 ? 
        (<div className="pagination">
        <span
          className={pageNumber <= 1 ? "pagination__disable" : ""}
          onClick={() => setPage(pageNumber - 1)}
        >
          ◀️{" "}
        </span>
        {[...Array(weatherData?.length / 4)].map((prod, index) => {
          return (
            <span
              className={index + 1 == pageNumber ? "selected" : ""}
              key={index}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          onClick={() => setPage(pageNumber + 1)}
          className={
            pageNumber >= weatherData.length / 4 ? "pagination__disable" : ""
          }
        >
          ▶️{" "}
        </span>
      </div>): ""}
    </div>
  );
}
