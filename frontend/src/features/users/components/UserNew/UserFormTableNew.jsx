import { handleClick } from '../../../utils/formUtils';
import { DynamicForm } from '../../../../components/common/FormComponents';
import getUserFormFields from '../../userFormData';

function UserFormTableNew({ formData, updateField, canSave, handleSave, onClose }) {
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

export default UserFormTableNew;
