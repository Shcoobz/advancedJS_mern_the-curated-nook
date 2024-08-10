import { UI } from '../../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
} from '../../../../../components/common/TableComponents';
import Tonie from '../Tonie/Tonie';
import stockImageTonie from '../../../../../img/stockimageTonie.png';

function ToniesListTable({ tonies, openModal }) {
  const { ids, entities } = tonies;

  const tableContent = ids?.length
    ? ids.map((tonieId, index) => {
        const tonie = entities[tonieId];
        const thumbnailUrl =
          tonie.thumbnailUrl && tonie.thumbnailUrl !== 'N/A'
            ? tonie.thumbnailUrl
            : stockImageTonie;

        return (
          <tr
            key={tonieId}
            onClick={() => openModal(tonie)}
            className={'table__row-cursor'}>
            <td className='table__cell item__number'>{index + 1}</td>
            <td className='table__cell tonie__thumbnail-cell'>
              <img src={thumbnailUrl} alt={tonie.titleList} />
            </td>
            <Tonie
              tonie={tonie}
              tonieId={tonieId}
              onEdit={() => openModal({ ...tonie, isEditing: true })}
            />
          </tr>
        );
      })
    : null;

  return (
    <div>
      <TableAboveHeader
        descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

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
