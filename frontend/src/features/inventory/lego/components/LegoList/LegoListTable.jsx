import { CreateButton, WishlistButton } from '../../../../../components/common/Buttons';
import { UI } from '../../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
  TableDescription,
} from '../../../../../components/common/TableComponents';

import Lego from '../Lego/Lego';

function LegoListTable({ lego, openModal }) {
  const { ids, entities } = lego;

  const tableContent = ids?.length
    ? ids.map((legoId, index) => {
        const lego = entities[legoId];

        return (
          <tr
            key={legoId}
            onClick={() => openModal(lego)}
            className={'table__row-cursor'}>
            <td className='table__cell item__setNumber'>{index + 1}</td>
            <Lego
              lego={lego}
              legoId={legoId}
              onEdit={() => openModal({ ...lego, isEditing: true })}
            />
          </tr>
        );
      })
    : null;

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
            <TableCellHeader label='Number' className='lego__number' />
            <TableCellHeader label='Name' className='lego__name' />
            <TableCellHeader label='SetNumber' className='lego__setNumber' />
            <TableCellHeader label='Edit' className='lego__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default LegoListTable;
