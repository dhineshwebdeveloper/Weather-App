import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from "./assets/search.png";
import sunIcon from "./assets/sun.png";
import humitidyIcon from "./assets/humidity.png";
import windIcon from "./assets/winds.png";
import cloundIcon from "./assets/cloundIcon.png";
import drizzleIcon from "./assets/drizzleIcon.png";
import snowIcon from "./assets/snowIcon.png";
import rainIcon from "./assets/rainIcon.png";


const WeatherDeatils = ({ icon, temp, city, country,
  lat, log, humidity, wind
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="sun" />
      </div>
      <div className="temp">
        {temp}°C
      </div>
      <div className="location">
        {city}
      </div>
      <div className="country">
        {country}
      </div>
      <div className="cord">
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longtude</span>
          <span>{log}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humitidyIcon} alt="" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

// WeatherDeatils.propTypes = {
//   icon: propTypes.string.isRequired,
//   temp: propTypes.number.isRequired,
//   city: propTypes.string.isRequired,
//   country: propTypes.string.isRequired,
//   humidity: propTypes.number.isRequired,
//   let: propTypes.number.isRequired,
//   log: propTypes.number.isRequired
// }

function App() {

  const [text, setTexrt] = useState("chennai")
  const [cityNOtFonut, setcityNOtFonut] = useState(false)
  const [loading, setloading] = useState(false)
  const [icon, setIcon] = useState(snowIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("")
  const [country, setcountry] = useState("")
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [erorr, setErorr] = useState(null);

  const weatherIconMap = {
    "01d": sunIcon,
    "01n": snowIcon,
    "02d": cloundIcon,
    "02n": cloundIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  const sreach = async () => {
    setloading(true)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=b923b686f021ecd5254b6c80f6638a19&units=Metric`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data.cod === 200) {
        console.log("Weather Data:", data);
      }
      else {
        console.error("Error:", data.message);
      }
      if (data.cod === "404") {
        console.error("city not fount")
        setcityNOtFonut(true)
        setloading(false)
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setcountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || sunIcon);
      setcityNOtFonut(false);
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setErorr("An erorr Occurred while fetching weathe data.")
    } finally {
      setloading(false)
    }
  }


  const handlecity = (e) => {
    setTexrt(e.target.value)
  }

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      sreach()
    }
  }

  useEffect(function () {
    sreach();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput"
            placeholder='search City' onChange={handlecity}
            value={text} onKeyDown={handleKeydown} />
          <div className="search-icon" onClick={() => {
            sreach()
          }}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
       {!loading && !cityNOtFonut && <WeatherDeatils icon={icon} temp={temp}
          city={city} country={country} lat={lat} log={log}
          humidity={humidity} wind={wind} />}
       {loading && <div className="loading-message">
          loading.....
        </div>}
       {erorr &&<div className="erorr-message">
          {erorr}
        </div>}
       {cityNOtFonut && <div className="city-not-fount">
          City Not Fount
        </div>}
        <p className="copyright">Designed by <span>Dhinesh Web</span></p>

      </div>

    </>
  )
}
export default App
