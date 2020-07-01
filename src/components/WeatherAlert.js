// @ts-check
import React, {useState} from 'react';

 /**
 * Displays a single weather alert from the weatherbit API.
 * @component
 * @param {object} props
 * @param {number} props.key a unique key number for each alert
 * @param {object} props.alert an alert object from the weatherbit API
 */
const WeatherAlert = (props) => {
    const {alert} = props;

    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="w-full rounded overflow-hidden shadow-lg mt-5 bg-white">
            <div className="flex my-2 mx-1">
                <h4 className="max-w-2xl">{alert.title}</h4>
                <button className="ml-3" onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'EXPAND' : 'COLLAPSE'}</button>
            </div>
            {!collapsed && 
                <div className="collapse">
                <p>{alert.description}</p>
            </div>
            }
        </div>
    );
};

export default WeatherAlert;