import { memo } from 'react';
import BookData from './BookData';

function BookDataWrapper({ bookId, onEdit, index, isWishlist = false }) {
  return (
    <BookData bookId={bookId} onEdit={onEdit} index={index} isWishlist={isWishlist} />
  );
}

const Book = memo(BookDataWrapper);

export default Book;
