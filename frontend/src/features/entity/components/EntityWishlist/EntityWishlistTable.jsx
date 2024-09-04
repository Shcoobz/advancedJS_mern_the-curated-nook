import { useNavigate, useOutletContext } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../utils/utils';
import MemoizedEntity from '../Entity/MemoizedEntity';
import { TableCellHeader } from '../../../../components/common/TableComponents';
import ConditionalList from '../../../../components/common/ConditionalList';

function EntityWishlistTable({
  entities,
  openModal,
  entityType,
  columns,
  filterFields,
  descriptionText,
  createButtonText,
  homeLink,
  tableClassName,
}) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredEntities = useMemo(
    () => genericFilter({ fields: filterFields }, entities, searchTerm),
    [entities, searchTerm, filterFields]
  );

  const { ids, entities: filteredEntitiesObj } = filteredEntities;

  const tableClass = isProtected
    ? `${tableClassName}--with-actions`
    : `${tableClassName}--without-actions`;

  const tableContent = generateTableContent(
    ids,
    filteredEntitiesObj,
    openModal,
    MemoizedEntity,
    entityType,
    true
  );

  const entityWishlistTable = ids.length > 0 && (
    <table className={`table ${tableClass}`}>
      <thead className='table__thead'>
        <tr>
          {columns.map((column, index) => (
            <TableCellHeader
              key={index}
              label={column.label}
              className={column.className}
            />
          ))}
          {isProtected && (
            <TableCellHeader label='Edit' className={`${entityType}__action`} />
          )}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  function handleHomeClick() {
    navigate(homeLink);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={descriptionText}
      onCreateClick={() => openModal()}
      onHomeClick={handleHomeClick}
      table={entityWishlistTable}
      createButtonText={createButtonText}
      isProtected={isProtected}
    />
  );
}

export default EntityWishlistTable;
