import { useNavigate, useOutletContext } from 'react-router-dom';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import { useMemo } from 'react';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { UI } from '../../../../../config/common/messages';
import Tonie from '../Tonie/Tonie';
import { LINK } from '../../../../../config/common/constants';

function TonieWishlistTable({ tonies, openModal }) {
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredTonies = useMemo(
    () => genericFilter({ fields: ['name'] }, tonies, searchTerm),
    [tonies, searchTerm]
  );

  const { ids, entities } = filteredTonies;

  const tableContent = generateTableContent(
    ids,
    entities,
    openModal,
    Tonie,
    'tonie',
    true
  );

  const tonieWishlistTable = ids.length > 0 && (
    <table className='table table__tonies'>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='tonie__number' />
          <TableCellHeader label='Image' className='tonie__thumbnail' />
          <TableCellHeader label='Name' className='tonie__name' />
          <TableCellHeader label='Description' className='tonie__description' />
          <TableCellHeader label='Actions' className='tonie__action' />
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  function handleHomeClick() {
    navigate(LINK.TONIE.viewTonies);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
      onCreateClick={() => openModal()}
      onHomeClick={handleHomeClick}
      table={tonieWishlistTable}
      createButtonText='New Tonie'
    />
  );
}

export default TonieWishlistTable;
