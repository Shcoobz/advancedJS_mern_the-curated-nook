import { UI } from '../../../../../config/common/messages';
import { LINK } from '../../../../../config/common/constants';
import EntityListTable from '../../../../entity/components/EntityList/EntityListTable';

function BooksListTable({ books, openModal }) {
  const filterFields = ['title', 'categories'];

  const columns = [
    { label: 'No.', className: 'book__number' },
    { label: 'Image', className: 'book__thumbnail' },
    { label: 'Title', className: 'book__title' },
    { label: 'Description', className: 'book__description' },
    { label: 'Categories', className: 'book__categories' },
  ];

  return (
    <EntityListTable
      entities={books}
      openModal={openModal}
      entityType='book'
      columns={columns}
      filterFields={filterFields}
      descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
      createButtonText='New Book'
      wishlistLink={LINK.BOOK.wishlist}
      tableClassName='table__books'
    />
  );
}

export default BooksListTable;
