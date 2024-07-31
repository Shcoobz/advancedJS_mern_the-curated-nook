import { SubmitButton } from '../../../../../components/common/Buttons';
import {
  FormCheckbox,
  FormHeader,
  FormInput,
  FormTextarea,
} from '../../../../../components/common/FormComponents';
import {
  getTitleInputClass,
  handleAuthorsChange,
  handleCategoriesChange,
  handleDescriptionChange,
  handleImageUrlChange,
  handleIsbnChange,
  handleIsOnWishlistChange,
  handleLanguageChange,
  handlePublishedDateChange,
  handlePublisherChange,
  handleThumbnailUrlChange,
  handleTitleChange,
} from '../bookUtils';

function NewBookFormTable({
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
  onClose,
}) {
  const validTitleClass = getTitleInputClass(validTitle);

  const modalContent = (
    <>
      <FormHeader
        title={'Create Book'}
        handleSave={handleSave}
        canSave={canSave}
        onClose={onClose}
      />

      <form className='form' onSubmit={handleSave}>
        <FormInput
          label='Title:'
          id='title'
          name='title'
          type='text'
          value={title}
          onChange={handleTitleChange(setTitle)}
          validClass={validTitleClass}
        />
        <FormInput
          label='Author(s):'
          id='authors'
          name='authors'
          type='text'
          value={authors}
          onChange={handleAuthorsChange(setAuthors)}
        />
        <FormInput
          label='Publisher:'
          id='publisher'
          name='publisher'
          type='text'
          value={publisher}
          onChange={handlePublisherChange(setPublisher)}
        />
        <FormInput
          label='Published Date:'
          id='publishedDate'
          name='publishedDate'
          type='date'
          value={publishedDate}
          onChange={handlePublishedDateChange(setPublishedDate)}
        />
        <FormTextarea
          label='Description:'
          id='description'
          name='description'
          rows='5'
          value={description}
          onChange={handleDescriptionChange(setDescription)}
        />
        <FormInput
          label='ISBN:'
          id='isbn'
          name='isbn'
          type='text'
          value={isbn}
          onChange={handleIsbnChange(setIsbn)}
        />
        <FormInput
          label='Categories:'
          id='categories'
          name='categories'
          type='text'
          value={categories}
          onChange={handleCategoriesChange(setCategories)}
        />
        <FormInput
          label='ThumbnailUrl:'
          id='thumbnailUrl'
          name='thumbnailUrl'
          type='text'
          value={thumbnailUrl}
          onChange={handleThumbnailUrlChange(setThumbnailUrl)}
        />
        <FormInput
          label='imageUrl:'
          id='imageUrl'
          name='imageUrl'
          type='text'
          value={imageUrl}
          onChange={handleImageUrlChange(setImageUrl)}
        />
        <FormInput
          label='Language:'
          id='language'
          name='language'
          type='text'
          value={language}
          onChange={handleLanguageChange(setLanguage)}
        />
        <FormCheckbox
          label='on wishlist:'
          id='on-wishlist'
          name='on-wishlist'
          checked={isOnWishlist}
          onChange={handleIsOnWishlistChange(setIsOnWishlist)}
        />

        <SubmitButton canSave={canSave} />
      </form>
    </>
  );

  return modalContent;
}

export default NewBookFormTable;
