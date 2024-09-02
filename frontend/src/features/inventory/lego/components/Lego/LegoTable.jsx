import { useDeleteLegoMutation } from '../../api/legoApiSlice';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../../../app/api/apiSlice';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';
import { handleDeleteEntityList, isUUID } from '../../../../utils/formUtils';
import { TOAST } from '../../../../../config/common/messages';
import stockImageLego from '../../../../../img/stockimageLego.png';
import useAuth from '../../../../../hooks/useAuth';

function LegoTable({ item, onEdit, index }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;

  const [deleteLego] = useDeleteLegoMutation();
  const dispatch = useDispatch();
  const thumbnailUrl =
    item.thumbnailUrl && item.thumbnailUrl !== 'N/A' ? item.thumbnailUrl : stockImageLego;
  const displaySetNumber = isUUID(item.setNumber) ? 'N/A' : item.setNumber;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteLego, item.id, TOAST.SUCCESS.LEGO.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Lego', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='table__cell item__number' content={index} />
      <TableCell
        className='table__cell user__thumbnail-cell'
        content={<img src={thumbnailUrl} alt={item.name || 'Lego Set'} />}
      />
      <TableCell className='lego__name' content={item.name} />
      <TableCell className='lego__setNumber' content={displaySetNumber} />

      {isProtected && (
        <TableCellActions
          onEdit={onEdit}
          handleDelete={handleDelete}
          item={item}
          className='list__actions'
        />
      )}
    </>
  );
}

export default LegoTable;
