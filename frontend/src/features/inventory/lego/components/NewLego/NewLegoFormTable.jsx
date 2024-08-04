import { SubmitButton } from '../../../../../components/common/Buttons';
import { FormHeader } from '../../../../../components/common/FormComponents';
import { getNameInputClass } from '../legoUtils';
import getFormFields from '../../legoFormData';

function NewLegoFormTable({
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
        title={'Create Lego'}
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

export default NewLegoFormTable;
