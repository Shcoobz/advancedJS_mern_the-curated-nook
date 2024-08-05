import { DynamicForm } from '../../../../../components/common/FormComponents';
import getTonieFormFields from '../../tonieFormData';
import { handleClick } from '../tonieUtils';

function EditTonieFormTable({
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
      title={`Edit User: ${formData.name}`}
      formData={formData}
      getFormFields={getTonieFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );
}

export default EditTonieFormTable;
