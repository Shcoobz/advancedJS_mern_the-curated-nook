import { replaceHtmlEntities } from './utils';

export function debounceFetch(functionToDebounce, inputValue, setSuggestions) {
  functionToDebounce(inputValue, setSuggestions);
}

export async function fetchSuggestionsByBookTitle(inputValue, setSuggestions) {
  if (inputValue.length > 2) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        inputValue
      )}&maxResults=5`
    );

    const data = await response.json();

    const bookSuggestions = data.items
      ? data.items.map((item) => {
          const isbn13 = item.volumeInfo.industryIdentifiers
            ? item.volumeInfo.industryIdentifiers.find((id) => id.type === 'ISBN_13')
            : null;

          const book = {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            publisher: item.volumeInfo.publisher || '',
            publishedDate: item.volumeInfo.publishedDate || '',
            description:
              item.volumeInfo.description ||
              (item.searchInfo ? replaceHtmlEntities(item.searchInfo.textSnippet) : '') ||
              '',
            isbn: isbn13
              ? isbn13.identifier
              : item.volumeInfo.industryIdentifiers &&
                item.volumeInfo.industryIdentifiers.length > 0
              ? item.volumeInfo.industryIdentifiers[0].identifier
              : '',
            categories:
              item.volumeInfo.maturityRating === 'NOT_MATURE'
                ? ['Kinderbuch']
                : item.volumeInfo.categories || [],
            thumbnailUrl: item.volumeInfo.imageLinks?.smallThumbnail || '',
            imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
            language: item.volumeInfo.language || '',
          };

          return book;
        })
      : [];
    setSuggestions(bookSuggestions);
  } else {
    setSuggestions([]);
  }
}
