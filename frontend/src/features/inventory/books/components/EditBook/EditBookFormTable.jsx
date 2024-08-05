import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../bookUtils';
import getBookFormFields from '../../bookFormData';

function EditBookFormTable({
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
      title={`Edit Book: ${formData.title}`}
      formData={formData}
      getFormFields={getBookFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );
}

export default EditBookFormTable;
