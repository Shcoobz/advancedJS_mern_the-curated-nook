import { CreateButton } from '../../../../../components/common/Buttons';
import { UI } from '../../../../../config/common/messages';
import {
  TableCellHeader,
  TableDescription,
} from '../../../../../components/common/TableComponents';
import Tonie from '../Tonie/Tonie';

function ToniesListTable({ tonies, openModal }) {
  const { ids, entities } = tonies;

  const tableContent = ids?.length
    ? ids.map((tonieId, index) => {
        const tonie = entities[tonieId];

        return (
          <tr
            key={tonieId}
            onClick={() => openModal(tonie)}
            className={'table__row-cursor'}>
            <td className='table__cell item__number'>{index + 1}</td>
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
      <CreateButton onClick={() => openModal()} text={'New Tonie'} />
      <TableDescription text={UI.BS.PAGE.TONIE.list.paragraph} />

      <br />

      <table className='table table__tonies'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label='Number' className='tonie__number' />
            <TableCellHeader label='Name' className='tonie__name' />
            <TableCellHeader label='Description' className='tonie__description' />
            <TableCellHeader label='Edit' className='tonie__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default ToniesListTable;
