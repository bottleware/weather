import React from 'react';
import PropTypes from 'prop-types';
import Temperature from './Temperature';
import Message from './Message';

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
