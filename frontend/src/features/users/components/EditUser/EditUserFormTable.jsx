import { handleClick } from '../../../utils/formUtils';
import { DynamicForm } from '../../../../components/common/FormComponents';
import getUserFormFields from '../../userFormData';

function EditUserFormTable({
  formData,
  updateField,
  canSave,
  handleSave,
  handleDelete,
  onClose,
}) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title={`Edit User: ${formData.username}`}
      formData={formData}
      getFormFields={getUserFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );
}

export default EditUserFormTable;
