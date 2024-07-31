import { DEFAULT } from '../../../../../config/common/constants';
import {
  TableCell,
  TableCellEdit,
} from '../../../../../components/common/TableComponents';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function BookTable({ book, onEdit }) {
  const bookCategoryList = formatCategories(book.categories);

  return (
    <>
      <TableCell className='book__published-date' content={book.publishedDate} />
      <TableCell className='book__title' content={book.title} />
      <TableCell className='book__description' content={book.description} />
      <TableCell className='book__categories' content={bookCategoryList} />
      <TableCell className='book__isbn' content={book.isbn} />

      <TableCellEdit onEdit={onEdit} book={book} />
    </>
  );
}

export default BookTable;
