import { useDeleteLegoMutation } from '../../api/legoApiSlice';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../../../app/api/apiSlice';
import { handleDeleteLegoList, isUUID } from '../legoUtils';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';

function LegoTable({ lego, onEdit }) {
  const [deleteLego] = useDeleteLegoMutation();
  const dispatch = useDispatch();

  const displaySetNumber = isUUID(lego.setNumber) ? 'N/A' : lego.setNumber;

  async function handleDelete(e) {
    await handleDeleteLegoList(deleteLego, lego.id);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Lego', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='lego__name' content={lego.name} />
      <TableCell className='lego__setNumber' content={displaySetNumber} />

      <TableCellActions
        onEdit={onEdit}
        handleDelete={handleDelete}
        item={lego}
        className='list__actions'
      />
    </>
  );
}

export default LegoTable;
