import { UI } from '../../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
} from '../../../../../components/common/TableComponents';
import Tonie from '../Tonie/Tonie';
import { useMemo, useState } from 'react';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import SearchInput from '../../../../../components/common/SearchInput';

function ToniesListTable({ tonies, openModal }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTonies = useMemo(
    () => genericFilter({ fields: ['name'] }, tonies, searchTerm),
    [tonies, searchTerm]
  );

  const { ids, entities } = filteredTonies;

  const tableContent = generateTableContent(ids, entities, openModal, Tonie, 'tonie');

  return (
    <div>
      <TableAboveHeader
        descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

      <SearchInput setSearchTerm={setSearchTerm} searchType='Tonies' />

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
    </div>
  );
}

export default ToniesListTable;
