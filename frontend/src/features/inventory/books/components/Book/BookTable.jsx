import { EditButton } from '../../../../../components/common/Buttons';
import { DEFAULT } from '../../../../../config/common/constants';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function BookTable({ book, onEdit }) {
  const bookCategoryList = formatCategories(book.categories);

  function handleEditCellClick(e) {
    e.stopPropagation();
  }

  return (
    <>
      <td className={'table__cell book__published-date'}>{book.publishedDate}</td>
      <td className={'table__cell book__title'}>{book.title}</td>
      <td className={'table__cell book__description'}>{book.description}</td>
      <td className={'table__cell book__categories'}> {bookCategoryList}</td>
      <td className={'table__cell book__isbn'}>{book.isbn}</td>
      <td className={'table__cell no-pointer '} onClick={handleEditCellClick}>
        <EditButton onClick={() => onEdit(book)} />
      </td>
    </>
  );
}

export default BookTable;
