import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
  const {
    setCity, setCountry, setState, search,
  } = props;

  const inputClass = () => 'formInput bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white mr-2';

  const updateCity = (city) => {
    setCity(city);
  };

  const updateState = (state) => {
    setState(state);
  };

  const updateCountry = (country) => {
    setCountry(country);
  };

  return (
    <div id="formDiv">
      <form>
        <input
          type="text"
          placeholder="City"
          id="city"
          className={inputClass()}
          required
          onChange={(e) => updateCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="State"
          id="state"
          className={inputClass()}
          onChange={(e) => updateState(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          id="country"
          className={inputClass()}
          onChange={(e) => updateCountry(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded w-100 mr-10"
          onClick={(e) => search(e)}
        >
          Search
        </button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  setCity: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default SearchForm;
