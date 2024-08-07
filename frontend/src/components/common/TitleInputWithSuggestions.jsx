import { useEffect, useId, useRef, useState } from 'react';
import SuggestionsDropdown from './SuggestionsDropdown';
import {
  debounceFetch,
  fetchSuggestionsByBookTitle,
} from '../../features/utils/fetchUtils';

function FormInputWithSuggestions({
  label,
  name,
  value,
  onChange,
  onSelectSuggestion,
  validClass,
  fetchSuggestions,
}) {
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
      debounceFetch(fetchSuggestions, inputValue, setSuggestions),
      300
    );

    function cleanup() {
      return clearTimeout(debounceTimer);
    }

    return cleanup;
  }, [inputValue, shouldFetchSuggestions, fetchSuggestions]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
    onChange(e);
    setShouldFetchSuggestions(true);
  }

  function handleSelectSuggestion(suggestion) {
    setInputValue(suggestion[name]);
    onChange({ target: { name, value: suggestion[name] } });

    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }

    setSuggestions([]);
    setShouldFetchSuggestions(false);

    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <>
      <label htmlFor={inputId} className='form__label'>
        {label}:
      </label>
      <div className='form__input-container'>
        <input
          id={inputId}
          ref={inputRef}
          type='text'
          name={name}
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

export default FormInputWithSuggestions;
