import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../../../../utils/formUtils';
import getBookFormFields from '../../bookFormData';

function BookFormTableNew({
  formData,
  updateField,
  canSave,
  handleSave,
  onClose,
  handleSelectSuggestion,
  handleScan,
}) {
  const handleFieldChange = handleClick(updateField);

  function createBookFormFields() {
    const bookFormFields = getBookFormFields({
      formData,
      handleFieldChange,
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
      handleScan={handleScan}
      onClose={onClose}
    />
  );
}

export default BookFormTableNew;
