import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import Lego from '../Lego/Lego_old';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import { LINK } from '../../../../../config/common/constants';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { UI } from '../../../../../config/common/messages';
import useAuth from '../../../../../hooks/useAuth';
import MemoizedEntity from '../../../../entity/Components/entity/MemoizedEntity';

function LegoWishlistTable({ lego, openModal }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredLego = useMemo(
    () => genericFilter({ fields: ['name', 'setNumber'] }, lego, searchTerm),
    [lego, searchTerm]
  );

  const { ids, entities } = filteredLego;

  const tableClass = isProtected
    ? 'table__lego--with-actions'
    : 'table__lego--without-actions';

  // const tableContent = generateTableContent(ids, entities, openModal, Lego, 'lego', true);

  const tableContent = generateTableContent(
    ids,
    entities,
    openModal,
    MemoizedEntity,
    'lego',
    true
  );

  const legoWishlistTable = ids.length > 0 && (
    <table className={`table ${tableClass}`}>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='lego__number' />
          <TableCellHeader label='Image' className='lego__thumbnail' />
          <TableCellHeader label='Name' className='lego__name' />
          <TableCellHeader label='Set Number' className='lego__setNumber' />
          {isProtected && <TableCellHeader label='Edit' className='lego__action' />}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  function handleHomeClick() {
    navigate(LINK.LEGO.viewLego);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.LEGO.list.paragraph}
      onCreateClick={() => openModal()}
      onHomeClick={handleHomeClick}
      table={legoWishlistTable}
      createButtonText='New Lego'
      isProtected={isProtected}
    />
  );
}

export default LegoWishlistTable;
