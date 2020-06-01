import React from 'react';
import Temperature from './Temperature';
import Message from './Message';

const WeatherDisplay = (props) => {
    if(props.weather !== undefined) {
        return <Temperature weather={props.weather} unit={props.unit}/>
    } else {
        return <Message/>
    }
}

export default WeatherDisplay 