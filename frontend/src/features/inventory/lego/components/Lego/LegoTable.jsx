import { useDeleteLegoMutation } from '../../api/legoApiSlice';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../../../app/api/apiSlice';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';
import { handleDeleteEntityList, isUUID } from '../../../../utils/formUtils';
import { TOAST } from '../../../../../config/common/messages';

function LegoTable({ lego, onEdit }) {
  const [deleteLego] = useDeleteLegoMutation();
  const dispatch = useDispatch();

  const displaySetNumber = isUUID(lego.setNumber) ? 'N/A' : lego.setNumber;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteLego, lego.id, TOAST.SUCCESS.LEGO.deleted);

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
