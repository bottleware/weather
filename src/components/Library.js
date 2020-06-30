import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import WeatherDisplay from './WeatherDisplay';
import WeatherAlertDisplay from './WeatherAlertDisplay';
import Message from './Message';
import keys from '../key';

import morning from '../assets/morning.webp';
import afternoon from '../assets/afternoon.webp';
import evening from '../assets/evening.webp';
import night from '../assets/night.webp';

const Library = () => {
  const [weatherData, setWeatherData] = useState();
  const [tempUnit, setTempUnit] = useState(false);
  const [background, setBackground] = useState(`url(${evening})`);
  const [weatherAlerts, setWeatherAlerts] = useState({});
  const {openweatherKey, weatherbitKey} = keys;

  // @param search is of the type {city, state, country}
  const getWeather = async (search) => {
    let response;
    try {
      if (search.city === '') {
        throw new Error('Need a city..');
      } else if (search.state && search.country) {
        response = await fetch(`/data/2.5/weather?q=${search.city},${search.state},${search.country}&appid=${openweatherKey}`);
      } else if (search.state) {
        response = await fetch(`/data/2.5/weather?q=${search.city},${search.state}&appid=${openweatherKey}`);
      } else {
        response = await fetch(`/data/2.5/weather?q=${search.city}&appid=${openweatherKey}`);
      }

      setWeatherData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

// @param search is of the type {city, state, country}
  const getWeatherAlerts = async (search) => {
    let response;
    try {
      if (search.city === '') {
        throw new Error('Need a city..');
      } else if (search.state && search.country) {
        response = await fetch(`/v2.0/alerts?city=${search.city}&state=${search.state}&country=${search.country}&key=${weatherbitKey}`);
      } else if (search.state) {
        response = await fetch(`/v2.0/alerts?city=${search.city}&state=${search.state}&key=${weatherbitKey}`);
      } else {
        response = await fetch(`/v2.0/alerts?city=${search.city}&key=${weatherbitKey}`);
      }

      setWeatherAlerts(await response.json());
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
        response = await fetch(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openweatherKey}`);
      }
      setWeatherData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  // @param location is of the type {latitude, longitude}
  const getGeoWeatherAlerts = async (location) => {
    let response;
    const { latitude, longitude } = location;
    try {
      if (latitude && longitude) {
        response = await fetch(`/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`);
      }
      setWeatherAlerts(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setPosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      getGeoWeather({ latitude, longitude });
      getGeoWeatherAlerts({latitude, longitude});
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      }
    };

    getCurrentLocation();
    setBackground(bgTimeColor());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (weatherData !== undefined) {
      setBackground(bgTimeColor(weatherData.timezone));
    }
  }, [weatherData]);


  const clickSearch = (e, weather) => {
    e.preventDefault();
    getWeather(weather);
    getWeatherAlerts(weather);
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
    <div className='App w-full overflow-y-auto bg-cover h-full' style={{backgroundImage: background}}>
      <div className='mx-1'>
        <div
          id="header"
          className="flex justify-start"
        >
          <SearchForm search={clickSearch} />
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
        {weatherAlerts.alerts ?
          <WeatherAlertDisplay alerts={weatherAlerts}/>
        : <Message message="No alerts to display..."/>}
      </div>
    </div>
  );
}

export default Library;
