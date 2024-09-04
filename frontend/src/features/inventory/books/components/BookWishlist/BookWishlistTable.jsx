import { LINK } from '../../../../../config/common/constants';
import { UI } from '../../../../../config/common/messages';
import EntityWishlistTable from '../../../../entity/components/EntityWishlist/EntityWishlistTable';

function BookWishlistTable({ books, openModal }) {
  const columns = [
    { label: 'No.', className: 'book__number' },
    { label: 'Image', className: 'book__thumbnail' },
    { label: 'Title', className: 'book__title' },
    { label: 'Description', className: 'book__description' },
    { label: 'Categories', className: 'book__categories' },
  ];

  return (
    <EntityWishlistTable
      entities={books}
      openModal={openModal}
      entityType='book'
      columns={columns}
      filterFields={['title', 'categories']}
      descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
      createButtonText='New Book'
      homeLink={LINK.BOOK.viewBooks}
      tableClassName='table__books'
    />
  );
}

export default BookWishlistTable;
