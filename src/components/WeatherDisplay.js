import React from 'react';
import PropTypes from 'prop-types';
import Temperature from './Temperature';
import Message from './Message';

 /**
 * Determines whether to display weather data if the location was valid or exists, or a message if not.
 * @component
 * @param {object} props
 * @param {object} props.weather weather data from the openweather API
 * @param {boolean} props.unit determines whether to display in Celsius or Fahrenheit
 */
const WeatherDisplay = (props) => {
  const { weather, unit } = props;

  if (weather && weather.cod !== 200) {
    return <Message message="Error! Location not found. Try being more specific or try another location." />;
  }
  if (weather !== undefined) {
    return <Temperature weather={weather} unit={unit} />;
  }

  return <Message message="Enter a city to see today's weather." />;
};

WeatherDisplay.propTypes = {
  weather: PropTypes.object,
  unit: PropTypes.bool.isRequired,
};

export default WeatherDisplay;
