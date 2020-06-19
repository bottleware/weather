import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import WeatherDisplay from './WeatherDisplay';
import key from '../key';

import morning from '../assets/morning.webp';
import afternoon from '../assets/afternoon.webp';
import evening from '../assets/evening.webp';
import night from '../assets/night.webp';

function Library() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [tempUnit, setTempUnit] = useState(false);
  const [background, setBackground] = useState(`url(${evening})`);

  const weather = {
    city,
    state,
    country,
  };

  // @param search is of the type {city, state, country}
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

  // @param location is of the type {latitude, longitude}
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
    setBackground(bgTimeColor());
  }, []);

  useEffect(() => {
    if (weatherData !== undefined) {
      setBackground(bgTimeColor(weatherData.timezone));
    }
  }, [weatherData]);


  const clickSearch = (e) => {
    e.preventDefault();
    getWeather(weather);
  };

  const bgTimeColor = (searchSecondsUTCOffset) => {
    let time;
    const hoursOffset = (searchSecondsUTCOffset / 60) / 60;
    if (searchSecondsUTCOffset === undefined) {
      time = new Date().getHours()
    } else {
      hoursOffset >= 0 ? time = Math.abs(new Date().getUTCHours() + (Math.abs(hoursOffset))) % 24 : time =  Math.abs(new Date().getUTCHours() - (Math.abs(hoursOffset)));
    }

    const morningStart = 6;
    const afternoonStart = 12;
    const eveningStart = 17;

    if (time < morningStart || time > eveningStart) {
      return `url(${night})`;
    }
    if (time < afternoonStart) {
      return `url(${morning})`;
    }
    if (time < eveningStart) {
    return `url(${afternoon})`;
    }
    return `url(${evening})`;
  };

  return (
    <div className='App w-full h-full bg-cover' style={{backgroundImage: background}}>
      <div className='mx-1'>
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
          <div className="inline-flex">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setTempUnit(!tempUnit)}
            >
              {tempUnit ? '°F' : '°C'}
            </button>
          </div>
        </div>
        <WeatherDisplay weather={weatherData} unit={tempUnit} />
      </div>
    </div>
  );
}

export default Library;
