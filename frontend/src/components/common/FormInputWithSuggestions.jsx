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
  renderItem,
  children,
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
    if (inputValue.length >= 3 && isEditing) {
      const debounceTimer = setTimeout(() => {
        debounceFetch(fetchSuggestions, inputValue, setSuggestions);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, fetchSuggestions, isEditing]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
    setIsEditing(true);
    onChange(e);
  }

  function handleSelectSuggestion(suggestion) {
    const newValue = suggestion[name];

    setInputValue(newValue);
    onChange({ target: { name, value: newValue } });
    onSelectSuggestion?.(suggestion);
    setSuggestions([]);
    setIsEditing(false);
    inputRef.current?.focus();
  }

  return (
    <>
      <label htmlFor={inputId} className='form__label'>
        {label}: {children}
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
          autoComplete='off'
        />
        {suggestions.length > 0 && (
          <SuggestionsDropdown
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            renderItem={renderItem}
          />
        )}
      </div>
    </>
  );
}

export default FormInputWithSuggestions;
