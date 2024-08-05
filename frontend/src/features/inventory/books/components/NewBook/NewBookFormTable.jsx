import { DynamicForm } from '../../../../../components/common/FormComponents';
import { handleClick } from '../bookUtils';
import getBookFormFields from '../../bookFormData';

function NewBookFormTable({ formData, updateField, canSave, handleSave, onClose }) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title={`New Book: ${formData.title}`}
      formData={formData}
      getFormFields={getBookFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      onClose={onClose}
    />
  );
}

export default NewBookFormTable;
