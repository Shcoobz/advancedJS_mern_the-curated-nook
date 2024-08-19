import { useState } from 'react';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import BookFormEdit from '../BookEdit/BookFormEdit';
import BookFormNew from '../BookNew/BookFormNew';
import BooksListTable from './BooksListTable';
import BookDetails from '../BookDetails/BookDetails';
import { TableAboveHeader } from '../../../../../components/common/TableComponents';
import { UI } from '../../../../../config/common/messages';

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
    content = <BooksListTable books={books} openModal={openModal} />;
  }

  const booksList = (
    <>
      <div>
        {content}

        {isModalOpen &&
          (selectedBook ? (
            selectedBook.isEditing ? (
              <BookFormEdit
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
            <BookFormNew isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return booksList;
}

export default BooksList;
