// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import Temperature from './Temperature';
import Message from './Message';

 /**
 * Determines whether to display weather data if the location was valid, or a message if not.
 * @component
 * @param {object} props
 * @param {object} props.weather weather data from the openweather API
 * @param {boolean} props.unit determines whether to display in Celsius or Fahrenheit
 */
const WeatherDisplay = (props) => {
  const { weather, unit } = props;

  if (weather && !weather.lat) {
    return <Message message="Error! Location not found. Try being more specific or try another location." />;
  }
  return <Temperature weather={weather} unit={unit} />;
};

WeatherDisplay.propTypes = {
  weather: PropTypes.object,
  unit: PropTypes.bool.isRequired,
};

export default WeatherDisplay;
