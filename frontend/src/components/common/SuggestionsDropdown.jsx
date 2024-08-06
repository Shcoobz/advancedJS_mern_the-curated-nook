function SuggestionsDropdown({ suggestions, onSelectSuggestion }) {
  if (suggestions.length === 0) return null;

  return (
    <ul className='suggestions-dropdown'>
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => onSelectSuggestion(item)}>
          {item.title} - {item.authors.join(', ')}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsDropdown;
