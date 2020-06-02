import React from 'react';
import Temperature from './Temperature';
import Message from './Message';

const WeatherDisplay = (props) => {
  if (props.weather && props.weather.cod !== 200) {
    return <Message message="Error! Location not found. Try being more specific or try another location."/>;
  }
  if (props.weather !== undefined) {
    return <Temperature weather={props.weather} unit={props.unit}/>;
  } 
  return <Message message="Enter a city to see today's weather."/>;
};

export default WeatherDisplay;
