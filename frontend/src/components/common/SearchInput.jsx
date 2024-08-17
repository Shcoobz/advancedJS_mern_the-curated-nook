import { useState } from 'react';
import { DEFAULT, SORTING } from '../../config/common/constants';

function SearchInput({ setSearchTerm, currentTab = 'All' }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(DEFAULT.emptyString);

  function handleInputChange(e) {
    const value = e.target.value;

    setLocalSearchTerm(value);
    setSearchTerm(value);
  }

  function clearSearch() {
    setLocalSearchTerm(DEFAULT.emptyString);
    setSearchTerm(DEFAULT.emptyString);
  }

  function getPlaceholder() {
    if (currentTab === 'All') {
      return 'Search ...';
    } else {
      return `Search ${currentTab} ...`;
    }
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={getPlaceholder()}
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
