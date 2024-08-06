import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../../../../utils/formUtils';
import getBookFormFields from '../../bookFormData';

function NewBookFormTable({
  formData,
  updateField,
  canSave,
  handleSave,
  onClose,
  handleTitleChange,
  handleSelectSuggestion,
}) {
  const handleFieldChange = handleClick(updateField);

  function createBookFormFields() {
    const bookFormFields = getBookFormFields({
      formData,
      handleFieldChange,
      handleTitleChange,
      handleSelectSuggestion,
    });

    return bookFormFields;
  }

  return (
    <DynamicForm
      title={`New Book: ${formData.title}`}
      formData={formData}
      getFormFields={createBookFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default NewBookFormTable;
