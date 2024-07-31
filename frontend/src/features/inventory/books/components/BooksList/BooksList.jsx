import { useState } from 'react';
import Spinner from '../../../../../components/common/Spinner';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import EditBookForm from '../EditBook/EditBookForm';
import NewBookForm from '../NewBook/NewBookForm';
import BooksListTable from './BooksListTable';
import BookDetails from '../BookDetails/BookDetails';

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

  console.log('books:', books);

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
    console.log('Book details send: ', books);
    content = <BooksListTable books={books} openModal={openModal} />;
  }

  const booksList = (
    <>
      <div>
        {content}
        {isModalOpen &&
          (selectedBook ? (
            selectedBook.isEditing ? (
              <EditBookForm
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            ) : (
              <BookDetails
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={closeModal}
                onEdit={openModal}
              />
            )
          ) : (
            <NewBookForm isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return booksList;
}

export default BooksList;
