import { DEFAULT, SORTING } from '../../config/common/constants';

export function replaceHtmlEntities(str) {
  return str.replace(/&quot;/g, '"');
}

export function truncateText(description, maxLength = 250) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + ' [...]';
  }

  return description;
}

export function formatDate(dateString) {
  if (dateString === '1900-01-01') {
    return 'N/A';
  }

  const date = new Date(dateString);
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  day = day.length < 2 ? '0' + day : day;
  month = month.length < 2 ? '0' + month : month;

  return `${day}-${month}-${year}`;
}

export function getSortDirectionSymbol(key, sortConfig, resetSort) {
  if (sortConfig.key === key) {
    return (
      <>
        <span
          title={
            sortConfig.direction === SORTING.DIRECTION.ascending
              ? SORTING.ACTIONS.sortDesc
              : SORTING.ACTIONS.sortAsc
          }
          className='table__sort-symbol'>
          {sortConfig.direction === SORTING.DIRECTION.ascending
            ? SORTING.SYMBOL.ascending
            : SORTING.SYMBOL.descending}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            resetSort();
          }}
          title={SORTING.ACTIONS.resetSorting}
          className='table__reset-sort-symbol'>
          {SORTING.SYMBOL.reset}
        </span>
      </>
    );
  }

  return DEFAULT.emptyString;
}
