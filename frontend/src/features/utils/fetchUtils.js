import { toast } from 'react-toastify';
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

          const volumeInfo = item.volumeInfo;
          const imageLinks = volumeInfo.imageLinks || {};

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
            categories: item.volumeInfo.categories || [],
            thumbnailUrl: imageLinks.smallThumbnail,
            imageUrl: imageLinks.thumbnail,
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

export async function fetchSuggestionsByBookISBN(inputValue, setSuggestions) {
  if (inputValue.length > 2) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(
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
            categories: item.volumeInfo.categories || '',
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

export function handleSelectSuggestion(suggestion, type, setFormData) {
  setFormData((prevFormData) => {
    let updatedFormData = { ...prevFormData };

    switch (type) {
      case 'book':
        updatedFormData = {
          ...updatedFormData,

          title: suggestion.title,
          authors: suggestion.authors?.join(', ') || 'N/A',
          publisher: suggestion.publisher || 'N/A',
          publishedDate: suggestion.publishedDate || '1900-01-01',
          description: suggestion.description || 'N/A',
          isbn: suggestion.isbn,
          categories: suggestion.categories?.join(', ') || 'N/A',
          thumbnailUrl: suggestion.thumbnailUrl || 'N/A',
          imageUrl: suggestion.imageUrl || 'N/A',
          language: suggestion.language || 'N/A',
        };
        break;

      case 'lego':
        updatedFormData = {
          ...updatedFormData,

          name: suggestion.name,
          setNumber: suggestion.setNumber,
          thumbnailUrl: suggestion.thumbnailUrl || 'N/A',
          imageUrl: suggestion.imageUrl || 'N/A',
          themeId: suggestion.themeId || 'N/A',
          themeName: suggestion.themeName || 'N/A',
          year: suggestion.year || 'N/A',
        };
        break;

      default:
        console.log('Unhandled suggestion type:', type);
    }

    return updatedFormData;
  });
}

export function handleScan(setIsScanning) {
  setIsScanning(true);
}

export async function handleIsbnScan(isbn, setIsScanning, setFormData) {
  setIsScanning(false);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  );

  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const bookInfo = data.items[0].volumeInfo;
    const industryIdentifiers = bookInfo.industryIdentifiers || [];
    const isbn13 =
      industryIdentifiers.find((id) => id.type === 'ISBN_13')?.identifier || isbn;

    handleSelectSuggestion(bookInfo, isbn13, setFormData);

    toast.success('Fetched!');
  } else {
    toast.error(`No book found with ISBN: ${isbn}`);
  }
}

export async function fetchLegoSetByName(setName, setResults) {
  if (setName.length > 2) {
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(
        setName
      )}&page_size=5`,
      {
        headers: {
          Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const legoSetSuggestions = data.results
      ? await Promise.all(
          data.results.map(async (set) => {
            const legoSet = {
              id: set.set_num,
              name: set.name,
              setNumber: set.set_num,
              thumbnailUrl: set.set_img_url || 'N/A',
              imageUrl: set.set_img_url || 'N/A',
              themeId: set.theme_id ? set.theme_id.toString() : 'N/A',
              year: set.year ? set.year.toString() : 'N/A',
              themeName: 'N/A',
            };

            if (set.theme_id) {
              const themeResponse = await fetch(
                `https://rebrickable.com/api/v3/lego/themes/${set.theme_id}/`,
                {
                  headers: {
                    Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
                  },
                }
              );

              if (themeResponse.ok) {
                const themeData = await themeResponse.json();
                legoSet.themeName = themeData.name || 'Unknown Theme';
              }
            }

            return legoSet;
          })
        )
      : [];

    setResults(legoSetSuggestions);
  } else {
    setResults([]);
  }
}

export async function fetchLegoSetByNumber(inputValue, setResults) {
  if (inputValue.length > 2) {
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(
        inputValue
      )}&page_size=5`,
      {
        headers: {
          Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.count === 0) {
      toast.error(`No LEGO sets found for "${inputValue}"`);
      setResults([]);
      return;
    }

    const legoSetSuggestions = data.results
      ? await Promise.all(
          data.results.map(async (item) => {
            const legoSet = {
              id: item.set_num,
              name: item.name,
              setNumber: item.set_num,
              year: item.year ? item.year.toString() : '',
              numParts: item.num_parts,
              theme: item.theme_name || 'N/A',
              thumbnailUrl: item.set_img_url || '',
              imageUrl: item.set_img_url || '',
              themeId: item.theme_id ? item.theme_id.toString() : 'N/A',
              themeName: 'N/A',
            };

            if (item.theme_id) {
              const themeResponse = await fetch(
                `https://rebrickable.com/api/v3/lego/themes/${item.theme_id}/`,
                {
                  headers: {
                    Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
                  },
                }
              );

              if (themeResponse.ok) {
                const themeData = await themeResponse.json();
                legoSet.themeName = themeData.name || 'Unknown Theme';
              }
            }

            return legoSet;
          })
        )
      : [];

    // toast.success(`LEGO sets found for "${inputValue}"`);
    setResults(legoSetSuggestions);
  } else {
    setResults([]);
  }
}
