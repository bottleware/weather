import React from 'react';

const Temperature = props => {

    const kToTemp = kelvinTemp => {
        if(props.unit === true) {
            return Math.round(((kelvinTemp - 273.15)*9/5)+32)
        } else {
            return Math.round(kelvinTemp - 273.15)
        }
    }

    const tempSymbol = (props.unit === true ? 'F' : 'C');

    return (
        <div className="info">
            <p>Temperature: {kToTemp(props.weather.main.temp)}°{tempSymbol}</p>
            <p>Max temperature: {kToTemp(props.weather.main.temp_max)}°{tempSymbol}</p>
            <p>Min temperature: {kToTemp(props.weather.main.temp_min)}°{tempSymbol}</p>
        </div>
    );
}

export default Temperature