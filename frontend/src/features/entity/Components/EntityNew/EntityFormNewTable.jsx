import { DynamicForm } from '../../../../components/common/FormComponents';
import { handleClick } from '../../../utils/formUtils';

function EntityFormNewTable({
  entityType,
  formData,
  updateField,
  canSave,
  handleSave,
  onClose,
  handleSelectSuggestion,
  handleScan,
  getFormFields,
  titleField = 'name',
}) {
  const handleFieldChange = handleClick(updateField);

  function createEntityFormFields() {
    return getFormFields({
      formData,
      handleFieldChange,
      handleSelectSuggestion,
    });
  }

  return (
    <DynamicForm
      title={`New ${entityType}: ${formData[titleField]}`}
      formData={formData}
      getFormFields={createEntityFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleScan={handleScan}
      onClose={onClose}
    />
  );
}

export default EntityFormNewTable;
