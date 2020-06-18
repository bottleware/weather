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

  // search is an object of the form {city, state, country}
  const getWeather = async (search) => {
    let response;
    try {
      if (search.city === '') {
        throw new Error('Need a city..');
      } else if (search.state && search.country) {
        response = await fetch(`/data/2.5/weather?q=${search.city},${search.state},${search.country}&appid=${key}`);
      } else if (search.state) {
        response = await fetch(`/data/2.5/weather?q=${search.city},${search.state}&appid=${key}`);
      } else {
        response = await fetch(`/data/2.5/weather?q=${search.city}&appid=${key}`);
      }

      setWeatherData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  // location is of the type {latitude, longitude}
  const getGeoWeather = async (location) => {
    let response;
    const { latitude, longitude } = location;
    try {
      if (latitude && longitude) {
        response = await fetch(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`);
      }
      setWeatherData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setPosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      getGeoWeather({ latitude, longitude });
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      }
    };

    getCurrentLocation();
  }, []);


  const clickSearch = (e) => {
    e.preventDefault();
    getWeather(weather);
  };

  return (
    <div className="h-screen pt-64">
      <div
        id="header"
        className="flex justify-center"
      >
        <SearchForm
          setCity={setCity}
          setState={setState}
          setCountry={setCountry}
          search={clickSearch}
        />
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
          onClick={() => setTempUnit(!tempUnit)}
        >
          {tempUnit ? '°F' : '°C'}
        </button>
      </div>
      <div className="flex justify-center pt-8">
        <WeatherDisplay weather={weatherData} unit={tempUnit} />
      </div>
    </div>
  );
}

export default Library;
