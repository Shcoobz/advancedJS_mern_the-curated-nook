import {
  TableCell,
  TableCellEdit,
} from '../../../../../components/common/TableComponents';

function TonieTable({ tonie, onEdit }) {
  return (
    <>
      <TableCell className='tonie__name' content={tonie.name} />
      <TableCell className='tonie__description' content={tonie.description} />

      <TableCellEdit onEdit={onEdit} item={tonie} className='list__edit' />
    </>
  );
}

export default TonieTable;
