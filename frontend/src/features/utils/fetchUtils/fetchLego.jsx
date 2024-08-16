import { toast } from 'react-toastify';
import { API } from '../../../config/common/constants';

async function fetchJSON(url) {
  const response = await fetch(url);

  return response.json();
}

async function fetchThemeData(themeId) {
  if (!themeId) return 'N/A';

  const themeData = await fetchJSON(
    `${API.BASE_URL.rebrickable}themes/${themeId}/?key=${API.KEY.rebrickable}`
  );

  return themeData.name || 'N/A';
}

async function transformSetData(results) {
  return await Promise.all(
    results.map(async (set) => {
      const themeName = await fetchThemeData(set.theme_id);

      return {
        id: set.set_num,
        name: set.name,
        setNumber: set.set_num,
        thumbnailUrl: set.set_img_url || 'N/A',
        imageUrl: set.set_img_url || 'N/A',
        themeId: set.theme_id.toString() || 'N/A',
        themeName: themeName || 'N/A',
        year: set.year.toString() || 'N/A',
      };
    })
  );
}

async function fetchLegoSetDataByNumber(setNumber) {
  if (setNumber.length <= 2) return [];

  const data = await fetchJSON(
    `${API.BASE_URL.rebrickable}sets/?search=${encodeURIComponent(
      setNumber
    )}&page_size=5&key=${API.KEY.rebrickable}`
  );

  if (!data || data.count === 0) {
    toast.error(`No LEGO sets found for "${setNumber}"`);

    return [];
  }

  return transformSetData(data.results);
}

async function fetchLegoSetDataByName(setName) {
  if (setName.length <= 2) return [];

  const data = await fetchJSON(
    `${API.BASE_URL.rebrickable}sets/?search=${encodeURIComponent(
      setName
    )}&page_size=5&key=${API.KEY.rebrickable}`
  );

  if (!data || data.count === 0) {
    toast.error(`No LEGO sets found for "${setName}"`);

    return [];
  }

  return transformSetData(data.results);
}

export async function fetchLegoSetByNumber(setNumber, setResults) {
  const legoSetSuggestions = await fetchLegoSetDataByNumber(setNumber);

  setResults(legoSetSuggestions);
}

export async function fetchLegoSetByName(setName, setResults) {
  const legoSetSuggestions = await fetchLegoSetDataByName(setName);

  setResults(legoSetSuggestions);
}
