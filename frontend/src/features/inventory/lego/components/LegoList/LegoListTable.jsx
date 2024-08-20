import { UI } from '../../../../../config/common/messages';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import Lego from '../Lego/Lego';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { LINK } from '../../../../../config/common/constants';
import useAuth from '../../../../../hooks/useAuth';

function LegoListTable({ lego, openModal }) {
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

  const tableContent = generateTableContent(ids, entities, openModal, Lego, 'lego');

  const legoTable = ids.length > 0 && (
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

  function handleWishlistClick() {
    navigate(LINK.LEGO.wishlist);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.LEGO.list.paragraph}
      onCreateClick={() => openModal()}
      onWishlistClick={handleWishlistClick}
      table={legoTable}
      createButtonText='New Lego Set'
      isProtected={isProtected}
    />
  );
}

export default LegoListTable;
