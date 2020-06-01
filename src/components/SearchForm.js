import React from 'react';

const SearchForm = props => {

    const updateCity = city => {
        props.setCity(city);
    }

    const updateState = state => {
        props.setState(state);
    }

    const updateCountry = (country) => {
        props.setCountry(country);
    }

    return (
        <div id="formDiv">
            <form>
                <input 
                    type="text"
                    placeholder="City" id="city"
                    className="formInput"
                    required
                    onChange={(e) => updateCity(e.target.value)}/>

                <input 
                    type="text" 
                    id="state"
                    placeholder="State"
                    onChange={(e) => updateState(e.target.value)}/>

                <input 
                    type="text"
                    placeholder="Country" 
                    id="country"
                    onChange={(e) => updateCountry(e.target.value)}/>
            </form>
        </div>
    );
}

export default SearchForm