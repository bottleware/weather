import React, { useState } from 'react';
import SearchForm from './SearchForm';
import WeatherDisplay from './WeatherDisplay';
import key from '../key';

function Library() {

  // let weatherData;
  let [weatherData, setWeatherData] = useState();
  // let [searchInput, setSearchInput] = useState();
  let [city, setCity] = useState();
  let [state, setState] = useState();
  let [country, setCountry] = useState();
  let [tempUnit, setTempUnit] = useState(false);

  const weather = {
    city,
    state,
    country
  };

  const getWeather = async (search) => {
    let response;
    try {
      if(!search.city) {
        throw new Error('Need a city..');
      }
      if(search.state && search.country) {
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.state},${search.country}&appid=${key}`);
      } else if(search.state) {
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.state}&appid=${key}`);
      } else {
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.city}&appid=${key}`);
      }

      setWeatherData(await response.json());

    } catch(error) {
      console.log(error);
    }
  }

  const clickSearch = () => {
    getWeather(weather);
  }

  return (
    <div className="App">
      <div id="header">
        <SearchForm setCity={setCity}
                    setState={setState}
                    setCountry={setCountry}
        />
        <button type="submit" 
                className="submit" 
                onClick={() => clickSearch()}
        >
                Search
        </button>
        
        <label className="switch">
          <input type="checkbox" onClick={() => setTempUnit(!tempUnit)}/>
          <span className="slider round"></span>
        </label>
      </div>
      <WeatherDisplay weather={weatherData} unit={tempUnit}/>
    </div>
  );
}

export default Library;
