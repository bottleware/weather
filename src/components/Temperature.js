import React from 'react';

const Temperature = (props) => {
  const kToTemp = (kelvinTemp) => {
    if (props.unit === true) {
      return Math.round(((kelvinTemp - 273.15) * 9 / 5) + 32);
    }
    return Math.round(kelvinTemp - 273.15);
  };

  // Determines & returns the weather icon
  const weatherIcon = () => {
    const icon = `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`;
    const alt = `weather icon, ${props.weather.weather[0].icon}`;
    const description = props.weather.weather[0].description;
    return {icon, description, alt};
  };

  const tempSymbol = (props.unit === true ? 'F' : 'C');

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5">
        <img src={weatherIcon().icon} alt="Sunset in the mountains"/>
        <div className="px-6 pb-4">
          <div className="font-bold text-xl mb-2">{weatherIcon().description}</div>
          <p className="text-gray-700 text-base">
            {kToTemp(props.weather.main.temp)}
            °
            {tempSymbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Temperature;
