import React from 'react';

const WeatherAlert = (props) => {
    const {alert} = props;
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5 bg-white">
            <h4>{alert.title}</h4>
            <p>{alert.description}</p>
        </div>
    );
};

export default WeatherAlert;