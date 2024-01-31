import axios, { CanceledError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import "./App.css";

// https://openweathermap.org/current

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={API_KEY}`

/*
{weatherData.main.temp} °F
{weatherData.weather[0].description}
{weatherData.main.feels_like} °F
{weatherData.main.humidity} %
{weatherData.wind.speed} mph
*/

// TODO: double click for updated icons.

function App() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [descriptionIcon, setDescriptionIcon] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
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
  const d = new Date();
  const dayOfWeek = daysOfWeek[d.getDay()];
  const dayOfMonth = d.getDay();
  const month = d.getMonth();

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
        setDescriptionIcon(weather.weather[0].icon);
        console.log(res.data);

        getDate(weather.sys.sunrise, weather.sys.sunset);
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
    console.log(city);
  };

  const getDate = (sunrise: number, sunset: number) => {
    const sunriseDate = new Date(sunrise * 1000);
    setSunrise(sunriseDate.toLocaleTimeString());

    const sunsetDate = new Date(sunset * 1000);
    setSunset(sunsetDate.toLocaleTimeString());
  };

  return (
    <>
      <div className="container">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <h1 className="header">
          {dayOfWeek},
          <span className="header-date">
            {dayOfMonth < 10
              ? ` 0${dayOfMonth} ${monthNames[month]}`
              : ` ${dayOfMonth} ${monthNames[month]}`}
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
                    src={`https://openweathermap.org/img/wn/${descriptionIcon}@2x.png`}
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
                <span className="line-break weather-numbers">{sunrise}</span>
              </p>
              <p className="grid-item">
                {<img width="28" height="28" src={"./src/assets/sunset.png"} />}
                <span className="line-break">Sunset</span>
                <span className="line-break weather-numbers">{sunset}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
