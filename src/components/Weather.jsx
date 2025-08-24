import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name!");
      return;
    }
    try {
      // ✅ Call Netlify function instead of OpenWeather API directly
      const url = `/.netlify/functions/weather?city=${city}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert("City not found!");
        return;
      }

      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Los Angeles");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" ref={inputRef} placeholder="Search" />
        <button onClick={() => search(inputRef.current.value)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="weather icon" className="sun-icon" />
          <p className="temp">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/weather/drop-white-icon.svg"
                alt=""
              />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img
                src="https://icons.veryicon.com/png/o/weather/color-weather/wind-6.png"
                alt=""
              />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
