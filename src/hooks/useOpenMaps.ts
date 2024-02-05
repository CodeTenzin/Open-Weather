import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useOpenMaps = (city: string) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

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
  return { weather, isLoading, error, fetchWeather };
};

export default useOpenMaps;
