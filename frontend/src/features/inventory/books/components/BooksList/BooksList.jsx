import { useState } from 'react';
import Spinner from '../../../../../components/common/Spinner';
import { UI } from '../../../../../config/common/messages';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import Book from '../Book/Book';
import EditBookForm from '../EditBook/EditBookForm';
import NewBookForm from '../NewBook/NewBookForm';

function BooksList() {
  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBooksQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  let content;

  function openModal(book = null) {
    setSelectedBook(book);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBook(null);
  }

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = books;

    const tableContent = ids?.length
      ? ids.map((bookId) => <Book key={bookId} bookId={bookId} onEdit={openModal} />)
      : null;

    content = (
      <div>
        <br />
        <button onClick={() => openModal()} className='button'>
          Create New Book
        </button>
        <br />

        <p className='table-description'>{UI.BS.PAGE.BOOK.list.paragraph}</p>
        <br />
        <table className='table table--books'>
          <thead className='table__thead'>
            <tr>
              <th scope='col' className='table__th book__published-date'>
                Published Date
              </th>
              <th scope='col' className='table__th book__title'>
                Title
              </th>
              <th scope='col' className='table__th book__description'>
                Description
              </th>
              <th scope='col' className='table__th book__categories'>
                Categories
              </th>
              <th scope='col' className='table__th book__isbn'>
                ISBN
              </th>
              <th scope='col' className='table__th book__action'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
        {isModalOpen &&
          (selectedBook ? (
            <EditBookForm book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
          ) : (
            <NewBookForm isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    );
  }

  return content;
}

export default BooksList;
