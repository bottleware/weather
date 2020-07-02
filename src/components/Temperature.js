// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

 /**
 * Displays weather information about a location.
 * @component
 * @param {object} props
 * @param {boolean} props.unit true/false to display Celsius or Fahrenheit
 * @param {object} props.weather the weatherData from the Library component
 */
const Temperature = (props) => {
  const { unit, weather } = props;

  /**
   * Converts Kelvin to the unit determined from the props.
   * @param {number} kelvinTemp 
   * @return {number} returns the converted temperature
   */
  const kToTemp = (kelvinTemp) => {
    if (unit === true) {
      return Math.round(((kelvinTemp - 273.15) * (9 / 5)) + 32);
    }
    return Math.round(kelvinTemp - 273.15);
  };

  /**
   * Gets the weather icon from props.weather.
   * @return {object} {icon link, weather description, weather alt text}
   */
  const weatherIcon = () => {
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const alt = `weather icon ${weather.weather[0].icon}`;
    const { description } = weather.weather[0];
    return { icon, description, alt };
  };

  const tempSymbol = (unit === true ? 'F' : 'C');

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5 bg-white">
      <img src={weatherIcon().icon} alt={weatherIcon().alt} />
      <div className="px-6 pb-4">
        <div className="font-bold text-xl mb-2">{weatherIcon().description}</div>
        <p className="text-gray-700 text-base">
          {kToTemp(weather.main.temp)}
          °
          {tempSymbol}
        </p>
      </div>
    </div>
  );
};

Temperature.propTypes = {
  weather: PropTypes.object.isRequired,
  unit: PropTypes.bool.isRequired,
};

export default Temperature;
