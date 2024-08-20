import { useState } from 'react';
import { useGetBooksOnWishlistQuery } from '../../api/booksWishlistApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import BookWishlistTable from './BookWishlistTable';
import BookFormEdit from '../BookEdit/BookFormEdit';
import BookDetails from '../BookDetails/BookDetails';
import BookFormNew from '../BookNew/BookFormNew';

function BookWishlist() {
  const {
    data: bookWishlist,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBooksOnWishlistQuery('wishlistBooks', {
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
    content = <BookWishlistTable books={bookWishlist} openModal={openModal} />;
  }

  const bookWishlistContent = (
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

  return bookWishlistContent;
}

export default BookWishlist;
