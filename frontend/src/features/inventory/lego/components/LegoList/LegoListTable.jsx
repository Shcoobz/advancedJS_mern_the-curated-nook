import { UI } from '../../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
} from '../../../../../components/common/TableComponents';

import Lego from '../Lego/Lego';
import stockImageLego from '../../../../../img/stockimageLego.png';

function LegoListTable({ lego, openModal }) {
  const { ids, entities } = lego;

  const tableContent = ids?.length
    ? ids.map((legoId, index) => {
        const lego = entities[legoId];
        const thumbnailUrl =
          lego.thumbnailUrl && lego.thumbnailUrl !== 'N/A'
            ? lego.thumbnailUrl
            : stockImageLego;

        return (
          <tr
            key={legoId}
            onClick={() => openModal(lego)}
            className={'table__row-cursor'}>
            <td className='table__cell item__setNumber'>{index + 1}</td>
            <td className='table__cell lego__thumbnail-cell'>
              <img src={thumbnailUrl} alt={lego.title} />
            </td>
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
            <TableCellHeader label='No.' className='lego__number' />
            <TableCellHeader label='Image' className='lego__thumbnail' />
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
