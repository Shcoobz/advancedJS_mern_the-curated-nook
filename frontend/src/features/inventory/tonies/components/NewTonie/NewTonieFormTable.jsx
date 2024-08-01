import { SubmitButton } from '../../../../../components/common/Buttons';
import { FormHeader } from '../../../../../components/common/FormComponents';
import getFormFields from '../../tonieFormData';
import { getNameInputClass } from '../tonieUtils';

function NewTonieFormTable({
  name,
  setName,
  validName,
  description,
  setDescription,
  thumbnailUrl,
  setThumbnailUrl,
  imageUrl,
  setImageUrl,
  isOnWishlist,
  setIsOnWishlist,
  canSave,
  handleSave,
  onClose,
}) {
  const validNameClass = getNameInputClass(validName);

  const formFields = getFormFields({
    name,
    setName,
    validNameClass,
    description,
    setDescription,
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
        title={'Create Tonie'}
        handleSave={handleSave}
        canSave={canSave}
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

export default NewTonieFormTable;
