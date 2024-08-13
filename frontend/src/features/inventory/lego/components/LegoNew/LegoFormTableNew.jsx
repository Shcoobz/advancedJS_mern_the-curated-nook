import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../../../../utils/formUtils';
import getLegoFormFields from '../../legoFormData';

function LegoNewFormTable({
  formData,
  updateField,
  canSave,
  handleSave,
  onClose,
  handleSelectSuggestion,
}) {
  const handleFieldChange = handleClick(updateField);

  function createLegoFormFields() {
    const legoFormFields = getLegoFormFields({
      formData,
      handleFieldChange,
      handleSelectSuggestion,
    });

    return legoFormFields;
  }

  return (
    <DynamicForm
      title={`New Lego Set: ${formData.name}`}
      formData={formData}
      getFormFields={createLegoFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default LegoNewFormTable;
