import { formatDate } from '../../../../utils/utils';
import EntityDetailsTable from '../../../../entity/Components/EntityDetails/EntityDetailsTable';
import stockImageBook from '../../../../../img/stockimageBook.png';

function BookDetailsTable({ book, onClose, handleEditClick, handleDelete }) {
  const displayDate = formatDate(book.publishedDate);

  const imageConfig = {
    imageUrl: book.imageUrl,
    thumbnailUrl: book.thumbnailUrl,
    stockImage: stockImageBook,
    altText: `Cover of ${book.title}`,
    titleText: `Cover Image of ${book.title}`,
    className: 'book__cover-image',
  };

  const details = [
    { label: 'Author(s):', value: book.authors },
    { label: 'Publisher:', value: book.publisher },
    { label: 'Published Date:', value: displayDate },
    { label: 'Categories:', value: book.categories },
    { label: 'Language:', value: book.language },
  ];

  const tableContent = (
    <EntityDetailsTable
      item={book}
      onClose={onClose}
      handleEditClick={handleEditClick}
      handleDelete={handleDelete}
      type='book'
      imageConfig={imageConfig}
      details={details}
      description={book.description}
    />
  );

  return tableContent;
}

export default BookDetailsTable;
