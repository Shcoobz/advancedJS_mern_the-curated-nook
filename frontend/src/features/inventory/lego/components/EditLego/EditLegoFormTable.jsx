import { DynamicForm } from '../../../../../components/common/FormComponents.jsx';
import { handleClick } from '../../../../utils/formUtils';
import getLegoFormFields from '../../legoFormData.js';

function EditLegoFormTable({
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
      title={`Edit Lego Set: ${formData.name}`}
      formData={formData}
      getFormFields={getLegoFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );
}

export default EditLegoFormTable;
