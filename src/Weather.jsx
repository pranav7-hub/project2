import React, {useState,useEffect} from 'react';
function Weather() {
    const[weather,setWeather]=useState(null);
    const[loading,setLoading]=useState(true);
    const city="New York";
    const apiKey="f7cdef38a4162e6fb7d12560bab6f5aa"

    useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching weather:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (!weather || weather.cod !== 200) return <p>Weather not found.</p>;

  return (
    <div>
      <h2>🌤️ Weather in {city}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;