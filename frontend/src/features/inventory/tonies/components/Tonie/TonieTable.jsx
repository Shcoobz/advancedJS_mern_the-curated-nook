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
import useAuth from '../../../../../hooks/useAuth';

function TonieTable({ item, onEdit, onClose, index }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;

  const [deleteTonie] = useDeleteTonieMutation();
  const dispatch = useDispatch();

  const thumbnailUrl =
    item.thumbnailUrl && item.thumbnailUrl !== 'N/A'
      ? item.thumbnailUrl
      : stockImageTonie;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteTonie, item.id, TOAST.SUCCESS.TONIE.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Tonie', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='table__cell item__number' content={index} />
      <TableCell
        className='table__cell user__thumbnail-cell'
        content={<img src={thumbnailUrl} alt={item.name || 'Tonie'} />}
      />
      <TableCell className='tonie__name' content={item.name} />
      <TableCell className='tonie__description' content={item.description} />

      {isProtected && (
        <TableCellActions
          onEdit={onEdit}
          handleDelete={handleDelete}
          item={item}
          onClose={onClose}
          className='list__actions'
        />
      )}
    </>
  );
}

export default TonieTable;
