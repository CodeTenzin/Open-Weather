import axios, { CanceledError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import "./App.css";

// https://openweathermap.org/current
/*
  Endpoint:
 `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={API_KEY}`
 */

/*
  {weatherData.main.temp} °F
  {weatherData.weather[0].description}
  {weatherData.main.feels_like} °F
  {weatherData.main.humidity} %
  {weatherData.wind.speed} mph
*/

function App() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  // const month = String(today.getMonth() + 1).padStart(2, "0");
  const month = String(today.getMonth()).padStart(2, "0");
  // const year = today.getFullYear();

  useEffect(() => {
    setLoading(true);
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ceb16806249418e1704b7dca064ec279`
      )
      .then((res) => {
        setLoading(false);
        setWeather(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        // setError(err.message);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetchWeather();
    // console.log(city);
  };

  return (
    <>
      <div className="container">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <h1 className="header">
          {daysOfWeek[parseInt(day)]}
          {", "}
          <span className="header-date">
            {day} {monthNames[parseInt(month)]}
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <input
              type="text"
              placeholder="City"
              onChange={(event) => setCity(event.target.value)}
            />
            <button>Get Weather</button>
          </div>
        </form>

        {weather && (
          <div>
            <div className="container-info">
              <p className="grid-item">
                {
                  <img
                    width="28"
                    height="28"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    className="img-temperature"
                  />
                }
                <span className="line-break weather-numbers">
                  {weather.main.temp}°
                </span>
                <span className="weather-numbers">
                  {weather.weather[0].description}
                </span>
              </p>

              <p className="grid-item">
                {
                  <img
                    width="28"
                    height="28"
                    src={"./src/assets/temperature.png"}
                  />
                }
                <span className="line-break">Feels like</span>
                <span className="line-break weather-numbers">
                  {weather.main.feels_like}°
                </span>
              </p>
              <p className="grid-item">
                {
                  <img
                    width="28"
                    height="28"
                    src={"./src/assets/humidity.png"}
                  />
                }
                <span className="line-break">Humidity</span>
                <span className="line-break weather-numbers">
                  {weather.main.humidity}%
                </span>
              </p>
              <p className="grid-item">
                {<img width="28" height="28" src={"./src/assets/wind.png"} />}
                <span className="line-break">Wind speed</span>
                <span className="line-break weather-numbers">
                  {weather.wind.speed} mph
                </span>
              </p>
              <p className="grid-item">
                {
                  <img
                    width="28"
                    height="28"
                    src={"./src/assets/sunrise.png"}
                  />
                }
                <span className="line-break">Sunrise</span>
                <span className="line-break weather-numbers">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </span>
              </p>
              <p className="grid-item">
                {<img width="28" height="28" src={"./src/assets/sunset.png"} />}
                <span className="line-break">Sunset</span>
                <span className="line-break weather-numbers">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
