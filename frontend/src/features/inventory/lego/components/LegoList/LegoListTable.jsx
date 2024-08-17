import { UI } from '../../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
} from '../../../../../components/common/TableComponents';
import Lego from '../Lego/Lego';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import NoResults from '../../../../../components/common/NoResults';
import { useOutletContext } from 'react-router-dom';

function LegoListTable({ lego, openModal }) {
  const { searchTerm } = useOutletContext();

  const filteredLego = useMemo(
    () => genericFilter({ fields: ['name', 'setNumber'] }, lego, searchTerm),
    [lego, searchTerm]
  );

  const { ids, entities } = filteredLego;

  const tableContent = generateTableContent(ids, entities, openModal, Lego, 'lego');

  return (
    <div>
      <TableAboveHeader
        descriptionText={UI.BS.PAGE.LEGO.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

      <table className='table table__lego'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label='No.' className='lego__number' />
            <TableCellHeader label='Image' className='lego__thumbnail' />
            <TableCellHeader label='Name' className='lego__name' />
            <TableCellHeader label='SetNumber' className='lego__setNumber' />
            <TableCellHeader label='Edit' className='lego__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      {ids.length === 0 && <NoResults />}
    </div>
  );
}

export default LegoListTable;
