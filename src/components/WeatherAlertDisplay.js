import React from 'react';
import WeatherAlert from './WeatherAlert';
import Message from './Message';

const WeatherAlertDisplay = (props) => {
    return (
        <div>
            {(props.alerts.alerts !== []) ?
                props.alerts.alerts.map((alert, index) => (
                    <WeatherAlert alert={alert} key={index}/>
                )) :
                <Message message="No alerts to display~"/>
            }
        </div>
    );
};

export default WeatherAlertDisplay;