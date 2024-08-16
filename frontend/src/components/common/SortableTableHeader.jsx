import { DEFAULT } from '../../config/common/constants';
import { getSortDirectionSymbol } from '../../features/utils/utils';

function SortableTableHeader({
  columnKey,
  title,
  label,
  sortConfig,
  requestSort,
  resetSort,
  additionalClass = DEFAULT.emptyString,
}) {
  return (
    <th
      scope='col'
      className={`table__th table__th--center table__th--pointer ${additionalClass}`}
      onClick={() => requestSort(columnKey)}
      title={`Sort by ${title}`}>
      {label}
      {getSortDirectionSymbol(columnKey, sortConfig, resetSort)}
    </th>
  );
}

export default SortableTableHeader;
