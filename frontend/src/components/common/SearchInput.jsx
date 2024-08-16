import { useState } from 'react';
import { DEFAULT, SORTING } from '../../config/common/constants';

function SearchInput({ setSearchTerm, searchType = '' }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(DEFAULT.emptyString);
  const placeholderText = `Search${searchType ? ' ' + searchType : ''}...`;

  function handleInputChange(e) {
    const value = e.target.value;

    setLocalSearchTerm(value);
    setSearchTerm(value);
  }

  function clearSearch() {
    setLocalSearchTerm(DEFAULT.emptyString);
    setSearchTerm(DEFAULT.emptyString);
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={placeholderText}
        value={localSearchTerm}
        onChange={handleInputChange}
        className='search-input__input'
      />
      {localSearchTerm && (
        <button onClick={clearSearch} className='search-input__clear-button'>
          {SORTING.SYMBOL.reset}
        </button>
      )}
    </div>
  );
}

export default SearchInput;
