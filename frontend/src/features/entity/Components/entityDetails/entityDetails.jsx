import { toast } from 'react-toastify';
import { handleDeleteEntity } from '../../../utils/formUtils';
import Modal from '../../../../components/common/Modal';

function EntityDetails({
  entity,
  entityName,
  isOpen,
  onClose,
  onEdit,
  useDeleteMutation,
  DetailsTable,
  successMessage,
}) {
  const [deleteEntity] = useDeleteMutation();

  if (!entity) return null;

  function handleEditClick() {
    const updatedEntity = { ...entity, isEditing: true };

    onEdit(updatedEntity);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteEntity(deleteEntity, entity.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(successMessage);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${entityName.toLowerCase()}__modal`}>
      <DetailsTable
        {...{ [entityName.toLowerCase()]: entity }}
        onClose={onClose}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}

export default EntityDetails;
