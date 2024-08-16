import { useDispatch } from 'react-redux';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';
import { useDeleteTonieMutation } from '../../api/toniesApiSlice';
import { apiSlice } from '../../../../../app/api/apiSlice';
import { handleDeleteEntityList } from '../../../../utils/formUtils';
import { TOAST } from '../../../../../config/common/messages';
import stockImageTonie from '../../../../../img/stockimageTonie.png';

function TonieTable({ tonie, onEdit, onClose, index }) {
  const [deleteTonie] = useDeleteTonieMutation();
  const dispatch = useDispatch();

  const thumbnailUrl =
    tonie.thumbnailUrl && tonie.thumbnailUrl !== 'N/A'
      ? tonie.thumbnailUrl
      : stockImageTonie;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteTonie, tonie.id, TOAST.SUCCESS.TONIE.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Tonie', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='table__cell item__number' content={index} />
      <TableCell
        className='table__cell user__thumbnail-cell'
        content={<img src={thumbnailUrl} alt={tonie.name || 'Tonie'} />}
      />
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
