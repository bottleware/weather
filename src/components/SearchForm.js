import React from 'react';

const SearchForm = props => {

    const inputClass = () => {
        return "formInput bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white mr-2";
    }

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
                    placeholder="City"
                    id="city"
                    className = {inputClass()}
                    required
                    onChange={(e) => updateCity(e.target.value)}/>

                <input 
                    type="text" 
                    placeholder="State"
                    id="state"
                    className = {inputClass()}
                    onChange={(e) => updateState(e.target.value)}/>

                <input 
                    type="text"
                    placeholder="Country" 
                    id="country"
                    className = {inputClass()}
                    onChange={(e) => updateCountry(e.target.value)}/>
            </form>
        </div>
    );
}

export default SearchForm