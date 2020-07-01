// @ts-check
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

/**
 * This component is the main component that all the others are rendered in.
 * @component
 */
const Library = () => {
  const [weatherData, setWeatherData] = useState();
  const [tempUnit, setTempUnit] = useState(false);
  const [background, setBackground] = useState(`url(${evening})`);
  const [weatherAlerts, setWeatherAlerts] = useState({});
  const {openweatherKey, weatherbitKey} = keys;

  /**
   * Make a call to the openweather API based on the input fields. Sets weatherData's state based on the result.
   * @param {object} search {city, state, country}
   * @param {string} search.city from the city input field
   * @param {string} search.state from the state input field
   * @param {string} search.country from the country input field
   */
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

/**
 * Makes a call to weatherbit's API to get weather alerts based on the location searched. Sets weatherAlert's state based on the result.
 * @param {object} search {city, state, country}
 * @param {string} search.city from the city input field
 * @param {string} search.state from the state input field
 * @param {string} search.country from the country input fields
 */
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

  /**
   * Makes a call to openweather's API based on geolocation.
   * @param {object} location {latitude, longtitude}
   * @param {number} location.latitude
   * @param {number} location.longitude
   */
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

  /**
   * Makes a call to weatherbit's API to get weather alerts based on geolocation. Sets weatherAlert's state based on the result.
   * @param {object} location {latitude, longtitude}
   * @param {number} location.latitude
   * @param {number} location.longitude
   */
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

  /**
   * When the user first opens the app, this attempts to set weatherData and weatherAlerts based on their geolocation if they allow it. Only meant to run once per visit when a user first opens the page.
   */
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

  /**
   * Attempts to update the background image whenever weatherData is changed by getting the time from the new location.
   */
  useEffect(() => {
    if (weatherData !== undefined) {
      // @ts-ignore
      setBackground(bgTimeColor(weatherData.timezone));
    }
  }, [weatherData]);


  /**
   * Fired when the search button is pressed. Gets the weather & weather alerts based on the weather parameter.
   * @param {object} weather from the input fields
   * @param {string} weather.city
   * @param {string} weather.state
   * @param {string} weather.country
   * @returns {void}
   */
  const clickSearch = (e, weather) => {
    e.preventDefault();
    getWeather(weather);
    getWeatherAlerts(weather);
  };

  /**
   * Based on a location's UTC Offset, convert that to the 24-hour clock. If no time is passed in, use the user's location. Sets the background based on the result for the time of day.
   * @param {number} searchSecondsUTCOffset weatherData.timezone
   */
  const bgTimeColor = (searchSecondsUTCOffset = undefined) => {
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
        {/* @ts-ignore */}
        {weatherAlerts.alerts ?
          <WeatherAlertDisplay alerts={weatherAlerts}/>
        : <Message message="No alerts to display..."/>}
      </div>
    </div>
  );
}

export default Library;
