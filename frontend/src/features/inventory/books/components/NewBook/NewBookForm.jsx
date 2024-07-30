import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import {
  getTitleInputClass,
  handleAuthorsChange,
  handleCategoriesChange,
  handleDescriptionChange,
  handleImgUrlChange,
  handleIsbnChange,
  handleLanguageChange,
  handlePublishedDateChange,
  handlePublisherChange,
  handleSaveNewBook,
  handleThumbnailUrlChange,
  handleTitleChange,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';
import Modal from '../../../../../components/common/Modal';
import { v4 as uuidv4 } from 'uuid';

function NewBookForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewBook, { isLoading, isSuccess }] = useAddNewBookMutation();

  const [title, setTitle] = useState(DEFAULT.emptyString);
  const [validTitle, setValidTitle] = useState(false);
  const [authors, setAuthors] = useState(DEFAULT.emptyString);
  const [publisher, setPublisher] = useState(DEFAULT.emptyString);
  const [publishedDate, setPublishedDate] = useState(DEFAULT.emptyString);
  const [description, setDescription] = useState(DEFAULT.emptyString);
  const [isbn, setIsbn] = useState(DEFAULT.emptyString);
  const [categories, setCategories] = useState(DEFAULT.emptyString);
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT.emptyString);
  const [imgUrl, setImgUrl] = useState(DEFAULT.emptyString);
  const [language, setLanguage] = useState(DEFAULT.emptyString);

  const canSave = Boolean(title) && !isLoading;
  const validTitleClass = getTitleInputClass(validTitle);

  useValidateTitle(title, setValidTitle);
  useHandleBookSuccess(
    isSuccess,
    undefined,
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
    setLanguage
  );

  async function handleSave(e) {
    e.preventDefault();

    const placeholderIsbn = isbn && isbn.trim() ? isbn.trim() : uuidv4();

    setIsbn(placeholderIsbn);

    const result = await handleSaveNewBook(
      addNewBook,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      placeholderIsbn,
      categories,
      thumbnailUrl,
      imgUrl,
      language
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.created);
    }
  }

  const modalContent = (
    <>
      <div className='form-header__container'>
        <h2>Create Book</h2>
        <div className='form-header__action-buttons'>
          <button
            className='icon-button'
            title='Save'
            onClick={handleSave}
            disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </div>

      <form className='form' onSubmit={handleSave}>
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

        <button type='submit' className='submit-button' disabled={!canSave}></button>
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

export default NewBookForm;
