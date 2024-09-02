import { DynamicForm } from '../../../../components/common/FormComponents';
import { handleClick } from '../../../utils/formUtils';

function EntityFormEditTable({
  formData,
  updateField,
  canSave,
  handleSave,
  handleDelete,
  onClose,
  getFormFields,
  entityType,
  titleField,
}) {
  const handleFieldChange = handleClick(updateField);

  return (
    <DynamicForm
      title={`Edit ${entityType}: ${formData[titleField]}`}
      formData={formData}
      getFormFields={getFormFields}
      handleFieldChange={handleFieldChange}
      handleSave={handleSave}
      canSave={canSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );
}

export default EntityFormEditTable;
