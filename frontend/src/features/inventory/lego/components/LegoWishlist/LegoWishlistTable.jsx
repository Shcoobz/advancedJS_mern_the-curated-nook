import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import Lego from '../Lego/Lego';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import { LINK } from '../../../../../config/common/constants';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { UI } from '../../../../../config/common/messages';

function LegoWishlistTable({ lego, openModal }) {
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredLego = useMemo(
    () => genericFilter({ fields: ['name', 'setNumber'] }, lego, searchTerm),
    [lego, searchTerm]
  );

  const { ids, entities } = filteredLego;

  const tableContent = generateTableContent(ids, entities, openModal, Lego, 'lego', true);

  const legoWishlistTable = ids.length > 0 && (
    <table className='table table__lego'>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='lego__number' />
          <TableCellHeader label='Image' className='lego__thumbnail' />
          <TableCellHeader label='Name' className='lego__name' />
          <TableCellHeader label='Set Number' className='lego__setNumber' />
          <TableCellHeader label='Edit' className='lego__action' />
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
    />
  );
}

export default LegoWishlistTable;
