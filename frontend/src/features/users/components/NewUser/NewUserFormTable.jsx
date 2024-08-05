import { DynamicForm } from '../../../../components/common/FormComponents';
import { handleClick } from '../userUtils';
import getUserFormFields from '../../userFormData';

function NewUserFormTable({ formData, updateField, canSave, handleSave, onClose }) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title={`New User: ${formData.username}`}
      formData={formData}
      getFormFields={getUserFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default NewUserFormTable;
