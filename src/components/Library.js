import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import WeatherDisplay from './WeatherDisplay';
import key from '../key';

function Library() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [tempUnit, setTempUnit] = useState(false);

  const weather = {
    city,
    state,
    country,
  };

  const getCurrentLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }

  const setPosition = (pos) => {
    const {latitude, longitude} = pos.coords;
    getGeoWeather({ latitude, longitude });
  }

  useEffect(() => {
    console.log("hi");
    getCurrentLocation();
  });

  // search is an object of the form {city, state, country}
  const getWeather = async (search) => {
    let response;
    try {
      if (search.latitude && search.longitude) {
        response = await fetch(`api.openweathermap.org/data/2.5/weather?lat=${search.latitude}&lon=${search.longitude}&appid=${key}`);
      }
      else if (search.city === "") {
        throw new Error('Need a city..');
      }
      else if (search.state && search.country) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.state},${search.country}&appid=${key}`);
      }
      else if (search.state) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.state}&appid=${key}`);
      }
      else {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.city}&appid=${key}`);
      }

      setWeatherData(await response.json());
      } catch (error) {
        console.log(error);
    }
  };

  const getGeoWeather = async (location) => {
    let response;
    const {latitude, longitude} = location;
    try {
      if (latitude && longitude) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`);
      }
      setWeatherData(await response.json());
      } catch (error) {
        console.log(error);
    }
  };

  const clickSearch = (e) => {
    e.preventDefault();
    getWeather(weather);
  };

  return (
    <div className="App ml-5">
      <button onClick={getCurrentLocation()}/>
      <div
        id="header"
        className="flex justify-start"
      >
        <SearchForm
          setCity={setCity}
          setState={setState}
          setCountry={setCountry}
          search={clickSearch}
        />
        {/* <button
          type="submit"
          className="bg-gray-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded w-100 mr-10"
          onClick={() => clickSearch()}
        >
          Search
        </button> */}
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => setTempUnit(true)}
          >
            F
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => setTempUnit(false)}
          >
            C
          </button>
        </div>
      </div>
      <WeatherDisplay weather={weatherData} unit={tempUnit}/>
    </div>
  );
}

export default Library;
