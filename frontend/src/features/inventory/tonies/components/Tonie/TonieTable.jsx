import { useDispatch } from 'react-redux';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';
import { useDeleteTonieMutation } from '../../api/toniesApiSlice';
import { apiSlice } from '../../../../../app/api/apiSlice';
import { handleDeleteEntityList } from '../../../../utils/formUtils';
import { TOAST } from '../../../../../config/common/messages';

function TonieTable({ tonie, onEdit, onClose }) {
  const [deleteTonie] = useDeleteTonieMutation();
  const dispatch = useDispatch();

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteTonie, tonie.id, TOAST.SUCCESS.TONIE.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Tonie', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='tonie__name' content={tonie.name} />
      <TableCell className='tonie__description' content={tonie.description} />

      <TableCellActions
        onEdit={onEdit}
        handleDelete={handleDelete}
        item={tonie}
        onClose={onClose}
        className='list__actions'
      />
    </>
  );
}

export default TonieTable;
