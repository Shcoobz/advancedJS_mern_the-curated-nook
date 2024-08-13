function SuggestionsDropdown({ suggestions, onSelectSuggestion, renderItem }) {
  if (suggestions.length === 0) return null;

  return (
    <ul className='suggestions-dropdown'>
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => onSelectSuggestion(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsDropdown;
