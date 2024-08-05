import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../legoUtils';
import getLegoFormFields from '../../legoFormData';

function NewLegoFormTable({ formData, updateField, canSave, handleSave, onClose }) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title={`New Lego Set: ${formData.name}`}
      formData={formData}
      getFormFields={getLegoFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default NewLegoFormTable;
