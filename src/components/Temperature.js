import React from 'react';
import PropTypes from 'prop-types';

 /**
 * Creates the Temperature component.
 * @component
 */
const Temperature = (props) => {
  const { unit, weather } = props;

  const kToTemp = (kelvinTemp) => {
    if (unit === true) {
      return Math.round(((kelvinTemp - 273.15) * (9 / 5)) + 32);
    }
    return Math.round(kelvinTemp - 273.15);
  };

  // Determines & returns the weather icon
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
