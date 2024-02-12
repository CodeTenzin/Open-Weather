import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import useOpenMaps from "./hooks/useOpenMaps";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

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
  const today1 = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today1.toLocaleDateString("en-US", options);

  const [city, setCity] = useState("");
  const { weather, isLoading, error, fetchWeather } = useOpenMaps(city);
  const { transcript, isListening, startListening, hasRecognitionSupport } =
    useSpeechRecognition();

  const [isCitySetFromTranscript, setIsCitySetFromTranscript] = useState(false);

  console.log(transcript);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetchWeather();
    // console.log(city);
  };

  return (
    <>
      {/* {!transcript && setCity(transcript)} */}
      <div className="container">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <h1 className="header">{formattedDate}</h1>

        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <input
              type="text"
              placeholder="City"
              value={transcript || city}
              onChange={(event) => setCity(event.target.value)}
            />
            <button>Get Weather</button>
            {hasRecognitionSupport ? (
              <>
                <button className="speech" onClick={startListening}>
                  Speak
                </button>
                {isListening && <p>Your browser is currently listening...</p>}
              </>
            ) : (
              <p>NOT SUPPORTED</p>
            )}
          </div>
        </form>

        {weather && (
          <div>
            <div className="container-info">
              <p className="grid-item grid-item-weather">
                {
                  <img
                    width="28"
                    height="28"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    className="img-temperature"
                  />
                }
                <span className="line-break weather-numbers">
                  {weather.main.temp}°C
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
                {<img width="28" height="28" src={"./src/assets/clouds.png"} />}
                <span className="line-break">Clouds</span>
                <span className="line-break weather-numbers">
                  {weather.clouds.all} %
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
