import { SubmitButton } from '../../../../../components/common/Buttons';
import { FormHeader } from '../../../../../components/common/FormComponents';
import { handleClick } from '../bookUtils';
import getFormFields from '../../bookFormData';

function EditBookFormTable({
  formData,
  updateField,
  canSave,
  handleSave,
  handleDelete,
  onClose,
}) {
  const handleFieldChange = handleClick(updateField);

  const formFields = getFormFields({
    formData,
    handleFieldChange,
  });

  const renderFormFields = formFields.map((field, index) => {
    const Component = field.component;

    return <Component key={index} {...field} />;
  });

  const formContent = (
    <>
      <FormHeader
        title={`Edit Book: ${formData.title}`}
        handleSave={handleSave}
        canSave={canSave}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <form className='form' onSubmit={handleSave}>
        {renderFormFields}

        <SubmitButton canSave={canSave} />
      </form>
    </>
  );

  return formContent;
}

export default EditBookFormTable;
