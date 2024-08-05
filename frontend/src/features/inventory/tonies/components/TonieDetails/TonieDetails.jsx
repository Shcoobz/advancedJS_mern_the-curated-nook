import { toast } from 'react-toastify';
import { useDeleteTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import TonieDetailsTable from './TonieDetailsTable';
import { handleDeleteEntity } from '../../../../utils/formUtils';

function TonieDetails({ tonie, isOpen, onClose, onEdit }) {
  const [deleteTonie] = useDeleteTonieMutation();

  if (!tonie) return null;

  function handleEditClick() {
    const updatedTonie = { ...tonie, isEditing: true };
    onEdit(updatedTonie);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteEntity(deleteTonie, tonie.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.deleted);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TonieDetailsTable
        tonie={tonie}
        onClose={onClose}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}

export default TonieDetails;
