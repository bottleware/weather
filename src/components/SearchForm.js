import React, {useState} from 'react';
import PropTypes from 'prop-types';

 /**
 * Creates the SearchForm component. This component houses the form that has the input fields to search for a location and their states.
 * @component
 * @param {object} props
 * @param {Function} props.search searches for a location based on the inputs' current state
 */ 
const SearchForm = (props) => {
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const {search} = props;


  /**
   * Returns the class for the input fields.
   * @return {string}
   */
  const inputClass = () => 'formInput bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white mr-2';

  return (
    <div id="formDiv">
      <form>
        <input
          type="text"
          placeholder="City"
          id="city"
          className={inputClass()}
          required
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="State"
          id="state"
          className={inputClass()}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          id="country"
          className={inputClass()}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded w-100 mr-10"
          onClick={(e) => search(e, {city, state, country})}
        >
          Search
        </button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};

export default SearchForm;
