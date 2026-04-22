import { useState } from 'react'
import './App.css'

function App() {

  const [city, setCity] = useState('ujjain');
  const [weather, setWeather] = useState();
  let url = `https://api.weatherapi.com/v1/current.json?key=2fefa3903b8340b8aa1112851261704&q=${city}&aqi=yes`;
  const submitHandler = async (e) => {
    e.preventDefault()


    let response = await fetch(url)
    let data = await response.json();

    console.log("submitted");
    console.log(data);
    setWeather(data);
  }

  return (
    <div className={`app ${weather?.current?.condition?.text?.toLowerCase()}`}>
      <div className='container'>

        <form onSubmit={submitHandler} className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <button>🔍</button>
        </form>

        {weather && (
          <div className="weather-card">

            <div className="top">
              <h2>{weather.location.name}, {weather.location.region}</h2>
              <p>{weather.location.localtime}</p>
            </div>

            <div className="middle">
              <img src={weather.current.condition.icon} alt="weather" />
              <div>
                <h1>{weather.current.temp_c}°C</h1>
                <h3>{weather.current.temp_f}°F</h3>
                <p>{weather.current.condition.text}</p>
              </div>
            </div>

            <div className="grid">
              <div className="card">
                <h4>💨 Wind</h4>
                <p>{weather.current.wind_kph} kph</p>
                <span>{weather.current.wind_mph} mph</span>
              </div>

              <div className="card">
                <h4>💧 Humidity</h4>
                <p>{weather.current.humidity}%</p>
              </div>

              <div className="card">
                <h4>🧭 Direction</h4>
                <p>{weather.current.wind_dir}</p>
              </div>

              <div className="card">
                <h4>🌥 Cloud</h4>
                <p>{weather.current.cloud}%</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default App
