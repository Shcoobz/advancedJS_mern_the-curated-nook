import { SubmitButton } from '../../../../../components/common/Buttons.jsx';
import { FormHeader } from '../../../../../components/common/FormComponents.jsx';
import { getNameInputClass } from '../legoUtils.js';
import getFormFields from '../../legoFormData.js';

function EditLegoFormTable({
  name,
  setName,
  validName,
  setNumber,
  setSetNumber,
  thumbnailUrl,
  setThumbnailUrl,
  imageUrl,
  setImageUrl,
  isOnWishlist,
  setIsOnWishlist,
  canSave,
  handleSave,
  handleDelete,
  onClose,
}) {
  const validNameClass = getNameInputClass(validName);

  const formFields = getFormFields({
    name,
    setName,
    validNameClass,
    setNumber,
    setSetNumber,
    thumbnailUrl,
    setThumbnailUrl,
    imageUrl,
    setImageUrl,
    isOnWishlist,
    setIsOnWishlist,
  });

  const renderFormFields = formFields.map((field, index) => {
    const Component = field.component;

    return <Component key={index} {...field} />;
  });

  const formContent = (
    <>
      <FormHeader
        title={`Edit Lego: ${name}`}
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

export default EditLegoFormTable;
