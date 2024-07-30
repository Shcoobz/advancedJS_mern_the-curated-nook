import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDeleteBookMutation, useUpdateBookMutation } from '../../api/booksApiSlice';
import {
  getTitleInputClass,
  handleAuthorsChange,
  handleCategoriesChange,
  handleDeleteBook,
  handleDescriptionChange,
  handleImgUrlChange,
  handleIsbnChange,
  handleIsOnWishlistChange,
  handleLanguageChange,
  handlePublishedDateChange,
  handlePublisherChange,
  handleSaveExistingBook,
  handleThumbnailUrlChange,
  handleTitleChange,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';

function EditBookForm({ book, isOpen, onClose }) {
  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [deleteBook, { isSuccess: isDelSuccess }] = useDeleteBookMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(book.title);
  const [validTitle, setValidTitle] = useState(false);
  const [authors, setAuthors] = useState(book.authors.join(', '));
  const [publisher, setPublisher] = useState(book.publisher);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);
  const [description, setDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn.join(', '));
  const [categories, setCategories] = useState(book.categories.join(', '));
  const [thumbnailUrl, setThumbnailUrl] = useState(book.thumbnailUrl);
  const [imgUrl, setImgUrl] = useState(book.imgUrl);
  const [language, setLanguage] = useState(book.language);
  const [isOnWishlist, setIsOnWishlist] = useState(book.isOnWishlist);

  const canSave = Boolean(title) && !isLoading;
  const validTitleClass = getTitleInputClass(validTitle);

  useValidateTitle(title, setValidTitle);
  useHandleBookSuccess(
    isSuccess,
    isDelSuccess,
    navigate,
    setTitle,
    setAuthors,
    setPublisher,
    setPublishedDate,
    setDescription,
    setIsbn,
    setCategories,
    setThumbnailUrl,
    setImgUrl,
    setLanguage,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingBook(
      updateBook,
      book,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      isbn,
      categories,
      thumbnailUrl,
      imgUrl,
      language,
      isOnWishlist
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteBook(deleteBook, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.deleted);
    }
  }

  const modalContent = (
    <>
      <div className='form-header__container'>
        <h2>Edit Book: {title}</h2>
        <div className='form-header__action-buttons'>
          <button
            className='icon-button'
            title='Save'
            onClick={handleSave}
            disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button className='icon-button' title='Delete' onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
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

        <label className='form__label' htmlFor='imgUrl'>
          ImgUrl:
        </label>
        <input
          className='form__input'
          id='imgUrl'
          name='imgUrl'
          type='text'
          value={imgUrl}
          onChange={handleImgUrlChange(setImgUrl)}
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
      </form>
    </>
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default EditBookForm;
