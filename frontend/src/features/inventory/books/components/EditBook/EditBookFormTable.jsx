import {
  CloseButton,
  DeleteButton,
  SaveButton,
} from '../../../../../components/common/Buttons';
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

  const content = (
    <>
      <div className='form-header__container'>
        <h2>Edit Book: {title}</h2>
        <div className='form-header__action-buttons'>
          <SaveButton handleSave={handleSave} canSave={canSave} />
          <DeleteButton handleDelete={handleDelete} />
          <CloseButton onClick={onClose} />
        </div>
      </div>

      <form className='form' onSubmit={handleSave}>
        <label className='form__label' htmlFor='title'>
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id='title'
          name='title'
          type='text'
          value={title}
          onChange={handleTitleChange(setTitle)}
        />

        <label className='form__label' htmlFor='authors'>
          Author(s):
        </label>
        <input
          className='form__input'
          id='authors'
          name='authors'
          type='text'
          value={authors}
          onChange={handleAuthorsChange(setAuthors)}
        />

        <label className='form__label' htmlFor='publisher'>
          Publisher:
        </label>
        <input
          className='form__input'
          id='publisher'
          name='publisher'
          type='text'
          value={publisher}
          onChange={handlePublisherChange(setPublisher)}
        />

        <label className='form__label' htmlFor='publishedDate'>
          Published Date:
        </label>
        {/* Todo: implement date formatter && sending to server */}
        <input
          className='form__input'
          id='publishedDate'
          name='publishedDate'
          type='date'
          value={publishedDate}
          onChange={handlePublishedDateChange(setPublishedDate)}
        />

        <label className='form__label' htmlFor='description'>
          Description:
        </label>
        <textarea
          className='form__textarea'
          id='description'
          name='description'
          rows='5'
          value={description}
          onChange={handleDescriptionChange(setDescription)}
        />

        <label className='form__label' htmlFor='isbn'>
          ISBN:
        </label>
        <input
          className='form__input'
          id='isbn'
          name='isbn'
          type='text'
          value={isbn}
          onChange={handleIsbnChange(setIsbn)}
        />

        <label className='form__label' htmlFor='categories'>
          Categories:
        </label>
        <input
          className='form__input'
          id='categories'
          name='categories'
          type='text'
          value={categories}
          onChange={handleCategoriesChange(setCategories)}
        />

        <label className='form__label' htmlFor='thumbnailUrl'>
          ThumbnailUrl:
        </label>
        <input
          className='form__input'
          id='thumbnailUrl'
          name='thumbnailUrl'
          type='text'
          value={thumbnailUrl}
          onChange={handleThumbnailUrlChange(setThumbnailUrl)}
        />

        <label className='form__label' htmlFor='imageUrl'>
          imageUrl:
        </label>
        <input
          className='form__input'
          id='imageUrl'
          name='imageUrl'
          type='text'
          value={imageUrl}
          onChange={handleImageUrlChange(setImageUrl)}
        />

        <label className='form__label' htmlFor='language'>
          Language:
        </label>
        <input
          className='form__input'
          id='language'
          name='language'
          type='text'
          value={language}
          onChange={handleLanguageChange(setLanguage)}
        />

        <label className='form__label form__checkbox-container' htmlFor='on-wishlist'>
          on wishlist:
          <input
            className='form__checkbox'
            id='on-wishlist'
            name='on-wishlist'
            type='checkbox'
            checked={isOnWishlist}
            onChange={handleIsOnWishlistChange(setIsOnWishlist)}
          />
        </label>

        <button type='submit' className='submit-button' disabled={!canSave}></button>
      </form>
    </>
  );

  return content;
}

export default EditBookFormTable;
