import React, { useState, useEffect } from "react";
import "./WeatherBody.css"

const WeatherBody = () => {
    
    const [apiData, setApiData] = useState({});
    const [search, setSearch] = useState("Tucson");
    const [city, setCity] = useState("-");
    const [temp, setTemp] = useState("-");
    const [feel, setFeel] = useState("-");
    const [wind, setWind] = useState("-");
    const [humid, setHumid] = useState("-");
    const [caption, setCaption] = useState("-");
    const [icon, setIcon] = useState("-")
    const [unit, setUnit] = useState({ name: "imperial", unitTemp: "\u00b0", unitSpeed: "mph" });
  
    const initCity = ({name, sys, main, wind, weather}) => {
      setApiData({name, sys, main})
      setCity(`${name}, ${sys.country}`)
      setTemp(Math.round(main.temp) + unit.unitTemp)
      setFeel("FEELS LIKE: " + Math.round(main.feels_like) + unit.unitTemp)
      setWind("WIND: " + Math.round(wind.speed) + " " + unit.unitSpeed)
      setHumid("HUMIDITY: " + Math.round(main.humidity) + "%")
      setCaption(weather[0].description)
      setIcon(`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`)
    }
    
    const changeCityHandler = (currentCity) => {
      const API_KEY = process.env.REACT_APP_API_KEY

      if(!currentCity) currentCity = "Tucson"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${unit.name}`;
  
      fetch(url, { mode: "cors" })
        .then((response) => response.json())
        .then((json) => initCity(json))
    }

    const enterInput = (e) => {
      if(e.key === "Enter") {
        e.preventDefault()
        changeCityHandler(search)
      }
    }
  
    useEffect(() => {
      changeCityHandler(search)
    }, []);
  
    const changeUnitsHandler = () => {
      const imperialUnits = { name: "imperial", unitTemp: "\u00b0", unitSpeed: "mph" }
      const metricUnits = { name: "metric", unitTemp: "\u00b0", unitSpeed: "kph" }
  
      if(unit.name === "imperial") {
        setUnit(metricUnits)
      } else {
        setUnit(imperialUnits)
      }
  
      changeCityHandler(city)
    }
  
    return (
      <div id="container">
        {console.log(apiData)}
         <h1 id="header1">WEATHER APP</h1>
         <p id="alert"></p>
          <form id="form1">
            <input type="search" value={search} onKeyDown={(e) => enterInput(e)} onChange={(e) => setSearch(e.target.value)}/>
            <button type="button" onClick={() => changeCityHandler(search)}>&#128270;</button>
          </form>
  
          <div id="content">
              
              <div id="description">
                  <div id="tempContIcon"><img src={icon} alt="img" /></div>
                  <p id="city">{city}</p>
                  <p id="caption">{caption}</p>
                  <p id="temp">{temp}</p>
                  <p id="feel">{feel}</p>
                  <p id="wind">{wind}</p>
                  <p id="humid">{humid}</p>
                  <button onClick={() => changeUnitsHandler()}>F / C</button>
              </div>
        </div>
      </div> 
    );
  };

export default WeatherBody