import { handleClick } from '../../../../utils/formUtils';
import { DynamicForm } from '../../../../../components/common/FormComponents';
import getTonieFormFields from '../../tonieFormData';

function NewTonieFormTable({ formData, updateField, canSave, handleSave, onClose }) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title='Create Tonie'
      formData={formData}
      getFormFields={getTonieFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default NewTonieFormTable;
