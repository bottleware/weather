// @ts-check
import React from 'react';
import WeatherAlert from './WeatherAlert';
import Message from './Message';

 /**
 * Displays all of the weather alerts from the weatherbit API by making each alert into its own WeatherAlert component.
 * @component
 * @param {object} props
 * @param {object} props.alerts an object from the weatherbit API that has an array of alerts 
 */
const WeatherAlertDisplay = (props) => {
    return (
        <div className="mt-1 rounded">
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