import Spinner from '../../../../../components/common/Spinner';
import { UI } from '../../../../../config/common/messages';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import Book from '../Book/Book';

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

  let content;

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = books;

    const tableContent = ids?.length
      ? ids.map((bookId) => <Book key={bookId} bookId={bookId} />)
      : null;

    content = (
      <div>
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
      </div>
    );
  }

  return content;
}

export default BooksList;
