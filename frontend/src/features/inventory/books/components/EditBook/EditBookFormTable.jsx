import { SubmitButton } from '../../../../../components/common/Buttons';
import { FormHeader } from '../../../../../components/common/FormComponents';
import { getTitleInputClass } from '../bookUtils';
import getFormFields from '../bookData';

function EditBookFormTable({
  title,
  setTitle,
  validTitle,
  authors,
  setAuthors,
  publisher,
  setPublisher,
  publishedDate,
  setPublishedDate,
  description,
  setDescription,
  isbn,
  setIsbn,
  categories,
  setCategories,
  thumbnailUrl,
  setThumbnailUrl,
  imageUrl,
  setImageUrl,
  language,
  setLanguage,
  isOnWishlist,
  setIsOnWishlist,
  canSave,
  handleSave,
  handleDelete,
  onClose,
}) {
  const validTitleClass = getTitleInputClass(validTitle);

  const formFields = getFormFields({
    title,
    setTitle,
    validTitleClass,
    authors,
    setAuthors,
    publisher,
    setPublisher,
    publishedDate,
    setPublishedDate,
    description,
    setDescription,
    isbn,
    setIsbn,
    categories,
    setCategories,
    thumbnailUrl,
    setThumbnailUrl,
    imageUrl,
    setImageUrl,
    language,
    setLanguage,
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
        title={`Edit Book: ${title}`}
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
