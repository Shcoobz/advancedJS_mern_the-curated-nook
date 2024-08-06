import { useEffect, useId, useRef, useState } from 'react';
import SuggestionsDropdown from './SuggestionsDropdown';
import {
  debounceFetch,
  fetchSuggestionsByBookTitle,
} from '../../features/utils/fetchUtils';

function TitleInputWithSuggestions({ value, onChange, onSelectSuggestion, validClass }) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);
  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!shouldFetchSuggestions) return;

    const debounceTimer = setTimeout(
      debounceFetch(fetchSuggestionsByBookTitle, inputValue, setSuggestions),
      300
    );

    function cleanup() {
      return clearTimeout(debounceTimer);
    }

    return cleanup;
  }, [inputValue, shouldFetchSuggestions]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
    onChange(e);
    setShouldFetchSuggestions(true);
  }

  function handleSelectSuggestion(book) {
    setInputValue(book.title);
    onChange({ target: { name: 'title', value: book.title } });

    if (onSelectSuggestion) {
      onSelectSuggestion(book);
    }

    setSuggestions([]);
    setShouldFetchSuggestions(false);

    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <>
      <label htmlFor={inputId} className='form__label'>
        Title:
      </label>
      <div className='title-input-container'>
        <input
          id={inputId}
          ref={inputRef}
          type='text'
          name='title'
          value={inputValue}
          onChange={handleInputChange}
          className={`form__input ${validClass}`}
        />
        <SuggestionsDropdown
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      </div>
    </>
  );
}

export default TitleInputWithSuggestions;
