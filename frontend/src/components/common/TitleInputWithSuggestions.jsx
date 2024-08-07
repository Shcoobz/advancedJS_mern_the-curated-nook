import { useEffect, useId, useRef, useState } from 'react';
import SuggestionsDropdown from './SuggestionsDropdown';
import { debounceFetch } from '../../features/utils/fetchUtils';

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
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
      setIsEditing(false);
      setSuggestions([]);
    }
  }, [value, inputValue]);

  useEffect(() => {
    if (inputValue.length >= 3 && (!value || isEditing)) {
      const debounceTimer = setTimeout(() => {
        debounceFetch(fetchSuggestions, inputValue, (newSuggestions) => {
          setSuggestions(newSuggestions);
        });
      }, 300);

      return () => {
        clearTimeout(debounceTimer);
      };
    } else {
      setSuggestions([]);
    }
  }, [inputValue, fetchSuggestions, value, isEditing]);

  function handleInputChange(e) {
    const newValue = e.target.value;

    setInputValue(newValue);
    setIsEditing(true);
    onChange(e);
  }

  function handleSelectSuggestion(suggestion) {
    setInputValue(suggestion[name]);
    onChange({ target: { name, value: suggestion[name] } });

    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }

    setSuggestions([]);
    setIsEditing(false);

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
