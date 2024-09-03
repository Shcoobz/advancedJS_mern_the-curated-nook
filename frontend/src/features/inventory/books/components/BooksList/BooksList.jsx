import { useGetBooksQuery } from '../../api/booksApiSlice';
import BookFormEdit from '../BookEdit/BookFormEdit';
import BookFormNew from '../BookNew/BookFormNew';
import BooksListTable from './BooksListTable';
import BookDetails from '../BookDetails/BookDetails';
import EntityList from '../../../../entity/components/EntityList/EntityList';

function BooksList() {
  return (
    <EntityList
      entityName='books'
      useGetQuery={useGetBooksQuery}
      ListTable={BooksListTable}
      FormEdit={BookFormEdit}
      FormNew={BookFormNew}
      Details={BookDetails}
    />
  );
}

export default BooksList;
