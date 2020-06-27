import React from 'react';

const WeatherAlert = (props) => {
    const {alert} = props;
    console.log(alert);
    return (
        <div className="w-full rounded overflow-hidden shadow-lg mt-5 bg-white">
            <h4>{alert.title}</h4>
            <p>{alert.description}</p>
        </div>
    );
};

export default WeatherAlert;