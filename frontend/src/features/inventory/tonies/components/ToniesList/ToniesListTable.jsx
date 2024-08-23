import { UI } from '../../../../../config/common/messages';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import Tonie from '../Tonie/Tonie_old';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { LINK } from '../../../../../config/common/constants';
import useAuth from '../../../../../hooks/useAuth';
import MemoizedEntity from '../../../../entity/Components/entity/MemoizedEntity';

function ToniesListTable({ tonies, openModal }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredTonies = useMemo(
    () => genericFilter({ fields: ['name'] }, tonies, searchTerm),
    [tonies, searchTerm]
  );

  const { ids, entities } = filteredTonies;

  const tableClass = isProtected
    ? 'table__tonies--with-actions'
    : 'table__tonies--without-actions';

  // const tableContent = generateTableContent(ids, entities, openModal, Tonie, 'tonie');

  const tableContent = generateTableContent(
    ids,
    entities,
    openModal,
    MemoizedEntity,
    'tonie'
  );

  const tonieTable = ids.length > 0 && (
    <table className={`table ${tableClass}`}>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='tonie__number' />
          <TableCellHeader label='Image' className='tonie__thumbnail' />
          <TableCellHeader label='Name' className='tonie__name' />
          <TableCellHeader label='Description' className='tonie__description' />
          {isProtected && <TableCellHeader label='Actions' className='tonie__action' />}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  function handleWishlistClick() {
    navigate(LINK.TONIE.wishlist);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
      onCreateClick={() => openModal()}
      onWishlistClick={handleWishlistClick}
      table={tonieTable}
      createButtonText='New Tonie'
      isProtected={isProtected}
    />
  );
}

export default ToniesListTable;
