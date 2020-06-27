import React, {useState} from 'react';

const WeatherAlert = (props) => {
    const {alert} = props;
    const [collapsed, setCollapsed] = useState(true);
    console.log("loaded a weather alert");

    return (
        <div className="w-full rounded overflow-hidden shadow-lg mt-5 bg-white">
            <div className="flex">
                <h4>{alert.title}</h4>
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