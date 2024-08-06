import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../../../../utils/formUtils';
import getLegoFormFields from '../../legoFormData';

function LegoNewFormTable({ formData, updateField, canSave, handleSave, onClose }) {
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

export default LegoNewFormTable;
