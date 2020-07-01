// @ts-check
import React, {useState} from 'react';
import PropTypes from 'prop-types';

 /**
 * Displays a single weather alert from the weatherbit API.
 * @component
 * @param {object} props
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

WeatherAlert.propTypes = {
    alert: PropTypes.object.isRequired,
};

export default WeatherAlert;