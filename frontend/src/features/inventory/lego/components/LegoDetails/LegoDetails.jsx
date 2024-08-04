import { toast } from 'react-toastify';
import { useDeleteLegoMutation } from '../../api/legoApiSlice';
import { handleDeleteLego } from '../legoUtils';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import LegoDetailsTable from './LegoDetailsTable';

function LegoDetails({ lego, isOpen, onClose, onEdit }) {
  const [deleteLego] = useDeleteLegoMutation();

  if (!lego) return null;

  function handleEditClick() {
    const updatedLego = { ...lego, isEditing: true };
    onEdit(updatedLego);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteLego(deleteLego, lego.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.deleted);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LegoDetailsTable
        lego={lego}
        onClose={onClose}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}

export default LegoDetails;
