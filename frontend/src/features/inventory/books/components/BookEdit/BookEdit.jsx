import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import BookFormEdit from './BookFormEdit';

function BookEdit() {
  const { id } = useParams();

  const { book } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[id],
    }),
  });

  if (!book) return <Spinner />;

  const content = <BookFormEdit book={book} />;

  return content;
}

export default BookEdit;
